const db = require("../models");
const Answer = db.answers;
const Op = db.Sequelize.Op;

// Create and Save a new Answer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.text) {
    res.status(400).send({
      message: "El texto de la respuesta no puede estar vacío."
    });
    return;
  }

  // Create a Answer
  const answer = {
    form_id: req.body.form_id,
    question_id: req.body.question_id,
    text: req.body.text,
    type: req.body.type,
    status: "A"
  };

  // Save Answer in the database
  Answer.create(answer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answer."
      });
    });
};

// Retrieve all Answers from the database.
exports.findAll = (req, res) => {
  const formId = req.query.form_id;
  const questId = req.query.question_id;
  //var condition = status ? { status: { [Op.iLike]: `%${status}%` } } : null;
  Answer.findAll({ where: { form_id: formId, question_id: questId } })
  //Answer.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Answers."
      });
    });
};

// Find a single Answer with an id
exports.findOne = (req, res) => {
  const AnswerId = req.params.id;

  Answer.findOne({ where: { id: AnswerId } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Answer with id=${AnswerId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Answer with id=" + AnswerId
      });
    });
};

// Update a Answer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Answer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Answer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Answer with id=${id}. Maybe Answer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Answer with id=" + id
      });
    });
};

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Answer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Answer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Answer with id=" + id
      });
    });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
  Answer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Answers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Answers."
      });
    });
};

// find all NFC capable Answer
exports.findAllActive= (req, res) => {
  Answer.findAll({ where: { status: "A" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Answers."
      });
    });
};
