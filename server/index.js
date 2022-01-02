// pulling in express package
const express = require('express');
// defining express app
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
// requires database config
const config = require('./config/database');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(config.uri,(err) => {
    if(err) {
        console.log('Could noit connect to database', err);
    } else {
        console.log('Connected to database', config.db);
    }
});

/* MIDDLEWARE */

app.use(cors({
    origin: 'http://localhost:4200'
}))

// parses data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/authentication', authentication);


// every time user makes get requrest to /
app.get('/',(req,res) => {
	res.send('hello world'); 
});

// server listening to 8080
// http//localhost:8080
app.listen(8080, () => {
	console.log("Server is listening on port 8080");
});