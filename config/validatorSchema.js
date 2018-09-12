const Joi = require('joi');

const ValidateLogin = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
}).with('username', 'password');

const ValidateRegister = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  location: Joi.string().min(3)
}).with('username', 'password');

const ValidateGetUser = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required()
});

const ValidateUpdateUser = Joi.object().keys({
  location: Joi.string().min(3).max(30)
});

const ValidateCreateMuse = Joi.object().keys({
  content: Joi.string().required()
});

exports = module.exports = {
  ValidateLogin,
  ValidateRegister,
  ValidateGetUser,
  ValidateUpdateUser,
  ValidateCreateMuse
};