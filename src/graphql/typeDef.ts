export const typeDefs = `#graphql
scalar Json

  type Restaurant {
    id: ID!
    name: String!
    address: String!
    phone: String!
  }

  type Meal {
    id: ID!
    name: String!
    description: String
    price: Float!
    restaurant: Restaurant!
  }

  type Query {
    restaurants: [Restaurant!]!
    meals: [Meal!]!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
