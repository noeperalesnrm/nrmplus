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
  const offset = req.query.offset ? (req.query.offset-1)*10 : 0;
  const limit = req.query.limit ? req.query.limit : 10;
  const sortField = req.query._sort ? req.query._sort : 'ua.id';
  const orderSort = req.query._order ? req.query._order : 'asc';

  let queryCount = 'SELECT COUNT(*) AS "count" FROM user_answer ua JOIN answer a ON a.form_id = ua.form_id AND a.question_id = ua.question_id AND a.id = ua.answer_id JOIN nrm_plus_user u ON u.id = ua.user_id JOIN device_data d ON d.id = (SELECT MAX(id) FROM device_data WHERE email = u.email) WHERE ua.form_id = :formId AND ua.question_id = :questId ';
  if(req.query.id_like) { queryCount += "AND CAST(ua.id AS TEXT) ILIKE '%"+req.query.id_like+"%' "; }
  if(req.query.answer_like) { queryCount += "AND a.text ILIKE '%"+req.query.answer_like+"%' "; }
  if(req.query.email_like) { queryCount += "AND u.email ILIKE '%"+req.query.email_like+"%' "; }
  if(req.query.name_like) { queryCount += "AND u.name ILIKE '%"+req.query.name_like+"%' "; }
  if(req.query.surname_like) { queryCount += "AND u.surname ILIKE '%"+req.query.surname_like+"%' "; }
  if(req.query.birthdate_like) { queryCount += "AND CAST(u.birthdate AS TEXT) ILIKE '%"+req.query.birthdate_like+"%' "; }
  if(req.query.gender_like) { queryCount += "AND u.gender ILIKE '%"+req.query.gender_like+"%' "; }
  if(req.query.postal_code_like) { queryCount += "AND u.postal_code ILIKE '%"+req.query.postal_code_like+"%' "; }
  if(req.query.suburb_like) { queryCount += "AND u.suburb ILIKE '%"+req.query.suburb_like+"%' "; }
  if(req.query.generation_like) { queryCount += "AND u.generation ILIKE '%"+req.query.generation_like+"%' "; }
  if(req.query.municipality_like) { queryCount += "AND u.municipality ILIKE '%"+req.query.municipality_like+"%' "; }
  if(req.query.city_like) { queryCount += "AND u.city ILIKE '%"+req.query.city_like+"%' "; }
  if(req.query.state_like) { queryCount += "AND u.state ILIKE '%"+req.query.state_like+"%' "; }
  if(req.query.ip_like) { queryCount += "AND d.ip ILIKE '%"+req.query.ip_like+"%' "; }
  if(req.query.isp_like) { queryCount += "AND d.isp ILIKE '%"+req.query.isp_like+"%' "; }
  if(req.query.country_like) { queryCount += "AND d.country ILIKE '%"+req.query.country_like+"%' "; }
  if(req.query.screen_resolution_like) { queryCount += "AND d.screen_resolution ILIKE '%"+req.query.screen_resolution_like+"%' "; }
  if(req.query.color_depth_like) { queryCount += "AND d.color_depth ILIKE '%"+req.query.color_depth_like+"%' "; }
  if(req.query.lang_like) { queryCount += "AND d.lang ILIKE '%"+req.query.lang_like+"%' "; }
  if(req.query.timezone_like) { queryCount += "AND d.timezone ILIKE '%"+req.query.timezone_like+"%' "; }
  if(req.query.cpu_cores_like) { queryCount += "AND d.cpu_cores ILIKE '%"+req.query.cpu_cores_like+"%' "; }
  if(req.query.device_memory_like) { queryCount += "AND d.device_memory ILIKE '%"+req.query.device_memory_like+"%' "; }
  if(req.query.network_type_like) { queryCount += "AND d.network_type ILIKE '%"+req.query.network_type_like+"%' "; }
  if(req.query.is_mobile_like) { queryCount += "AND d.is_mobile ILIKE '%"+req.query.is_mobile_like+"%' "; }
  if(req.query.hardware_vendor_like) { queryCount += "AND d.hardware_vendor ILIKE '%"+req.query.hardware_vendor_like+"%' "; }
  if(req.query.hardware_model_like) { queryCount += "AND d.hardware_model ILIKE '%"+req.query.hardware_model_like+"%' "; }
  if(req.query.hardware_name_like) { queryCount += "AND d.hardware_name ILIKE '%"+req.query.hardware_name_like+"%' "; }
  if(req.query.device_type_like) { queryCount += "AND d.device_type ILIKE '%"+req.query.device_type_like+"%' "; }
  if(req.query.platform_vendor_like) { queryCount += "AND d.platform_vendor ILIKE '%"+req.query.platform_vendor_like+"%' "; }
  if(req.query.platform_name_like) { queryCount += "AND d.platform_name ILIKE '%"+req.query.platform_name_like+"%' "; }
  if(req.query.platform_version_like) { queryCount += "AND d.platform_version ILIKE '%"+req.query.platform_version_like+"%' "; }
  if(req.query.browser_vendor_like) { queryCount += "AND d.browser_vendor ILIKE '%"+req.query.browser_vendor_like+"%' "; }
  if(req.query.browser_name_like) { queryCount += "AND d.browser_name ILIKE '%"+req.query.browser_name_like+"%' "; }
  if(req.query.browser_version_like) { queryCount += "AND d.browser_version ILIKE '%"+req.query.browser_version_like+"%' "; }
  if(req.query.hardware_rank_like) { queryCount += "AND d.hardware_rank ILIKE '%"+req.query.hardware_rank_like+"%' "; }
  if(req.query.is_tablet_like) { queryCount += "AND d.is_tablet ILIKE '%"+req.query.is_tablet_like+"%' "; }
  if(req.query.screen_width_pxlike) { queryCount += "AND d.screen_width_px ILIKE '%"+req.query.screen_width_pxlike+"%' "; }
  if(req.query.screen_height_px_like) { queryCount += "AND d.screen_height_px ILIKE '%"+req.query.screen_height_px_like+"%' "; }
  if(req.query.has_touch_screen_like) { queryCount += "AND d.has_touch_screen ILIKE '%"+req.query.has_touch_screen_like+"%' "; }
  if(req.query.has_camera_like) { queryCount += "AND d.has_camera ILIKE '%"+req.query.has_camera_like+"%' "; }
  if(req.query.is_tv_like) { queryCount += "AND d.is_tv ILIKE '%"+req.query.is_tv_like+"%' "; }
  if(req.query.is_smartphone_like) { queryCount += "AND d.is_smartphone ILIKE '%"+req.query.is_smartphone_like+"%' "; }
  if(req.query.is_small_screen_like) { queryCount += "AND d.is_small_screen ILIKE '%"+req.query.is_small_screen_like+"%' "; }
  if(req.query.has_nfc_like) { queryCount += "AND d.has_nfc ILIKE '%"+req.query.has_nfc_like+"%' "; }
  if(req.query.hardware_family_like) { queryCount += "AND d.hardware_family ILIKE '%"+req.query.hardware_family_like+"%' "; }
  if(req.query.oem_like) { queryCount += "AND d.oem ILIKE '%"+req.query.oem_like+"%' "; }
  if(req.query.is_screen_foldable_like) { queryCount += "AND d.is_screen_foldable ILIKE '%"+req.query.is_screen_foldable_like+"%' "; }
  if(req.query.platform_rank_like) { queryCount += "AND d.platform_rank ILIKE '%"+req.query.platform_rank_like+"%' "; }
  if(req.query.has_geo_location_like) { queryCount += "AND d.has_geo_location ILIKE '%"+req.query.has_geo_location_like+"%' "; }
  if(req.query.is_email_browser_like) { queryCount += "AND d.is_email_browser ILIKE '%"+req.query.is_email_browser_like+"%' "; }
  if(req.query.is_emulating_device_like) { queryCount += "AND d.is_emulating_device ILIKE '%"+req.query.is_emulating_device_like+"%' "; }
  if(req.query.is_crawler_like) { queryCount += "AND d.is_crawler ILIKE '%"+req.query.is_crawler_like+"%' "; }
  if(req.query.is_ia_like) { queryCount += "AND d.is_ia ILIKE '%"+req.query.is_ia_like+"%' "; }
  if(req.query.device_id_like) { queryCount += "AND d.device_id ILIKE '%"+req.query.device_id_like+"%' "; }
  if(req.query.createdAt_like) { queryCount += "AND CAST(d.\"createdAt\" AS TEXT) ILIKE '%"+req.query.createdAt_like+"%' "; }

  const count = await db.sequelize.query(queryCount, {
    type: db.Sequelize.QueryTypes.SELECT,
    replacements: { formId: formId, questId: questId }
  })
  .then(async dataCount => {
    let query = 'SELECT ua.id, a.text as "answer", u.email, u.name, u.last_name, u.surname, u.birthdate, u.gender, u.phone, u.postal_code, u.suburb, u.generation, u.municipality, u.city, u.state, d.ip, d.isp, d.country, d.screen_resolution, d.color_depth, d.lang, d.timezone, d.cpu_cores, d.device_memory, d.network_type, d.is_mobile, d.hardware_vendor, d.hardware_model, d.hardware_name, d.device_type, d.platform_vendor, d.platform_name, d.platform_version, d.browser_vendor, d.browser_name, d.browser_version, d.hardware_rank, d.is_tablet, d.screen_width_px, d.screen_height_px, d.has_touch_screen, d.has_camera, d.is_tv, d.is_smartphone, d.is_small_screen, d.has_nfc, d.hardware_family, d.oem, d.is_screen_foldable, d.platform_rank, d.has_geo_location, d.is_email_browser, d.is_emulating_device, d.is_crawler, d.is_ia, d.device_id, d."createdAt" FROM user_answer ua JOIN answer a ON a.form_id = ua.form_id AND a.question_id = ua.question_id AND a.id = ua.answer_id JOIN nrm_plus_user u ON u.id = ua.user_id JOIN device_data d ON d.id = (SELECT MAX(id) FROM device_data WHERE email = u.email) WHERE ua.form_id = :formId AND ua.question_id = :questId ';    
    if(req.query.id_like) { query += "AND CAST(ua.id AS TEXT) ILIKE '%"+req.query.id_like+"%' "; }
    if(req.query.answer_like) { query += "AND a.text ILIKE '%"+req.query.answer_like+"%' "; }
    if(req.query.email_like) { query += "AND u.email ILIKE '%"+req.query.email_like+"%' "; }
    if(req.query.name_like) { query += "AND u.name ILIKE '%"+req.query.name_like+"%' "; }
    if(req.query.surname_like) { query += "AND u.surname ILIKE '%"+req.query.surname_like+"%' "; }
    if(req.query.birthdate_like) { query += "AND CAST(u.birthdate AS TEXT) ILIKE '%"+req.query.birthdate_like+"%' "; }
    if(req.query.gender_like) { query += "AND u.gender ILIKE '%"+req.query.gender_like+"%' "; }
    if(req.query.postal_code_like) { query += "AND u.postal_code ILIKE '%"+req.query.postal_code_like+"%' "; }
    if(req.query.suburb_like) { query += "AND u.suburb ILIKE '%"+req.query.suburb_like+"%' "; }
    if(req.query.generation_like) { query += "AND u.generation ILIKE '%"+req.query.generation_like+"%' "; }
    if(req.query.municipality_like) { query += "AND u.municipality ILIKE '%"+req.query.municipality_like+"%' "; }
    if(req.query.city_like) { query += "AND u.city ILIKE '%"+req.query.city_like+"%' "; }
    if(req.query.state_like) { query += "AND u.state ILIKE '%"+req.query.state_like+"%' "; }
    if(req.query.ip_like) { query += "AND d.ip ILIKE '%"+req.query.ip_like+"%' "; }
    if(req.query.isp_like) { query += "AND d.isp ILIKE '%"+req.query.isp_like+"%' "; }
    if(req.query.country_like) { query += "AND d.country ILIKE '%"+req.query.country_like+"%' "; }
    if(req.query.screen_resolution_like) { query += "AND d.screen_resolution ILIKE '%"+req.query.screen_resolution_like+"%' "; }
    if(req.query.color_depth_like) { query += "AND d.color_depth ILIKE '%"+req.query.color_depth_like+"%' "; }
    if(req.query.lang_like) { query += "AND d.lang ILIKE '%"+req.query.lang_like+"%' "; }
    if(req.query.timezone_like) { query += "AND d.timezone ILIKE '%"+req.query.timezone_like+"%' "; }
    if(req.query.cpu_cores_like) { query += "AND d.cpu_cores ILIKE '%"+req.query.cpu_cores_like+"%' "; }
    if(req.query.device_memory_like) { query += "AND d.device_memory ILIKE '%"+req.query.device_memory_like+"%' "; }
    if(req.query.network_type_like) { query += "AND d.network_type ILIKE '%"+req.query.network_type_like+"%' "; }
    if(req.query.is_mobile_like) { query += "AND d.is_mobile ILIKE '%"+req.query.is_mobile_like+"%' "; }
    if(req.query.hardware_vendor_like) { query += "AND d.hardware_vendor ILIKE '%"+req.query.hardware_vendor_like+"%' "; }
    if(req.query.hardware_model_like) { query += "AND d.hardware_model ILIKE '%"+req.query.hardware_model_like+"%' "; }
    if(req.query.hardware_name_like) { query += "AND d.hardware_name ILIKE '%"+req.query.hardware_name_like+"%' "; }
    if(req.query.device_type_like) { query += "AND d.device_type ILIKE '%"+req.query.device_type_like+"%' "; }
    if(req.query.platform_vendor_like) { query += "AND d.platform_vendor ILIKE '%"+req.query.platform_vendor_like+"%' "; }
    if(req.query.platform_name_like) { query += "AND d.platform_name ILIKE '%"+req.query.platform_name_like+"%' "; }
    if(req.query.platform_version_like) { query += "AND d.platform_version ILIKE '%"+req.query.platform_version_like+"%' "; }
    if(req.query.browser_vendor_like) { query += "AND d.browser_vendor ILIKE '%"+req.query.browser_vendor_like+"%' "; }
    if(req.query.browser_name_like) { query += "AND d.browser_name ILIKE '%"+req.query.browser_name_like+"%' "; }
    if(req.query.browser_version_like) { query += "AND d.browser_version ILIKE '%"+req.query.browser_version_like+"%' "; }
    if(req.query.hardware_rank_like) { query += "AND d.hardware_rank ILIKE '%"+req.query.hardware_rank_like+"%' "; }
    if(req.query.is_tablet_like) { query += "AND d.is_tablet ILIKE '%"+req.query.is_tablet_like+"%' "; }
    if(req.query.screen_width_pxlike) { query += "AND d.screen_width_px ILIKE '%"+req.query.screen_width_pxlike+"%' "; }
    if(req.query.screen_height_px_like) { query += "AND d.screen_height_px ILIKE '%"+req.query.screen_height_px_like+"%' "; }
    if(req.query.has_touch_screen_like) { query += "AND d.has_touch_screen ILIKE '%"+req.query.has_touch_screen_like+"%' "; }
    if(req.query.has_camera_like) { query += "AND d.has_camera ILIKE '%"+req.query.has_camera_like+"%' "; }
    if(req.query.is_tv_like) { query += "AND d.is_tv ILIKE '%"+req.query.is_tv_like+"%' "; }
    if(req.query.is_smartphone_like) { query += "AND d.is_smartphone ILIKE '%"+req.query.is_smartphone_like+"%' "; }
    if(req.query.is_small_screen_like) { query += "AND d.is_small_screen ILIKE '%"+req.query.is_small_screen_like+"%' "; }
    if(req.query.has_nfc_like) { query += "AND d.has_nfc ILIKE '%"+req.query.has_nfc_like+"%' "; }
    if(req.query.hardware_family_like) { query += "AND d.hardware_family ILIKE '%"+req.query.hardware_family_like+"%' "; }
    if(req.query.oem_like) { query += "AND d.oem ILIKE '%"+req.query.oem_like+"%' "; }
    if(req.query.is_screen_foldable_like) { query += "AND d.is_screen_foldable ILIKE '%"+req.query.is_screen_foldable_like+"%' "; }
    if(req.query.platform_rank_like) { query += "AND d.platform_rank ILIKE '%"+req.query.platform_rank_like+"%' "; }
    if(req.query.has_geo_location_like) { query += "AND d.has_geo_location ILIKE '%"+req.query.has_geo_location_like+"%' "; }
    if(req.query.is_email_browser_like) { query += "AND d.is_email_browser ILIKE '%"+req.query.is_email_browser_like+"%' "; }
    if(req.query.is_emulating_device_like) { query += "AND d.is_emulating_device ILIKE '%"+req.query.is_emulating_device_like+"%' "; }
    if(req.query.is_crawler_like) { query += "AND d.is_crawler ILIKE '%"+req.query.is_crawler_like+"%' "; }
    if(req.query.is_ia_like) { query += "AND d.is_ia ILIKE '%"+req.query.is_ia_like+"%' "; }
    if(req.query.device_id_like) { query += "AND d.device_id ILIKE '%"+req.query.device_id_like+"%' "; }
    if(req.query.createdAt_like) { query += "AND CAST(d.\"createdAt\" AS TEXT) ILIKE '%"+req.query.createdAt_like+"%' "; }

    query +=  'ORDER BY '+sortField+' '+orderSort+' LIMIT '+limit+' OFFSET '+offset;
    const users = await db.sequelize.query(query, {
      type: db.Sequelize.QueryTypes.SELECT,
      replacements: { formId: formId, questId: questId }
    })
    .then(data => {
  
      const resp = {
        count: dataCount[0].count,
        rows: data
      };
  
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('X-Total-Count', dataCount[0].count);
      res.send(resp);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving All Data."
      });
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving All Data COUNT."
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
