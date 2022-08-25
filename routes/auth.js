const { Router } = require('express');
const {login} = require('../controllers/auth');
const { validateLogin } = require('../middlewares/validations-users');


const router = Router();

router.post('/login',validateLogin, login);

module.exports = router;