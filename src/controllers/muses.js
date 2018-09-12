const Muse = require('../models/muses');
const User = require('../models/users');
const {
  ValidationError,
  PermissionError,
  AuthorizationError,
  DatabaseError,
  NotFoundError,
  OperationalError
} = require('../utils/errors');

const create = async(req, res) => {
  const username = req.decoded.username;
  let user = null;
  try {
    user = await User.findOne({username});
  } catch (error) {
    return next(new DatabaseError('Error Getting user'));
  }

  if(user === null) {
    return next(new NotFoundError('No user found'));
  }

  const content = req.body.content;
  const muse = new Muse({
    author: user._id,
    content
  });
  await muse.save();

  user.muses.push(muse);
  await user.save();

  res.status(201).json({
    message: 'Muse successfully created',
    muse: muse
  });
}

const remove = async(req, res) => {
  const username = req.body.username;
  const museId = req.body.museId;
  let user = null;
  let userMuses = null;
  try {
    user = await User.findOne({username});
    userMuses = await Muse.findById(user.muses);
    userMuses.muses.push({ content });
    await userMuses.save();
  } catch (error) {
    return next(new DatabaseError('Error Removing Muse from DB'));
  }
  res.status(201).json({
    msg: 'Muse added successfully'
  });
}

module.exports = {
  create,
  remove
};
