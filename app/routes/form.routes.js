module.exports = app => {
  const forms = require("../controllers/form.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", forms.create);

  // Retrieve all Tutorials
  router.get("/", forms.findAll);

  // Retrieve all published Tutorials
  router.get("/active", forms.findAllActive);

  // Retrieve a single Tutorial with id
  router.get("/:id", forms.findOne);

  // Update a Tutorial with id
  router.put("/:id", forms.update);

  // Delete a Tutorial with id
  router.delete("/:id", forms.delete);

  // Delete all Tutorials
  router.delete("/", forms.deleteAll);

  app.use("/api/forms", router);
};
