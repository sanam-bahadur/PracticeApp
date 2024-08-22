import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, TextField, Box } from '@mui/material';

const DriverTable = ({ drivers, vehicles, onUpdate, onDelete, onAssign, onUnassign }) => {
  const [assignmentDetails, setAssignmentDetails] = useState({});

  const handleVehicleChange = (driverId, event) => {
    setAssignmentDetails(prev => ({
      ...prev,
      [driverId]: { ...prev[driverId], vehicleId: event.target.value }
    }));
  };

  const handleDateChange = (driverId, event) => {
    const { name, value } = event.target;
    setAssignmentDetails(prev => ({
      ...prev,
      [driverId]: { ...prev[driverId], [name]: value }
    }));
  };

  const handleAssign = (driverId) => {
    const { vehicleId, start, end } = assignmentDetails[driverId] || {};
    if (vehicleId && start && end) {
      onAssign(driverId, vehicleId, start, end);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="driver table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Vehicle</TableCell>
            <TableCell>Assignment Start</TableCell>
            <TableCell>Assignment End</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell>{driver.id}</TableCell>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.location}</TableCell>
              <TableCell>
                <Select
                  value={assignmentDetails[driver.id]?.vehicleId || driver.vehicleId || ''}
                  onChange={(e) => handleVehicleChange(driver.id, e)}
                  sx={{width: '200px'}}
                >
                  <MenuItem value=''><em>None</em></MenuItem>
                  {vehicles.map(vehicle => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {`${vehicle.make} ${vehicle.model}`}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  name="start"
                  type="datetime-local"
                  value={assignmentDetails[driver.id]?.start || driver.assignmentStart || ''}
                  onChange={(e) => handleDateChange(driver.id, e)}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="end"
                  type="datetime-local"
                  value={assignmentDetails[driver.id]?.end || driver.assignmentEnd || ''}
                  onChange={(e) => handleDateChange(driver.id, e)}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  color="primary"
                  onClick={() => handleAssign(driver.id)}
                >
                  Assign
                </Button>
                <Button
                  color="primary"
                  onClick={() => onUpdate(driver.id)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => onDelete(driver.id)}
                >
                  Delete
                </Button>
                {driver.vehicleId && (
                  <Button
                    color="warning"
                    onClick={() => onUnassign(driver.id)}
                  >
                    Unassign
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DriverTable;
