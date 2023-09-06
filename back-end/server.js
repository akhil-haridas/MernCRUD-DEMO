const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const morgan = require("morgan");
const config = require("./config/serverConfig");
const connectToDatabase = require("./utils/database");

const corsOptions = {
  origin: config.server.origin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptions));
// app.use(morgan("dev"));

connectToDatabase();

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const PORT = config.server.port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
