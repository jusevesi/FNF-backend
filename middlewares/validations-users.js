const { check } = require('express-validator');
const { genderValidator, emailValidator, userValidatorById } = require('../helpers/db-validators');
const { validateFields } = require('./validate-fields');


const validateLogin = [
    check('email','The email is not valid').isEmail(),
    check('password','The password is necessary').not().isEmpty(),
    validateFields
];

const validateGoogle = [
    check('email','The email is not valid').isEmail(),
    check('password','The password is necessary').not().isEmpty(),
    validateFields
];

const validateRegister = [
    check('name', 'The name is necessary').not().isEmpty(),
    check('password', 'Your password must have at least 8 characters, one lowercase letter, one uppercase letter, one number and one special characters').isStrongPassword({ minLength: 8, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1 }),
    check('email', 'The email is not valid').isEmail().custom(emailValidator),
    check('gender').custom(genderValidator),
    validateFields
];

const validateId = [
    check('id', `The id is not valid`).isMongoId(),
    check('id').custom(userValidatorById),
    validateFields
];

module.exports = {
    validateLogin,
    validateGoogle,
    validateRegister,
    validateId
}