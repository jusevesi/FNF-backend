const User = require('../models/user');
const Gender = require('../models/gender');
const Post = require('../models/posts');

const emailValidator = async (email = '') => {
    const emailExistence = await User.findOne({ email });
    if (emailExistence) {
        throw new Error(`The email ${email} already exists, please try with another one`);
    }
};

const genderValidator = async (gender = '') => {
    const genderExistence = await Gender.findOne({ gender });
    if (!genderExistence) {
        throw new Error('Please choose a gender option');
    }
};

const userValidatorById = async (id) => {
    const userExistence = await User.findById(id);
    if (!userExistence) {
        throw new Error(`The user with id: ${id} doesn't exist`);
    }
};
const userValidatorByName = async (name) => {
    const userExistence = await User.findOne({name});
    if (!userExistence) {
        throw new Error(`The user with name: ${name} doesn't exist`);
    }
};

const postValidatorById = async (id) => {
    const postExistence = await Post.findById(id);
    if (!postExistence) {
        throw new Error(`The post with id: ${id} doesn't exist`);
    }
};

const postValidatorByName = async (name) => {
    const postExistence = await Post.findOne({name});
    if (!postExistence) {
        throw new Error(`There is not posts from user: ${name}`);
    }
};


module.exports = {
    genderValidator,
    emailValidator,
    userValidatorById,
    userValidatorByName,
    postValidatorById,
    postValidatorByName
}
