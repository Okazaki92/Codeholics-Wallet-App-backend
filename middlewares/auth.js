const passport = require("passport");

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err || user.token !== authorization.split(" ")[1]) {
      return res.status(401).json({
        status: "Unauthorized",
        code: "401",
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
