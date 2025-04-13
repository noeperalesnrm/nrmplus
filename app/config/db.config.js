module.exports = {
  //HOST: "34.58.102.219", //* Para local
  HOST: "localhost", //* Para servidor en GCP
  USER: "postgres",
  PASSWORD: "7e}$P+2})c]l",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

