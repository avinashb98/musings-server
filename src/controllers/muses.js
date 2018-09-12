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
  const muse = new Muse({ author: user._id, content });
  await muse.save();

  user.muses.push(muse);
  await user.save();

  res.status(201).json({
    message: 'Muse successfully created',
    muse: {
      id: muse._id,
      createdAt: muse.createdAt,
      content: muse.content
    }
  });
}

const remove = async(req, res) => {
  const museId = req.parsed.id;
  const username = req.decoded.username;

  try {
    await Muse.findOneAndDelete({_id: museId});
  } catch (error) {
    return next(new DatabaseError('Error in removing muse'));
  }
  let user = null;
  try {
    user = await User.findOne({username});
  } catch (error) {
    return next(new DatabaseError('Error in removing muse'));    
  }
  
  // Remove muse from user document
  user.muses.splice(user.muses.indexOf(museId), 1);
  await user.save();

  res.status(200).json({
    message: 'Muse Successfully Removed'
  });
}

module.exports = {
  create,
  remove
};
