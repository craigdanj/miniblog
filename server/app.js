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

	_.times(25, () => {
		return PostModel.create({
			title: faker.lorem.sentence(),
            content: faker.lorem.sentences()
		});
    });

    

	// PostModel.count().then(c => {
	// 	console.log("There are " + c + " projects!")
	// })

});



//======================================================
//Resolvers
const graphqlResolvers = {
    Query: {
		posts: (root ,args, context, info) => {
			console.log("Page", args.page);
			const limit = 10;
			const offset = args.page ? (args.page - 1) * limit : 0;

			return PostModel.findAndCountAll({
				offset,
				limit
			}).then(posts => {
				const postRows = posts.rows;
				const total = posts.count
				return {
					posts: postRows,
					total
				}
			});
		}
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
