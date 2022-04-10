// Start Node + Express.js Server
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

test('The word I want', () => {
    expect("Test").toBe("Test");
});