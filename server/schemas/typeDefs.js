const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    bookId: ID!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
  }

  type Query {
    me: User
    user (username: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;