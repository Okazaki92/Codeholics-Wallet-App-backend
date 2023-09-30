const validation = (req, res, schema) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      statusText: "Bad Request",
      code: 400,
      ResponseBody: {
        message: `Input data validation error: ${error.message}`,
      },
    });
  } else {
    return false;
  }
  
};

module.exports = validation;
