const Sequelize = require('sequelize');
const { ApolloServer } = require('apollo-server');

const graphqlSchema = require('./graphql/schema');

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

//======================================================
//Resolvers
const graphqlResolvers = {
    Query: {
		posts: () => [
            {
                title: 'boom',
                content: 'bamm',
                _id: 1
            },
            {
                title: 'boom2',
                content: 'bamm2',
                _id: 2
            }
        ],
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
