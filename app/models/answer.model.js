module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define("answer", {
    form_id: { type: Sequelize.STRING },
    question_id: { type: Sequelize.STRING },
    text: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING }
  },
  {
    tableName: 'answer',
  });

  return Answer;
};
