require('dotenv').config();
const express = require('express');
const cors = require('cors')
const router = require('./routes');


const app = express();

const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
};

app.use(cors(corsOptions));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use('/api', router);

module.exports = app;
