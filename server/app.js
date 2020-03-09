const Sequelize = require('sequelize');
const { ApolloServer } = require('apollo-server');

const graphqlSchema = require('./graphql/schema');
const _ = require('lodash');
const faker = require('faker');

//Setting seed for consistent results
faker.seed(123);

//======================================================
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
        console.log('- Connection has been established successfully.\n');
	})
	.catch(err => {
		console.error('- Unable to connect to the database:', err);
    });

//======================================================
//Models
const PostModel = sequelize.define('posts', {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    }
});

PostModel.sync({force: true}).then(() => {

	_.times(10, (index) => {
		return PostModel.create({
			title: faker.lorem.sentence(),
            content: faker.lorem.sentences()
		});
	});
});

//======================================================
//Resolvers
const graphqlResolvers = {
    Query: {
		posts: () => PostModel.findAll()
	},
	Mutation: {
		editPost() {
			return null;
		}
	}
};


//Startup the server
const server = new ApolloServer({
    typeDefs: graphqlSchema,
    resolvers: graphqlResolvers
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
