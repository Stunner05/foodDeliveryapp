import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      address
      phone
      bannerImg
      meals {
        id
        name
        price
      }
    }
  }
`;


