const axios = require("axios");

const executorport = process.env.executorport || 5001

// Controller to handle code execution
exports.executeCode = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  console.log("hello from execute function in backend");
  try {
    // Example: Send code to executor service
    const response = await axios.post(`http://executor:${executorport}/execute`, { code });
    res.json({ output: response.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Execution failed" });
  }
};

// Controller to check code execution endpoint on executor
exports.executeCheck = async (req, res) => {
  console.log("hello from execute check function in backend");
  try {
    // Example: Send code to executor service
    const response = await axios.get(`http://executor:${executorport}/`,);
    res.json({ output: response.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Execution failed" });
  }
};