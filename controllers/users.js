const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req, res = response) => {
    //Pagination parameters in req.query
    const { page = 1, limit = 5 } = req.query;
    const from = limit * (page - 1);
    const query = { state: true };

    //Promise optimization, multiple promises at once
    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(from)
            .limit(+limit)
    ]);

    res.json({
        total,
        user
    });
}

const usersPost = async (req, res = response) => {

    const { name, email, password, gender, img } = req.body;
    const user = new User({ name, email, password, gender, img });

    //Password Encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        msg: 'User created!:',
        user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { password, google, _id, ...others } = req.body;

    if (password) {
        //Password Encryption
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, others);

    res.json({
        msg: 'User updated!:',
        user
    });
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: 'User deleted!:',
        user
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}