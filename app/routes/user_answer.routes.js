module.exports = app => {
  const userAnswers = require("../controllers/user_answer.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", userAnswers.create);

  // Retrieve all Tutorials
  router.get("/", userAnswers.findAll);

  // Retrieve all Tutorials
  router.get("/pag", userAnswers.findAllData);

  // Retrieve all published Tutorials
  router.get("/active", userAnswers.findAllActive);

  // Retrieve a single Tutorial with id
  router.get("/:id", userAnswers.findOne);

  // Update a Tutorial with id
  router.put("/:id", userAnswers.update);

  // Delete a Tutorial with id
  router.delete("/:id", userAnswers.delete);

  // Delete all Tutorials
  router.delete("/", userAnswers.deleteAll);

  app.use("/api/useranswers", router);
};
