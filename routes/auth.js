const { Router } = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const { validateLogin, validateGoogle } = require('../middlewares/validations-users');


const router = Router();

router.post('/login',validateLogin, login);
router.post('/google',validateGoogle, googleSignIn);

module.exports = router;