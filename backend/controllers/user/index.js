const { Router } = require('express');
const router = Router();

const ctrl = require('./user.ctrl');

router.post('/signup', ctrl.post_signup);
router.post('/signin', ctrl.post_signin);
router.post('/logout', ctrl.post_logout);
router.post('/resetpw', ctrl.post_reset_password);

module.exports = router;
