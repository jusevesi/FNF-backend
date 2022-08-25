const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users'
        this.authPath = '/api/auth'
        this.postsPath = '/api/posts'

        //Database Connection
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Application Route
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Body parsing and reading
        this.app.use(express.json({ type: ['application/json'] }));
        this.app.use(express.urlencoded({ extended: true }));
        //Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.postsPath, require('../routes/posts'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }
}

module.exports = Server;