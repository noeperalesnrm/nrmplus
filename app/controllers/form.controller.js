const db = require("../models");
const Form = db.forms;
const Op = db.Sequelize.Op;

// Create and Save a new Form
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "El nombre del formulario no puede estar vacío."
    });
    return;
  }

  // Create a Form
  const form = {
    name: req.body.name,
    type: req.body.type,
    status: "A"
  };

  // Save Form in the database
  Form.create(form)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Form."
      });
    });
};

// Retrieve all Forms from the database.
exports.findAll = (req, res) => {
  const status = req.query.status;
  var condition = status ? { status: { [Op.iLike]: `%${status}%` } } : null;
  //Form.findAll({ where: condition })
  Form.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Forms."
      });
    });
};

// Find a single Form with an id
exports.findOne = (req, res) => {
  const FormId = req.params.id;

  Form.findOne({ where: { id: FormId } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Form with id=${FormId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Form with id=" + FormId
      });
    });
};

// Update a Form by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Form.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Form was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Form with id=${id}. Maybe Form was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Form with id=" + id
      });
    });
};

// Delete a Form with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Form.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Form was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Form with id=${id}. Maybe Form was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Form with id=" + id
      });
    });
};

// Delete all Forms from the database.
exports.deleteAll = (req, res) => {
  Form.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Forms were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Forms."
      });
    });
};

// find all NFC capable Form
exports.findAllActive= (req, res) => {
  Form.findAll({ where: { status: "A" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Forms."
      });
    });
};
