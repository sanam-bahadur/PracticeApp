import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const VehicleTable = ({ vehicles, onUpdate, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="vehicle table">
        <TableHead>
          <TableRow>
            <TableCell>Vehicle ID</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>License Plate</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.make}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell align="right">
                <Button color="primary" onClick={() => onUpdate(vehicle.id)}>Edit</Button>
                <Button color="secondary" onClick={() => onDelete(vehicle.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleTable;
