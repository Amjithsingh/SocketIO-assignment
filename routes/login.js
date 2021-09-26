
const express = require('express');
const router = express.Router();
const md5 = require('md5');

const { sendNotification } = require('../socket/socketActions');
const models = require('../models');
const appUtil = require('../utils');

router.post('/', appUtil.asyncHandler(async (req, res) => {
    const hash = md5(req.body.password);
    // const add = await models.user.create({ ...req.body, password: hash });
    const userDetails = await models.user.findOne({
        attributes: ['id', 'username', 'emailId'],
        where: {
            username: req.body.username,
            password: hash
        }
    });
    if (userDetails) {
        sendNotification('toobler', { message: `${req.body.username} logged in at ${new Date()}` });

        return res.json(userDetails);
    }
    return res.status(400).json({ status: 'fail' })

}));

module.exports = router;
