const { Router } = require('express');
const { profileGet,
    postGet,
    postPost,
    postPut,
    postPatch,
    postDelete } = require('../controllers/posts');

const router = Router();


const { } = require('../controllers/users');
const validateJWT = require('../middlewares/validate-jwt');
const { validatePostRegistry, validateId, validateName } = require('../middlewares/validations-posts');


router.get('/', validateJWT, postGet);

router.get('/profile/:name', validateJWT, validateName, profileGet);

router.post('/', validateJWT, validatePostRegistry, postPost);

router.put('/:id', validateJWT, validateId, postPut);

router.patch('/:id', validateJWT, validateId, postPatch);

router.delete('/:id', validateJWT, validateId, postDelete);


module.exports = router;