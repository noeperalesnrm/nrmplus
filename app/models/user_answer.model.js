module.exports = (sequelize, Sequelize) => {
  const UserAnswer = sequelize.define("user_answer", {
    user_id: { type: Sequelize.STRING },
    form_id: { type: Sequelize.STRING },
    question_id: { type: Sequelize.STRING },
    answer_id: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING }
  },
  {
    tableName: 'user_answer',
  });

  return UserAnswer;
};
