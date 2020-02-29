const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const Sequelize = require('sequelize');
const { ApolloServer } = require('apollo-server');

//Connect to the db
const sequelize = new Sequelize('db', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	storage: './db.sqlite',
	operatorsAliases: false
});

sequelize
	.authenticate()
	.then(() => {
        console.log('Connection has been established successfully.\n');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

//Startup the server
const server = new ApolloServer({
    typeDefs: graphqlSchema,
    resolvers: graphqlResolvers
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
