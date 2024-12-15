import axios from "axios";
// const axios = require("axios");

const backendport = import.meta.env.backendport || 5000

const postPythonCode = async (code) => {
    try {
      const response = await axios.post(
        `http://localhost:${backendport}/api/execute`, { code:code },
        { // Axios options
          timeout: 5000, // 5sec timeout
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // error check
      if (error.code === 'ECONNABORTED') {
        console.error('Error: Request timed out.');
        throw new Error('Execution timed out. Please try again later.');
      } else if (error.response) {
        // Handle HTTP errors from the backend
        console.error(`Backend error (${error.response.status}): ${error.response.data}`);
        throw new Error(`Execution error: ${error.response.data || 'Unknown backend error.'}`);
      } else {
        console.error('Error:', error.message);
        throw new Error('An unexpected error occurred while executing the code.');
      }
    }
  };
  
export default postPythonCode;