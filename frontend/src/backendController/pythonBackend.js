import axios from "axios";
// const axios = require("axios");

const backendport = import.meta.env.backendport || 5001

const postPythonCode = async (code) => {
    try {
      const response = await axios.post(
        `http://backend:${backendport}/api/execute`, { code:code },
        { // Axios options
          timeout: 5000, // Timeout in milliseconds (5 seconds)
          headers: {
            'Content-Type': 'application/json' // Set headers explicitly if needed
          }
        }
      );
  
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timed out');
    } else {
        console.error('Error:', error.message);
      }
    }
    return null;
  };
  
export default postPythonCode;