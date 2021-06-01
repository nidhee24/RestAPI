const express = require('express');
const path = require('path');

const app  = express();
const Parser = require('body-parser');
const caching = require('apicache');

const cache = caching.middleware;

const {getPing} = require('./models/jsonapi'); // Implementation step 1 which helps to know the status is success or not
const {getPosts} = require('./models/post'); // for step 2
app.use(Parser.json());
app.use(express.static(path.join(__dirname,'../client/public')));

/* Bonus step 4 */
app.get('/api/ping', getPing,cache('30 minutes')); // call API one time in 30 minutes reduces api calls
app.get('/api/posts',getPosts,cache('30 minutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("server started");
})
