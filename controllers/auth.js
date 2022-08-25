const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        //Email existence validation
        if (!user) {
            return res.status(400).json({
                msg: 'Email or Password invalid'
            });
        }
        //User status validation
        if (!user.state) {
            return res.status(400).json({
                msg: 'This user doesn´t exist anymore'
            });
        }
        //Password validation
        const validPassword = bcryptjs.compareSync( password, user.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Password or Email invalid'
            })
        }
        //JWT Generation
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Please contact the FNF manager'
        })

    }
}


module.exports = {
    login
}