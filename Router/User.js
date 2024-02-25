const express = require('express');
const {register,  loginUser, logoutUser, userDetails} = require('../backend/Controllers/User')
const { isAuthenticatedUser } = require('../backend/Middleware/auth');

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/me').get(isAuthenticatedUser, userDetails);



module.exports = router;