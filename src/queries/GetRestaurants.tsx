"use client"


import {  gql } from "@apollo/client";
import client from "@/lib/ApolloClient";
import { useMutation, useQuery } from "@apollo/client/react";

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

const ADD_RESTAURANT = gql`query addRestaurants {
  addRestaurant (data: $data) {
    id,
    name,
    address,
    phone,
    bannerImg
  }
}`


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

// const {data, error,} useMutation<>()
  return (
		<>
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

			<div>
				<h2>Add a new Restaurant</h2>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const form = e.target as HTMLFormElement;
						const formData = new FormData(form);

						await addRestaurant({
							variables: {
								data: {
									name: formData.get("name"),
									address: formData.get("address"),
									phone: formData.get("phone"),
									bannerImg: formData.get("bannerImg"),
								},
							},
						});

						form.reset(); // clear inputs
					}}
				>
					<input name="name" placeholder="Name" required />
					<input name="address" placeholder="Address" required />
					<input name="phone" placeholder="Phone" required />
					<input name="bannerImg" placeholder="Banner Image URL" required />
					<button type="submit" disabled={adding}>
						{adding ? "Adding..." : "Add Restaurant"}
					</button>
				</form>

				{addError && <p style={{ color: "red" }}>Error: {addError.message}</p>}
			</div>
		</>
	);
}