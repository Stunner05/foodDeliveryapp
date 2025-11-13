"use client"


import {  gql } from "@apollo/client";
import client from "@/lib/ApolloClient";
import { useQuery } from "@apollo/client/react";

 const GET_RESTAURANTS = gql`
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



interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  bannerImg: string;
  meals: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}


interface GetRestaurantData {
restaurants: Restaurant[]
}
export default function ClientRestaurants() {
  // const { data, loading, error } = useQuery<GetRestaurantsData>(GET_RESTAURANTS, { client });
const {data, loading, error} = useQuery<GetRestaurantData>(GET_RESTAURANTS, ({}))
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

// const {} useMutation

  return (
    <div>
      <h1>Restaurants</h1>
      {data?.restaurants.map((restaurant: any) => (
        <div key={restaurant.id} style={{ marginBottom: "2rem" }}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.address}</p>
          <h3>Meals:</h3>
          <ul>
            {restaurant.meals.map((meal: any) => (
              <li key={meal.id}>
                {meal.name} - ${meal.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}