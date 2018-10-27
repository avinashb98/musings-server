const express = require('express');
const muses = require('../controllers/muses');
const validate = require('../controllers/validator');
const { errorHandler } = require('../middlewares/errors');

const router = express.Router();
const jwt = require('../middlewares/jwt');

router.post('/create', jwt.verifyToken, validate.createMuse, muses.create);
router.delete('/remove', jwt.verifyToken, validate.removeMuse, muses.remove);

router.use(errorHandler);

module.exports = router;
