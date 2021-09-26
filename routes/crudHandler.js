const express = require('express');
const models = require('../models');
const appUtil = require('../utils');
const { sendNotification } = require('../socket/socketActions');

const Handler = (name) => {
    const router = express.Router();
    router.get('/', appUtil.asyncHandler(async (req, res) => {
        const list = await models[name].findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        });
        return res.json(list);
    }));

    router.post('/', appUtil.asyncHandler(async (req, res) => {
        const create = await models[name].create(req.body);
        const data = await models[name].findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            where: {
                id: create.id
            }
        });

        const userDetails = await models.user.findOne({
            attributes: ['username'],
            where: {
                id: req.body.userId
            }
        });

        sendNotification('toobler', { message: `${userDetails.username} send a new message at ${new Date()}` });

        return res.json(data);
    }));

    router.patch('/:id', appUtil.asyncHandler(async (req, res) => {
        await models[name].update(req.body, {
            where: {
                id: req.params.id
            }
        });
        const data = await models[name].findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            where: {
                id: req.params.id
            }
        });
        if (data) {
            const userDetails = await models.user.findOne({
                attributes: ['username'],
                where: {
                    id: req.body.userId
                }
            });
            sendNotification('toobler', { message: `${userDetails.username} edited message at ${new Date()}` });
            return res.json(data);
        }
        return res.status(404).json({ message: 'fail' })
    }));

    router.delete('/:id', appUtil.asyncHandler(async (req, res) => {
        const destroy = await models[name].destroy({
            where: {
                id: req.params.id
            }
        });
        const userDetails = await models.user.findOne({
            attributes: ['username'],
            where: {
                id: req.body.userId
            }
        });
        sendNotification('toobler', { message: `${userDetails.username} edited message at ${new Date()}` });

        return res.json({ status: 'message deleted' });
    }));

    return router;
}

module.exports = Handler;
