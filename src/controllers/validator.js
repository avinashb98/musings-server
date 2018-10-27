const {
  ValidateLogin,
  ValidateRegister,
  ValidateGetUser,
  ValidateUpdateUser,
  ValidateCreateMuse,
  ValidateRemoveMuse
} = require('../../config/validatorSchema');
const {
  ValidationError
} = require('../utils/errors');

const validationErr = new ValidationError('Input fields do not meet criteria');

const login = (req, res, next) => {
  const { error, value } = ValidateLogin.validate(req.body);
  if (error) {
    next(validationErr);
    return;
  }
  req.parsed = value;
  next();
};

const register = (req, res, next) => {
  const { error, value } = ValidateRegister.validate(req.body);
  if (error) {
    next(validationErr);
    return;
  }
  req.parsed = value;
  next();
};

const getUser = (req, res, next) => {
  const { error, value } = ValidateGetUser.validate(req.params);
  if (error) {
    next(validationErr);
    return;
  }
  req.params = value;
  next();
};

const updateUser = (req, res, next) => {
  const { error, value } = ValidateUpdateUser.validate(req.body);
  if (error) {
    next(validationErr);
    return;
  }
  req.parsed = value;
  next();
};

const createMuse = (req, res, next) => {
  const { error, value } = ValidateCreateMuse.validate(req.body);
  if (error) {
    next(validationErr);
    return;
  }
  req.parsed = value;
  next();
};

const removeMuse = (req, res, next) => {
  const { error, value } = ValidateRemoveMuse.validate(req.body);
  if (error) {
    next(validationErr);
    return;
  }
  req.parsed = value;
  next();
};

module.exports = {
  login,
  register,
  getUser,
  updateUser,
  createMuse,
  removeMuse
};
