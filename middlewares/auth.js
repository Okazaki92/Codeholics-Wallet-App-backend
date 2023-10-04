const passport = require("passport");
const { handle401 } = require("../utils/handleErrors");

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err || user.token !== authorization.split(" ")[1]) {
      return handle401(res, "Unauthorized");
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
