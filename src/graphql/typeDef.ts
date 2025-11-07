export const typeDefs = `#graphql
scalar Json

  type Restaurant {
    id: ID!
    name: String!
    address: String!
    phone: String!
    meals: [Meal!]!
    bannerImg: String!

  }
input RestaurantInput {
  name: String!
  address: String!
  phone: String!
}

  input MealCreateInput {
    name: String!
    description: String
    price: Float!
    restaurantId: ID!
  }

  input UpdateMealInput {
    name: String
    description: String
    price: Float
    category: String
    restaurantId: ID
  }



  type DeletedResponse {
    message: String!
    restaurant: Restaurant
  }

  type DeletedMealResponse {
    message: String!
    meal: Meal    }


  type Meal {
    id: ID!
    name: String!
    description: String
    price: Float!
    restaurant: Restaurant!
  }

  type Query {
    restaurants: [Restaurant!]!
    restaurant(id: ID!): Restaurant
    meals(restaurantId: ID!): [Meal!]!
    meal(id: ID!): Meal
  }

  type Query {
    _empty: String
  }

  type Mutation {
    addRestaurant(data: RestaurantInput!): Restaurant!
    updateRestaurant(id: ID!, data: RestaurantInput!): Restaurant!
    deleteRestaurant(id: ID!): DeletedResponse!

    addMeal(data: MealCreateInput!): Meal!
    updateMeal(id: ID!, data: UpdateMealInput!): Meal!
    deleteMeal(id: ID!): DeletedMealResponse!
  }
`;
