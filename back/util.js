exports.isAuth = (req, res, next) => {
  if (req.session.user) next();
  else {
    return res.status(401).send({ msg: "you are not connect" });
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "you are not admin" });
};
