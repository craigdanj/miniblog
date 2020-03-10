const { gql } = require('apollo-server');

module.exports = gql`

    type Post {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
    }

    type PostResponse {
        total: Int!
        posts: [Post]
    }

    input PostInputData {
        title: String!
        content: String!
    }

    type AuthData {
        token: String!
        userId: ID!
        userName: String!
    }

    type Query {
        login(email: String!, password: String!): AuthData!
		posts(page: Int): PostResponse
        post(id: Int): Post
	}

    type Mutation {
		editPost(postInput: PostInputData): Post
	}
`;