const { Schema, model } = require('mongoose');

const PostsSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    date: {
        type: Date,
        required: [true, 'The date is required']
    },
    msg: {
        type: String,
        required: [true, 'The message is required']
    },
    img: {
        type: String,
    }
});

PostsSchema.methods.toJSON = function () {
    const { __v, _id, ...post } = this.toObject();
    post.pid = _id;
    return post;
}

module.exports = model('Posts', PostsSchema);

