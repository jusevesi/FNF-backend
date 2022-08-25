const { Schema, model } = require('mongoose');

const GenderSchema = Schema({
    gender: {
        type: String,
        required:[true, 'Please submit a gender or if you prefer not to disclose']
    }
});

module.exports = model('Gender', GenderSchema);