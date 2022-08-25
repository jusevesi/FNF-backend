const { response } = require('express');

const Post = require('../models/posts');
const TwitterService = require('../services/twitter');

const profileGet = async (req, res = response) => {
    //Pagination parameters in req.query
    const { name } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const from = limit * (page - 1);
    //Twitter Service
    const twitterService = new TwitterService();
    const userId = await twitterService.getUserIdByUsername(name);
    const tweets = await twitterService.getTwitsById(userId);

    const posts = await Post.find({ name }).sort({date:-1})
            .skip(from)
            .limit(+limit)
    
    res.json({
        posts,
        tweets
    });
}

const postGet = async (req, res = response) => {
    //Pagination parameters in req.query
    const { page = 1, limit = 10 } = req.query;
    const from = limit * (page - 1);

    //Promise optimization, multiple promises at once
    const [total, posts] = await Promise.all([
        Post.countDocuments(),
        Post.find().sort({date:-1})
            .skip(from)
            .limit(+limit)
    ]);

    res.json({
        total,
        posts
    });
}

const postPost = async (req, res = response) => {
    const date = new Date();
    const { name, msg, img } = req.body;
    const post = new Post({ name, date, msg, img });

    await post.save();

    res.json({
        msg: "Post Created!",
        post
    });
}

const postPut = async (req, res = response) => {
    const { id } = req.params;
    const { name, ...data } = req.body;

    const post = await Post.findByIdAndUpdate(id, data)

    res.json({
        msg: "Post Updated!",
        post
    });
}

const postPatch = async (req, res = response) => {
    const { id } = req.params;
    const { name, ...data } = req.body;

    const post = await Post.findByIdAndUpdate(id, data)

    res.json({
        msg: "Post Patched!",
        post
    });
}
const postDelete = async (req, res = response) => {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    res.json({
        msg: 'Post deleted!:',
        post
    });
}

module.exports = {
    profileGet,
    postGet,
    postPost,
    postPut,
    postPatch,
    postDelete
}