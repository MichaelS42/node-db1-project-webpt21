const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const AccountsRouter = require('./accounts/accounts-router')

server.use(express.json());
server.use('/accounts', AccountsRouter)

module.exports = server;
