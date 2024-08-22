import React, { useState } from 'react';
import DriverTable from './DriverTable';
import DriverModal from './DriverModal';
import VehicleTable from './VehicleTable';
import VehicleModal from './VehicleModal';
import { Container, Typography, Button, Snackbar, Alert, TextField, Box, Tabs, Tab} from '@mui/material';
import { fetchDrivers, fetchVehicles, addDriver, updateDriver, deleteDriver, assignDriver, unassignDriver } from '../../api';

const Driver = () => {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', location: 'New York', vehicleId: null, assignmentStart: null, assignmentEnd: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', location: 'Los Angeles', vehicleId: null, assignmentStart: null, assignmentEnd: null },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phone: '456-789-0123', location: 'Chicago', vehicleId: null, assignmentStart: null, assignmentEnd: null },
  ]);

  const [vehicles, setVehicles] = useState([
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020, licensePlate: 'ABC123' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, licensePlate: 'XYZ789' },
  ]);

  const [openDriverModal, setOpenDriverModal] = useState(false);
  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isEditDriver, setIsEditDriver] = useState(false);
  const [isEditVehicle, setIsEditVehicle] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const driversData = await fetchDrivers();
  //       const vehiclesData = await fetchVehicles();
  //       setDrivers(driversData);
  //       setVehicles(vehiclesData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   loadData();
  // }, []);

  const handleOpenAddDriver = () => {
    setIsEditDriver(false);
    setCurrentDriver({ id: '', name: '', email: '', phone: '', location: '' });
    setOpenDriverModal(true);
  };

  const handleOpenAddVehicle = () => {
    setIsEditVehicle(false);
    setCurrentVehicle({ id: '', make: '', model: '', year: '', licensePlate: '' });
    setOpenVehicleModal(true);
  };

  const handleOpenEditDriver = (driver) => {
    setIsEditDriver(true);
    const driverN= drivers.find(x=> x.id === driver);
    setCurrentDriver({id: driverN.id, name: driverN.name, email: driverN.email, phone: driverN.phone, location: driverN.location});
    setOpenDriverModal(true);
  };

  const handleOpenEditVehicle = (vehicle) => {
    setIsEditVehicle(true);
    console.log(vehicle);
    const vehicleN= vehicles.find(x=> x.id === vehicle);
    console.log(vehicleN);
    setCurrentVehicle({id: vehicleN.id, make: vehicleN.make, model: vehicleN.model, year: vehicleN.year, licensePlate: vehicleN.licensePlate});
    setOpenVehicleModal(true);
  };

  const handleCloseDriverModal = () => setOpenDriverModal(false);
  const handleCloseVehicleModal = () => setOpenVehicleModal(false);

  const handleChangeDriver = (e) => {
    setCurrentDriver({
      ...currentDriver,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeVehicle = (e) => {
    setCurrentVehicle({
      ...currentVehicle,
      [e.target.name]: e.target.value,
    });
  };

  const isValidAssignment = (start, end, vehicleId) => {
    return drivers.every(driver =>
      !(driver.vehicleId === vehicleId &&
        ((new Date(start) < new Date(driver.assignmentEnd)) &&
         (new Date(end) > new Date(driver.assignmentStart))))
    );
  };

  const handleSaveDriver = () => {
    const { name, email, phone, assignmentStart, assignmentEnd, vehicleId } = currentDriver;

    // Check if required fields are filled
    if (!name || !email || !phone || !assignmentStart || !assignmentEnd || !vehicleId) {
      setError(true);
      return;
    }

    if (!isValidAssignment(assignmentStart, assignmentEnd, vehicleId)) {
      setError(true);
      return;
    }

    if (isEditDriver) {
      setDrivers(drivers.map(driver => driver.id === currentDriver.id ? currentDriver : driver));
    } else {
      setDrivers([...drivers, { ...currentDriver, id: drivers.length + 1 }]);
    }
    handleCloseDriverModal();
  };

  const handleSaveVehicle = () => {
    const { make, model, year, licensePlate } = currentVehicle;

    // Check if required fields are filled
    if (!make || !model || !year || !licensePlate) {
      setError(true);
      return;
    }

    if (isEditVehicle) {
      setVehicles(vehicles.map(vehicle => vehicle.id === currentVehicle.id ? currentVehicle : vehicle));
    } else {
      setVehicles([...vehicles, { ...currentVehicle, id: vehicles.length + 1 }]);
    }
    handleCloseVehicleModal();
  };

  const handleDeleteDriver = (id) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  const handleDeleteVehicle = (id) => {
    // Unassign all drivers linked to this vehicle
    setDrivers(drivers.map(driver => driver.vehicleId === id ? { ...driver, vehicleId: null, assignmentStart: null, assignmentEnd: null } : driver));
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  const handleCloseError = () => setError(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery) || driver.phone.includes(searchQuery)
  );

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchQuery) || vehicle.licensePlate.includes(searchQuery)
  );

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const assignDriverToVehicle = (driverId, vehicleId, start, end) => {
    if (isValidAssignment(start, end, vehicleId)) {
      setDrivers(drivers.map(driver => driver.id === driverId ? { ...driver, vehicleId, assignmentStart: start, assignmentEnd: end } : driver));
    } else {
      setError(true);
    }
  };

  const unassignDriverFromVehicle = (driverId) => {
    setDrivers(drivers.map(driver => driver.id === driverId ? { ...driver, vehicleId: null, assignmentStart: null, assignmentEnd: null } : driver));
  };

  return (
    <Container maxWidth="false" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>
        Driver Management
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="management tabs">
        <Tab label="Drivers" />
        <Tab label="Vehicles" />
      </Tabs>
      <TextField
        variant="outlined"
        placeholder="Search by name or phone no."
        fullWidth
        margin="normal"
        onChange={handleSearch}
        value={searchQuery}
      />
      {tabIndex === 0 && (
        <>
          <div sx={{ height: '800px' }}>
            <Button variant="contained" color="primary" onClick={handleOpenAddDriver} sx={{ marginBottom: 2 }}>
              Add New Driver
            </Button>
            <DriverTable
              drivers={filteredDrivers}
              vehicles={vehicles}
              onUpdate={handleOpenEditDriver}
              onDelete={handleDeleteDriver}
              onAssign={assignDriverToVehicle}
              onUnassign={unassignDriverFromVehicle}
            />
            <DriverModal
              open={openDriverModal}
              handleClose={handleCloseDriverModal}
              handleChange={handleChangeDriver}
              handleSaveDriver={handleSaveDriver}
              currentDriver={currentDriver}
              isEdit={isEditDriver}
            />
          </div>
        </>
      )}
      {tabIndex === 1 && (
        <>
          <div sx={{ height: '800px' }}>
            <Button variant="contained" color="primary" onClick={handleOpenAddVehicle} sx={{ marginBottom: 2 }}>
              Add New Vehicle
            </Button>
            <VehicleTable vehicles={filteredVehicles} onUpdate={handleOpenEditVehicle} onDelete={handleDeleteVehicle} />
            <VehicleModal
              open={openVehicleModal}
              handleClose={handleCloseVehicleModal}
              handleChange={handleChangeVehicle}
              handleSaveVehicle={handleSaveVehicle}
              currentVehicle={currentVehicle}
              isEdit={isEditVehicle}
            />
          </div>
        </>
      )}
      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Required fields cannot be empty or there is an overlapping assignment!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Driver;
