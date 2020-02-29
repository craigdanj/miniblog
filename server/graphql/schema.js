const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        createdAt: String!
    }

    type RootQuery {
        hello: TestData!
    }


    input PostInputData {
        title: String!
        content: String!
    }

    type RootMutation {
        editPost(postInput: PostInputData): Post
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);