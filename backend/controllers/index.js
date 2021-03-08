const { Router } = require('express');
const router = Router();

router.use('/api/user', require('./user'));

module.exports = router;
