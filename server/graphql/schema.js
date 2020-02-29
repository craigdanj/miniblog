// const { buildSchema } = require('graphql');
const { gql } = require('apollo-server');

module.exports = gql`

    type Post {
        _id: ID!
        title: String!
        content: String!
        createdAt: String!
    }

    input PostInputData {
        title: String!
        content: String!
    }

    type Query {
		posts: [Post]
	}

    type Mutation {
		editPost(postInput: PostInputData): Post
	}
`;