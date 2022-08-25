const { check } = require('express-validator');
const { postValidatorById, userValidatorByName, postValidatorByName } = require('../helpers/db-validators');
const { validateFields } = require('./validate-fields');

 
const validatePostRegistry = [
    check('name', 'The name is required').not().notEmpty(),
    check('name', 'The user doesnt exist').custom(userValidatorByName),
    check('msg', 'The message is required').not().isEmpty(),
    validateFields
];

const validateId = [
    check('id').custom(postValidatorById),
    validateFields
];

const validateName = [
    check('name', 'The user doesnt exist').custom(userValidatorByName).custom(postValidatorByName),
    validateFields
];

module.exports = {
    validatePostRegistry,
    validateId,
    validateName
}