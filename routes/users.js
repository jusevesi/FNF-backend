const { Router } = require('express');

const validateJWT = require('../middlewares/validate-jwt');
const { validateRegister, validateId } = require('../middlewares/validations-users');

const { usersGet,
        usersPost,
        usersPut,
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post('/', validateRegister, usersPost);

router.put('/:id', validateJWT, validateId, usersPut);

router.delete('/:id', validateJWT, validateId, usersDelete);


module.exports = router;