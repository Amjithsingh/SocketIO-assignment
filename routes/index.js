const express = require('express');
const login = require('./login');
const logout = require('./logout');
const users = require('./users');
const crudHandler = require('./crudHandler');

const router = express.Router();

router.use('/login', login);
router.use('/logout', logout);
router.use('/user', users);
router.use('/message', crudHandler('message'));

module.exports = router;
