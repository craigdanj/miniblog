const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('.graphql/schema');
const graphqlResolvers = require('.graphql/resolvers');

const app = express();
const port = 8080;

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers

}));

app.listen(port, () => console.log(`Miniblog server listening on port ${port}!`))