const db = require("../models");
const userAnswer = db.user_answers;
const Op = db.Sequelize.Op;

// Create and Save a new userAnswer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "El usuario de la respuesta no puede estar vacío."
    });
    return;
  }

  // Create a userAnswer
  const user_answer = {
    user_id: req.body.user_id,
    form_id: req.body.form_id,
    question_id: req.body.question_id,
    answer_id: req.body.answer_id,
    status: "A"
  };

  // Save userAnswer in the database
  userAnswer.create(user_answer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userAnswer."
      });
    });
};

// Retrieve all userAnswers from the database.
exports.findAll = (req, res) => {
  const formId = req.query.form_id;
  const userId = req.query.user_id;
  //var condition = status ? { status: { [Op.iLike]: `%${status}%` } } : null;
  userAnswer.findAll({ where: { form_id: formId, user_id: userId } })
  //userAnswer.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userAnswers."
      });
    });
};

// Retrieve all data users from the database.
exports.findAllData = async (req, res) => {
  const formId = req.query.form_id;
  const questId = req.query.question_id;

  //const users = await sequelize.query('SELECT a.text as "answer", u.email, u.name, u.last_name, u.surname, u.birthdate, u.gender, u.phone, u.postal_code, u.suburb, u.generation, u.municipality, u.city, u.state, d.ip, d.isp, d.country, d.screen_resolution, d.color_depth, d.lang, d.timezone, d.cpu_cores, d.device_memory, d.network_type, d.is_mobile, d.hardware_vendor, d.hardware_model, d.hardware_name, d.device_type, d.platform_vendor, d.platform_name, d.platform_version, d.browser_vendor, d.browser_name, d.browser_version, d.hardware_rank, d.is_tablet, d.screen_width_px, d.screen_height_px, d.has_touch_screen, d.has_camera, d.is_tv, d.is_smartphone, d.is_small_screen, d.has_nfc, d.hardware_family, d.oem, d.is_screen_foldable, d.platform_rank, d.has_geo_location, d.is_email_browser, d.is_emulating_device, d.is_crawler, d.is_ia, d.device_id, d."createdAt" FROM user_answer ua JOIN answer a ON a.form_id = ua.form_id AND a.question_id = ua.question_id AND a.id = ua.answer_id JOIN nrm_plus_user u ON u.id = ua.user_id JOIN device_data d ON d.id = (SELECT MAX(id) FROM device_data WHERE email = u.email) WHERE ua.form_id = '+formId+' AND ua.question_id = '+questId, {
    const users = await db.Sequelize.query('SELECT a.text, u.email, u.name, u.last_name, u.surname FROM user_answer ua JOIN answer a ON a.form_id = ua.form_id AND a.question_id = ua.question_id AND a.id = ua.answer_id JOIN nrm_plus_user u ON u.id = ua.user_id JOIN device_data d ON d.id = (SELECT MAX(id) FROM device_data WHERE email = u.email) WHERE ua.form_id = 1 AND ua.question_id = 2', {
    type: db.Sequelize.QueryTypes.SELECT,
    bind: { formId: formId, questId: questId }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving userAnswers."
    });
  });
};

// Find a single userAnswer with an id
exports.findOne = (req, res) => {
  const userAnswerId = req.params.id;

  userAnswer.findOne({ where: { id: userAnswerId } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find userAnswer with id=${userAnswerId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving userAnswer with id=" + userAnswerId
      });
    });
};

// Update a userAnswer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  userAnswer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "userAnswer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update userAnswer with id=${id}. Maybe userAnswer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating userAnswer with id=" + id
      });
    });
};

// Delete a userAnswer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  userAnswer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "userAnswer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete userAnswer with id=${id}. Maybe userAnswer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete userAnswer with id=" + id
      });
    });
};

// Delete all userAnswers from the database.
exports.deleteAll = (req, res) => {
  userAnswer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} userAnswers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userAnswers."
      });
    });
};

// find all NFC capable userAnswer
exports.findAllActive= (req, res) => {
  userAnswer.findAll({ where: { status: "A" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userAnswers."
      });
    });
};
