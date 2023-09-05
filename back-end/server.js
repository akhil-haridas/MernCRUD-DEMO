const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const morgan = require("morgan");
const path = require("path");
const config = require("./config/serverConfig");

const connectToDatabase = require("./utils/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// app.use(morgan("dev"));

connectToDatabase();

const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
