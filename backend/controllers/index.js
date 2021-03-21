const { Router } = require('express');
const router = Router();

router.use('/api/user', require('./user'));
router.use('/api/files', require('./files'));

module.exports = router;
