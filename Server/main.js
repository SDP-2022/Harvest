// Start Node + Express.js Server
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

// Setup Auth0 Middleware Authentication
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'https://harvest-stalkoverflow.herokuapp.com/',
    issuerBaseURL: 'https://harvest-stalkoverflow.herokuapp.com/',
    algorithms: ['RS256']
});

// Start listening
app.listen(port, () => {
    console.log(`Harvest web app listening on port ${port}`)
})

// Auth0 authenticated API requests
// public, no login/authentication needed
app.get('/api/public', function(req, res) {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

// private, requires login/authentication
app.get('/api/private', checkJwt, function(req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});


// Regular requests
app.get('/', (req, res) => {
    res.send('Time to Harvest!')
})

app.post('/', (req, res) => {
    res.send('Got a POST request! ')
})

if (process.env.CI) {
    console.log("Run in CI, let's stop listening and exit!")
    process.exit()
}