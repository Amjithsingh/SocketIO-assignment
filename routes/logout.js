const express = require('express');
const router = express.Router();

const models = require('../models');
const appUtil = require('../utils');
const { sendNotification } = require('../socket/socketActions');

router.post('/:userid', appUtil.asyncHandler(async (req, res) => {
    const userDetails = await models.user.findOne({
        attributes: ['username'],
        where: {
            id: req.params.userid
        }
    });
    if (userDetails) {
        sendNotification('toobler', { message: `${userDetails.username} logged out at ${new Date()}` });

        return res.json({message: 'user logged out successfully'});
    }
    return res.status(400).json({ status: 'fail' })

}));

module.exports = router;
