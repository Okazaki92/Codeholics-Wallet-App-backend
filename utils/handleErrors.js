const handle404 = (res, message, data) => {
  return res.status(404).json({
    status: "Not Found",
    code: "404",
    message: `${message}`,
    data,
  });
};

const handle500 = (res, message) => {
  return res.status(500).json({
    message: message,
  });
};

const handle409 = (res, message) => {
  return res.status(409).json({
    status: "Conflict",
    code: "409",
    message: `${message}`,
  });
};

const handle201 = (res, message, data) => {
  return res.status(201).json({
    status: "Success",
    code: "201",
    message: message,
    data: data,
  });
};

const handle401 = (res, message) => {
  return res.status(401).json({
    status: "Unauthorized",
    code: "401",
    message: message,
  });
};

const handle200 = (res, message, data) => {
  return res.status(200).json({
    status: "Success",
    code: "200",
    message: message,
    data: data,
  });
};

const handle204 = (res) => {
  return res.status(204).json();
};

const handle400 = (res, message) => {
  return res.status(400).json({ message: message });
};
module.exports = {
  handle404,
  handle500,
  handle409,
  handle201,
  handle401,
  handle200,
  handle204,
  handle400,
};
