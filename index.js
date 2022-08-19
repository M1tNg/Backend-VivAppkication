const mongoose = require("mongoose");
const app = require("./app");

const config = require("./config");

const start = async () => {
  await mongoose
    .connect(config.mongoUri, config.mongoOptions)
    .then(() => console.log("Connected Database"))
    .catch((err) => console.log(err));

  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

start();
