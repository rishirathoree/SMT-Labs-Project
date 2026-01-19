const express = require("express");
const cors = require("cors");
const { createConnection } = require("../libs/connections.lib");
const { errorHandler } = require("../middlewares/error.middleware");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors())
  }

  routes() {
    this.app.use("/api/users", require("../routes/users.routes"));
    this.app.use("/api/organizations", require("../routes/workspace.routes"));
    this.app.use("/api/categories", require("../routes/categories.routes"));
    this.app.use("/api/products", require("../routes/products.routes"));
    this.app.use("/api/orders", require("../routes/orders.routes"));
  }

  listen() {
    createConnection();
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  errorHandler() {
    this.app.use(errorHandler);
  }
}

module.exports = Server;
