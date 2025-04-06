module.exports = app => {
  const answers = require("../controllers/answer.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", answers.create);

  // Retrieve all Tutorials
  router.get("/", answers.findAll);

  // Retrieve all published Tutorials
  router.get("/active", answers.findAllActive);

  // Retrieve a single Tutorial with id
  router.get("/:id", answers.findOne);

  // Update a Tutorial with id
  router.put("/:id", answers.update);

  // Delete a Tutorial with id
  router.delete("/:id", answers.delete);

  // Delete all Tutorials
  router.delete("/", answers.deleteAll);

  app.use("/api/answers", router);
};
