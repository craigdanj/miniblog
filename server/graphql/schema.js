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

    type Query {
		posts(page: Int): PostResponse
	}

    type Mutation {
		editPost(postInput: PostInputData): Post
	}
`;