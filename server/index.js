require("dotenv").config();
const express = require("express");
const config = require("./src/config/config");
const sequelize = require("./src/models/sequelize");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const port = config.app_port;

const origin = config.app_cors;

app.use(
  cors({
    origin: origin,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use(cookieParser());

require("./src/routes/routes")(app);

sequelize.sync().then(() => {
  app.listen(config.app_port, () => {
    console.log(`Server is up and running at port: ${port}`);
  });
});
