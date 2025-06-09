import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://spabackend-x1sr.onrender.com/api/v1";

// Gell all jobs
export const getAllJob = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/apply-job`);
        return response.data;

    } catch (error) {
        console.error('Get jobd error:', error);
        throw error;
    }
};


// Update job
export const updateJob = async (id, data) => {
  return await axios.put(`${API_BASE_URL}/apply-job/${id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
