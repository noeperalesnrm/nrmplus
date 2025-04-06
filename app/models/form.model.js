module.exports = (sequelize, Sequelize) => {
  const Form = sequelize.define("form", {
    name: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING }
  },
  {
    tableName: 'form',
  });

  return Form;
};
