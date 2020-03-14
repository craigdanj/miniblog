const { gql } = require('apollo-server');

module.exports = gql`

    type Post {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
    }

    type PostsResponse {
        total: Int!
        posts: [Post]
    }

    input PostInputData {
        id: Int!
        title: String!
        content: String!
    }

    type AuthData {
        token: String!
        userId: ID!
        userName: String!
    }

    type Comment {
        text: String!
    }

    type Query {
        login(email: String!, password: String!): AuthData!
		posts(page: Int): PostsResponse
        post(id: Int): Post
	}

    type Mutation {
		editPost(postInput: PostInputData): Post!
	}

    type Subscription {
        commentAdded: Comment 
    }
`;