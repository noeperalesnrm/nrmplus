module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: { type: Sequelize.STRING, allowNull: false, unique: {
        args: true,
        msg: 'El correo que ingresaste ya se encuentra registrado.'
      }
    },
    name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    surname: { type: Sequelize.STRING },
    birthdate: { type: Sequelize.STRING },
    gender: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    postal_code: { type: Sequelize.STRING },
    suburb: { type: Sequelize.STRING },
    generation: { type: Sequelize.STRING },
    municipality: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    state: { type: Sequelize.STRING }
  },
  {
    tableName: 'nrm_plus_user',
  });

  return User;
};
