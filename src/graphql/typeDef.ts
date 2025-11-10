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

input RestaurantUpdateInput {
  name: String
  address: String
  phone: String
  bannerImg: String
}

input RestaurantInput {
  name: String!
  address: String!
  phone: String!
  bannerImg: String!
  meals: [MealsCreateWithoutRestaurantIdInput!]

}

  input MealCreateInput {
    name: String!
    description: String
    price: Float!
    category: String!
    restaurantId: ID!
  }

  input MealsCreateWithoutRestaurantIdInput {
    name: String!
    description: String
    price: Float!
    category: String!
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

  type Mutation {
    addRestaurant(data: RestaurantInput!): Restaurant!
    updateRestaurant(id: ID!, data: RestaurantUpdateInput!): Restaurant!
    deleteRestaurant(id: ID!): DeletedResponse!
    addMeal(data: MealCreateInput!): Meal!
    updateMeal(id: ID!, data: UpdateMealInput!): Meal!
    deleteMeal(id: ID!): DeletedMealResponse!
  }
`;
