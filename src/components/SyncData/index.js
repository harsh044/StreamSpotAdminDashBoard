import React from 'react';
import Swal from 'sweetalert2';

const SyncData = ({ setIsAuthenticated }) => {
  const handleSyncData = async () => {
    try {
      // Show a loading alert while the request is processing
      Swal.fire({
        title: 'Syncing Data...',
        text: 'Please wait while we sync your data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Replace with your API endpoint
      const response = await fetch('http://127.0.0.1:8000/movies_api/sync_movies', {
        method: 'POST', // Adjust method if it's GET
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      // Success alert
      Swal.fire({
        icon: 'success',
        title: 'Data Synced!',
        text: result.message || 'Your data has been successfully synced.',
      });
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Sync Failed',
        text: error.message || 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <button
      style={{ marginLeft: '12px' }}
      className="muted-button"
      onClick={handleSyncData}
    >
      Sync Data
    </button>
  );
};

export default SyncData;

