const validation = (schema) => {
  console.log("walidacja dziala");
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log("blad", error);
    if (error) {
      error.status = 400;
      console.log("tttttt");
      next(error);
      return;
    }
    console.log("rrrrrr");
    next();
  };
};

module.exports = validation;
