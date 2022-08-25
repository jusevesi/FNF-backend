const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Couldnt generate JWT')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}