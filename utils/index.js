const models = require('../models');

const userSessions = {};

const asyncHandler = fn => (req, res, next, ...args) => fn(req, res, next, ...args)
    .catch((e) => {
        console.log(e)
        if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ status: 'Operation failed', message: 'Duplicate entry' });
        }
        return res.status(404).json({
            status: 'fail'
        });
    });

module.exports = {
    asyncHandler
};
