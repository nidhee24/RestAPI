## Backend by Nidhi Patel

## Step 1
- [x] get method for /api/ping should have status code 200 and body as success = true.
- [x] Implemented step 1 routing in index.js and code implementation in ./models/jsonapi.js
- [x] Link : http://localhost:5000/api/ping

## Step 2
- [x] api.get('/api/posts') in index.js
- [x] implemented all requirements of this step in ./models/post.js
- [x] congruent request for all tag parameters
- [x] Error handling for tag paramenter not to be empty and for sortBy and direction to check if it is valid or not
- [x] Links: http://localhost:5000/api/posts?tags=tech
- [x]        http://localhost:5000/api/posts?tags=tech,history
- [x]        http://localhost:5000/api/posts?tags=tech,history&sortBy=likes
- [x]        http://localhost:5000/api/posts?tags=tech,history&sortBy=likes&direction=desc
- [x]        http://localhost:5000/api/posts

## Step 3
- [x] Implemeted testing in ./test/test.js
- [x] run test.js using npm test

## Step 4
- [x] I used apicache for caching feature as it simply occur once in given time of cache which decrease number of calls of api . I implemented this in index.js and has given cache time as 30 minutes.

## Install commands
- [x] npm install nodemon
- [x] npm install apicache
- [x] npm install axios
- [x] npm install body-parser
- [x] npm install chai
- [x] npm install cors 
- [x] npm install express
- [x] npm install mocha
- [x] npm install path
- [x] npm install request

## Run Command
- [x] npm start
- [x] To run test file use command: npm test

## Port used
- [x] Port number: 5000