const express = require("express");
const routes = require("./routes");
// const cors = require("cors");


const app = express();
const PORT = process.env.exposeport ||  5000;

// Middleware
// app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
