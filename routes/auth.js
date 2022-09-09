const { Router } = require('express');
const {login} = require('../controllers/auth');
const { validateLogin, validateGoogle } = require('../middlewares/validations-users');


const router = Router();

router.post('/login',validateLogin, login);
router.post('/google',validateGoogle, login);

module.exports = router;