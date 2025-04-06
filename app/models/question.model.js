module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    form_id: { type: Sequelize.STRING },
    text: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING }
  },
  {
    tableName: 'question',
  });

  return Question;
};
