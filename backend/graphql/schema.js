const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Date

    type User {
        id: ID!
        userAccount: String!
        userName: String!
        departmentId: ID!
        studentNumber: String!
        studentGradeId: ID!
        companyId: ID!
        status: Int!
    }

    type Query {
        getUserInfo: User!
    }
`);
