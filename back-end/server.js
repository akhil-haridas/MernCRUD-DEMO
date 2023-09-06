const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const morgan = require("morgan");
const config = require("./config/serverConfig");
const connectToDatabase = require("./utils/database");

const corsOptions = {
  origin: [config.server.ORIGIN],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
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
