var options = {
  AT : {
    username: process.env.AT_USERNAME,
    apiKey: process.env.AT_APIKEY,
    format: 'json'
  },
  mysql: {
    host: process.env.DB_HOST,
    db: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  },
  redis: {
    port: 6709,
    host: 'localhost'
  }
};

module.exports = options;
