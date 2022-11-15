const conf = require('../config/config');

module.exports = {
  secret: conf.AUTH_SECRET || "secret",
  expiresIn: conf.AUTH_EXPIRES || "1h",
  rounds: conf.AUTH_ROUNDS || 5
};
