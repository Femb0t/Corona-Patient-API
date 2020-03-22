const express = require("express");
const dotenv = require("dotenv");
const patient = require("./routes/patient");
const connectDB = require("./config/db");
//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Mount the routers
app.use("/api/v1/patient", patient);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

//Handle unhandled Promise Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  //Close the server and exit the process
  server.close(() => process.exit(1));
});
