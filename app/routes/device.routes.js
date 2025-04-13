module.exports = app => {
  const devices = require("../controllers/device.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", devices.create);

  // Retrieve all Tutorials
  router.get("/", devices.findAll);

  // Retrieve all Tutorials paginated
  router.get("/pag", devices.findAllPaginated);

  // Retrieve all published Tutorials
  router.get("/nfc", devices.findAllNFC);

  // Retrieve a single Tutorial with id
  router.get("/:id", devices.findOne);

  // Update a Tutorial with id
  router.put("/:id", devices.update);

  // Delete a Tutorial with id
  router.delete("/:id", devices.delete);

  // Delete all Tutorials
  router.delete("/", devices.deleteAll);

  app.use("/api/devices", router);
};
