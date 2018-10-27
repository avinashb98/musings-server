const User = require('../models/users');
// const Muses = require('../models/muses');
const {
  // ValidationError,
  // PermissionError,
  AuthorizationError,
  DatabaseError,
  NotFoundError,
  // OperationalError
} = require('../utils/errors');

const login = async (req, res, next) => {
  const { username } = req.parsed;
  let foundUser = null;
  try {
    foundUser = await User.findOne({ username });
  } catch (error) {
    next(new AuthorizationError('Username or password do not match'));
    return;
  }

  if (foundUser === null || foundUser.password !== req.parsed.password) {
    next(new NotFoundError('Username or password do not match'));
    return;
  }
  next();
};

const getUser = async (req, res, next) => {
  const { username } = req.params;
  let user;
  try {
    user = await User.findOne({ username });
    if (user === null) {
      next(new NotFoundError('No user in the database'));
      return;
    }
  } catch (err) {
    next(new DatabaseError('Error in fetching user Info'));
  }

  res.status(200).json({
    success: true,
    msg: 'User found successfully',
    data: {
      username,
      location: user.location
    }
  });
};

const register = async (req, res, next) => {
  const user = new User();
  user.username = req.parsed.username;
  user.password = req.parsed.password;
  user.location = req.parsed.location;
  try {
    await user.save();
  } catch (error) {
    console.log(error);
    next(new DatabaseError('Error in creating user'));
    return;
  }
  res.status(201).json({
    success: true,
    message: 'User successfully created',
    data: {
      username: req.parsed.username,
      location: req.parsed.location
    },
  });
};

const update = async (req, res, next) => {
  const { username } = req.decoded;
  let user = null;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    next(new DatabaseError('Some error occurred'));
    return;
  }
  if (user === null) {
    next(new NotFoundError('No user in the database'));
    return;
  }

  user.location = req.parsed.location;
  try {
    await user.save();
    res.status(200).json({
      success: true,
      msg: 'User successfuly updated',
      data: {
        user: {
          location: user.location
        }
      }
    });
  } catch (error) {
    next(new DatabaseError('Could not update User'));
  }
};

module.exports = {
  login,
  getUser,
  update,
  register
};
