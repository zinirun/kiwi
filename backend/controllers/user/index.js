const { Router } = require('express');
const router = Router();

const ctrl = require('./user.ctrl');

router.post('/signup', ctrl.post_signup);
router.post('/signin', ctrl.post_signin);
router.post('/logout', ctrl.post_logout);
router.post('/find_user_account', ctrl.post_find_user_account);
router.post('/reset_password', ctrl.post_reset_password);
router.get('/metadata/signup', ctrl.get_signup_metadata);

module.exports = router;
