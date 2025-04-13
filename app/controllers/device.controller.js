const db = require("../models");
const Device = db.devices;
const Op = db.Sequelize.Op;

// Create and Save a new Device
exports.create = (req, res) => {
  // Validate request
  if (!req.body.ip) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Device
  const device = {
    email: req.body.email,
    ip: req.body.ip,
    isp: req.body.isp,
    country: req.body.country,
    screen_resolution: req.body.screen_resolution,
    color_depth: req.body.color_depth,
    lang: req.body.lang,
    timezone: req.body.timezone,
    cpu_cores: req.body.cpu_cores,
    device_memory: req.body.device_memory,
    network_type: req.body.network_type,
    is_mobile: req.body.is_mobile,
    hardware_vendor: req.body.hardware_vendor,
    hardware_model: req.body.hardware_model,
    hardware_name: req.body.hardware_name,
    device_type: req.body.device_type,
    platform_vendor: req.body.platform_vendor,
    platform_name: req.body.platform_name,
    platform_version: req.body.platform_version,
    browser_vendor: req.body.browser_vendor,
    browser_name: req.body.browser_name,
    browser_version: req.body.browser_version,
    hardware_rank: req.body.hardware_rank,
    is_tablet: req.body.is_tablet,
    screen_width_px: req.body.screen_width_px,
    screen_height_px: req.body.screen_height_px,
    has_touch_screen: req.body.has_touch_screen,
    has_camera: req.body.has_camera,
    is_tv: req.body.is_tv,
    is_smartphone: req.body.is_smartphone,
    is_small_screen: req.body.is_small_screen,
    has_nfc: req.body.has_nfc,
    hardware_family: req.body.hardware_family,
    oem: req.body.oem,
    is_screen_foldable: req.body.is_screen_foldable,
    platform_rank: req.body.platform_rank,
    has_geo_location: req.body.has_geo_location,
    is_email_browser: req.body.is_email_browser,
    is_emulating_device: req.body.is_emulating_device,
    is_crawler: req.body.is_crawler,
    is_ia: req.body.is_ia,
    device_id: req.body.device_id,
    createdAt: req.body.created_at,
    updatedAt: req.body.updated_at
  };

  // Save Device in the database
  Device.create(device)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Device."
      });
    });
};

// Retrieve all Device from the database.
exports.findAll = (req, res) => {
  const email = req.query.email_like;
  var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

  Device.findAll({ where: condition })
    .then(data => {
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('X-Total-Count', data.length);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving devices."
      });
    });
};

// Retrieve all Device from the database.
exports.findAllPaginated = (req, res) => {

  
  const id = req.query.id_like;
  const email = req.query.email_like;
  const ip = req.query.ip_like;
  const isp = req.query.isp_like;

  var condition1 = id ? { id: { [Op.iLike]: `%${id}%` } } : null;
  var condition2 = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
  var condition3 = ip ? { ip: { [Op.iLike]: `%${ip}%` } } : null;
  var condition4 = isp ? { isp: { [Op.iLike]: `%${isp}%` } } : null;

  const offset = req.query.offset ? (req.query.offset-1)*10 : null;
  const limit = req.query.limit ? req.query.limit : null;

  //Device.findAll({ offset: offset, limit: limit })
  const { count, rows } = Device.findAndCountAll({ where: { $or: [ condition1, condition2, condition3, condition4 ] }, offset: offset, limit: limit })
    .then(rows => {
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('X-Total-Count', count);
      res.send(rows);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving paginated devices."
      });
    });
};

// Find a single Device with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Device.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Device with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Device with id=" + id
      });
    });
};

// Update a Device by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Device.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Device was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Device with id=" + id
      });
    });
};

// Delete a Device with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Device.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Device was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Device with id=${id}. Maybe Device was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Device with id=" + id
      });
    });
};

// Delete all Devices from the database.
exports.deleteAll = (req, res) => {
  Device.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Devices were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all devices."
      });
    });
};

// find all NFC capable Device
exports.findAllNFC = (req, res) => {
  Deviceo.findAll({ where: { has_nfc: "1" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving devices."
      });
    });
};
