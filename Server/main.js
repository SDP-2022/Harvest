// Start Node + Express.js Server
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

if (process.env.CI) {
    console.log("Run in CI, let's stop listening and exit!")
    process.exit()
}

const api = require('./stalkoverflow-api.js');

// Setup Auth0 Middleware Authentication
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: false,
        jwksUri: 'https://dev-q8h6rzir.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://harvest-stalkoverflow.herokuapp.com/',
  issuer: 'https://dev-q8h6rzir.us.auth0.com/',
  algorithms: ['RS256']
});

app.use('/api/private', jwtCheck, (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"error" : err.name + ": " + err.message});
    }
});

app.use(express.json())

// Auth0 authenticated API requests
app.get('/api/private', function (req, res) {
    api.parseGETRequest(req, res);
});

app.post('/api/private', function (req, res) {
    api.parsePOSTRequest(req, res);
});

// Non-authenticated, public requests
app.get('/', function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    res.send('Time to Harvest! \n I\'ve been running for ' + process.uptime() + ' seconds! :D');
    //api.parseGETRequest(req, res);
});

app.post('/', function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    res.send('Time to Harvest! \n I\'ve been running for ' + process.uptime() + ' seconds! :D');
    //api.parsePOSTRequest(req, res);
});

// Start listening
app.listen(port, () => {
    console.log(`Harvest web app listening on port ${port}`)
})