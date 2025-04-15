const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    email: req.body.email,
    name: req.body.name,
    last_name: req.body.last_name,
    surname: req.body.surname,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    phone: req.body.phone,
    postal_code: req.body.postal_code,
    suburb: req.body.suburb,
    generation: req.body.generation,
    municipality: req.body.municipality,
    city: req.body.city,
    state: req.body.state
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Retrieve all Users from the database optimized for smart-tables in Angular Dashboard.
exports.findAllPaginated = (req, res) => {
  
  const id = req.query.id_like;
  const email = req.query.email_like;
  const name = req.query.name_like;
  const last_name = req.query.last_name_like;
  const surname = req.query.surname_like;
  const birthdate = req.query.birthdate_like;
  const gender = req.query.gender_like;
  const phone = req.query.phone_like;
  const postal_code = req.query.postal_code_like;
  const suburb = req.query.suburb_like;
  const generation = req.query.generation_like;
  const municipality = req.query.municipality_like;
  const city = req.query.city_like;
  const state = req.query.state_like;
  const createdAt = req.query.createdAt_like;
  const updatedAt = req.query.updatedAt_like;

  const sortField = req.query._sort ? req.query._sort : 'id';
  const orderSort = req.query._order ? req.query._order : 'asc';

  let searchStr = {};

  if(id) { searchStr.id = { [Op.like]: `%${id}%` } }
  if(email) { searchStr.email = { [Op.like]: `%${email}%` } }
  if(name) { searchStr.name = { [Op.like]: `%${name}%` } }
  if(last_name) { searchStr.last_name = { [Op.like]: `%${last_name}%` } }
  if(surname) { searchStr.surname = { [Op.like]: `%${surname}%` } }
  if(birthdate) { searchStr.birthdate = { [Op.like]: `%${birthdate}%` } }
  if(gender) { searchStr.gender = { [Op.like]: `%${gender}%` } }
  if(phone) { searchStr.phone = { [Op.like]: `%${phone}%` } }
  if(postal_code) { searchStr.postal_code = { [Op.like]: `%${postal_code}%` } }
  if(suburb) { searchStr.suburb = { [Op.like]: `%${suburb}%` } }
  if(generation) { searchStr.generation = { [Op.like]: `%${generation}%` } }
  if(municipality) { searchStr.municipality = { [Op.like]: `%${municipality}%` } }
  if(city) { searchStr.city = { [Op.like]: `%${city}%` } }
  if(state) { searchStr.state = { [Op.like]: `%${state}%` } }
  if(createdAt) { searchStr.createdAt = { [Op.like]: `%${createdAt}%` } }
  if(updatedAt) { searchStr.updatedAt = { [Op.like]: `%${updatedAt}%` } }

  const offset = req.query.offset ? (req.query.offset-1)*10 : null;
  const limit = req.query.limit ? req.query.limit : null;

  //Device.findAll({ offset: offset, limit: limit })
  const { count, rows } = User.findAndCountAll({ where: searchStr, offset: offset, limit: limit, order:[ [ sortField, orderSort ] ] })
    .then(rows => {
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('X-Total-Count', count);
      res.send(rows);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving paginated users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const userEmail = req.params.email;

  User.findOne({ where: { email: userEmail } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with email=${userEmail}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + userEmail
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// find all NFC capable User
exports.findAllWomen= (req, res) => {
  User.findAll({ where: { gender: "M" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
