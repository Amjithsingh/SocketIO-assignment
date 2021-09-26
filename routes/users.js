const express = require('express');
const router = express.Router();
const md5 = require('md5');

const models = require('../models');
const appUtil = require('../utils');
const { sendNotification } = require('../socket/socketActions');

/* GET users listing. */
router.get('/', appUtil.asyncHandler(async (req, res) => {
  console.log('fd')
  const list = await models.user.findAll({
    attributes: ['id', 'username', 'emailId']
  });
  return res.json(list);
}));

router.post('/', appUtil.asyncHandler(async (req, res) => {
  const hash = md5(req.body.password);
  const add = await models.user.create({ ...req.body, password: hash });
  const userDetails = await models.user.findOne({
    attributes: ['id', 'username', 'emailId'],
    where: {
      id: add.id
    }
  });
  sendNotification('toobler', { message: `${req.body.username} signed up at ${new Date()}` });

  return res.json(userDetails);
}));

router.patch('/:id', appUtil.asyncHandler(async (req, res) => {
  let hash;
  if (req.body.password) {
    hash = md5(req.body.password);
  }

  const user = await models.user.findOne({
    attributes: ['id', 'username'],
    where: {
      id: req.params.id
    }
  });
  if (user) {
    await models.user.update({ ...req.body, password: hash }, {
      where: {
        id: req.params.id
      }
    });
    const userDetails = await models.user.findOne({
      attributes: ['id', 'username', 'emailId'],
      where: {
        id: req.params.id
      }
    });
    sendNotification('toobler', { message: `${user.username} edited user info at ${new Date()}` });

    return res.json(userDetails);
  }
  return res.status(404).json({ status: 'user not found' })
}));

module.exports = router;
