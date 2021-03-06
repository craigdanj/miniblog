// const { PubSub } = require('apollo-server');
const http = require('http');
const { ApolloServer, PubSub } = require('apollo-server-express');
const express = require('express');

const graphqlSchema = require('./graphql/schema');
const Sequelize = require('sequelize');

const _ = require('lodash');
const faker = require('faker');
const jwt = require('jsonwebtoken');

const pubsub = new PubSub();
const COMMENT_ADDED = 'COMMENT_ADDED';

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

});



//======================================================
//Resolvers
const graphqlResolvers = {
    Query: {
		login: (root ,args, context, info) => {
			if (args.email === 'admin' && args.password === 'admin') {
				const userId = 1;

				const token = jwt.sign(
					{
						userId,
						email: args.email
					},
					'yoursecretgoeshere',
					{ expiresIn: '1h' }
				);

				return {
					token,
					userId: userId.toString(),
					userName: 'Administrator'
				}
			} else {
				const error = new Error('Failed login. Make sure the credentials enter are correct.');
				error.code = 401;
				throw error;
			}
		},
		posts: (root ,args, context, info) => {
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
		},
		post: (root ,args, context, info) => {
			const id = args.id;

			return PostModel.findOne({
				where: {id}
			}).then(post => {
				return post
			});

			//Add error handlign here too when building for production
		}
	},
	Mutation: {
		editPost(root ,args, context, info) {
			return PostModel.findOne({
				where: {
					id: args.postInput.id
				}
			}).then(post => {
				if(post) {
					return post.update({
						title: args.postInput.title,
						content: args.postInput.content
					}).then((post) => {
						return post;
					})
				}
			})
		},
		async singleUpload(parent, { file }) {
			console.log(file);

			const { stream, filename, mimetype, encoding } = await file;
			console.log(stream, filename, mimetype, encoding);

			// 1. Validate file metadata.

			// 2. Stream file contents into cloud storage:
			// https://nodejs.org/api/stream.html

			// 3. Record the file upload in your DB.
			return { filename };
		},
		addComment(root ,args, context, info) {
			pubsub.publish(COMMENT_ADDED, { commentAdded: { text: args.text} });
			//The text here is just published in this demo.
			//In a real world applciation you would want to store this in a database.
			//Previous chat history can then be fetched via a query so the user can read previous chat messages.
			return args.text;
		}
	},
	Subscription: {
		commentAdded: {
			// Additional event labels can be passed to asyncIterator creation
			subscribe: () => pubsub.asyncIterator(COMMENT_ADDED)
		},
	},
};


const PORT = 4000;
const app = express();
const server = new ApolloServer({
	typeDefs: graphqlSchema,
    resolvers: graphqlResolvers
});

server.applyMiddleware({app})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
	console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
	console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
