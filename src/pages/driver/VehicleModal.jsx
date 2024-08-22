import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const VehicleModal = ({ open, handleClose, handleChange, handleSaveVehicle, currentVehicle, isEdit }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="vehicle-modal-title"
      aria-describedby="vehicle-modal-description"
    >
      <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
        <h2>{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
        <TextField
          margin="normal"
          label="Make"
          name="make"
          fullWidth
          value={currentVehicle?.make || ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Model"
          name="model"
          fullWidth
          value={currentVehicle?.model || ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Year"
          name="year"
          fullWidth
          value={currentVehicle?.year || ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="License Plate"
          name="licensePlate"
          fullWidth
          value={currentVehicle?.licensePlate || ''}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSaveVehicle} sx={{ mt: 2 }}>
          {isEdit ? 'Update Vehicle' : 'Save Vehicle'}
        </Button>
      </Box>
    </Modal>
  );
};

export default VehicleModal;
