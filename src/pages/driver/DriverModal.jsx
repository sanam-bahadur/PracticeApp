import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const DriverModal = ({ open, handleClose, handleChange, handleSaveDriver, currentDriver, isEdit }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="driver-modal"
      aria-describedby="modal-to-manage-driver"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="driver-modal" variant="h6" component="h2" gutterBottom>
          {isEdit ? 'Edit Driver' : 'Add New Driver'}
        </Typography>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentDriver?.name || ''}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentDriver?.email || ''}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentDriver?.phone || ''}
          onChange={handleChange}
        />
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentDriver?.location || ''}
          onChange={handleChange}
        />
        <TextField
          name="assignmentStart"
          label="Assignment Start"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentDriver?.assignmentStart || ''}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="assignmentEnd"
          label="Assignment End"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentDriver?.assignmentEnd || ''}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveDriver}
          sx={{ mt: 2 }}
          fullWidth
        >
          {isEdit ? 'Update Driver' : 'Add Driver'}
        </Button>
      </Box>
    </Modal>
  );
};

export default DriverModal;
