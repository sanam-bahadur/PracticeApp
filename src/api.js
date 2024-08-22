// api.js
const API_BASE_URL = 'http://localhost:8080/api';

export const fetchDrivers = async () => {
  const response = await fetch(`${API_BASE_URL}/drivers`);
  if (!response.ok) {
    throw new Error('Failed to fetch drivers');
  }
  return response.json();
};

export const fetchVehicles = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicles`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
};

// api.js
export const addDriver = async (driver) => {
    const response = await fetch(`${API_BASE_URL}/drivers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driver),
    });
    if (!response.ok) {
        throw new Error('Failed to add driver');
    }
    return response.json();
};
  
export const updateDriver = async (id, driver) => {
    const response = await fetch(`${API_BASE_URL}/drivers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driver),
    });
    if (!response.ok) {
        throw new Error('Failed to update driver');
    }
    return response.json();
};
  
export const deleteDriver = async (id) => {
    const response = await fetch(`${API_BASE_URL}/drivers/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete driver');
    }
};


export const addVehicle = async (vehicle) => {
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle),
    });
    if (!response.ok) {
        throw new Error('Failed to add Vehicle');
    }
    return response.json();
};
  
export const updateVehicle = async (id, vehicle) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle),
    });
    if (!response.ok) {
        throw new Error('Failed to update Vehicle');
    }
    return response.json();
};
  
export const deleteVehicle = async (id) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete Vehicle');
    }
};

  // api.js
export const assignDriver = async (assignment) => {
    const response = await fetch(`${API_BASE_URL}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignment),
    });
    if (!response.ok) {
      throw new Error('Failed to assign driver');
    }
    return response.json();
  };
  
  export const unassignDriver = async (driverId) => {
    const response = await fetch(`${API_BASE_URL}/unassign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driverId }),
    });
    if (!response.ok) {
      throw new Error('Failed to unassign driver');
    }
    return response.json();
  };
  
  
