const Muse = require('../models/muses');
const User = require('../models/users');
const {
  // ValidationError,
  // PermissionError,
  // AuthorizationError,
  DatabaseError,
  NotFoundError,
  // OperationalError,
} = require('../utils/errors');

const create = async (req, res, next) => {
  const { username } = req.decoded;
  let user = null;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    next(new DatabaseError('Error Getting user'));
    return;
  }

  if (user === null) {
    next(new NotFoundError('No user found'));
    return;
  }

  const { content } = req.body;
  const muse = new Muse({ author: user._id, content });
  await muse.save();

  user.muses.push(muse);
  await user.save();

  res.status(201).json({
    success: true,
    message: 'Muse successfully created',
    data: {
      muse: {
        id: muse._id,
        createdAt: muse.createdAt,
        content: muse.content
      }
    },
  });
};

const remove = async (req, res, next) => {
  const museId = req.parsed.id;
  const { username } = req.decoded;

  try {
    await Muse.findOneAndDelete({ _id: museId });
  } catch (error) {
    next(new DatabaseError('Error in removing muse'));
    return;
  }

  let user = null;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    next(new DatabaseError('Error in removing muse'));
    return;
  }

  // Remove muse from user document
  user.muses.splice(user.muses.indexOf(museId), 1);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Muse Successfully Removed',
    data: {}
  });
};

module.exports = {
  create,
  remove
};
