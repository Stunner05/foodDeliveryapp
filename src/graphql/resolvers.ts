import prisma from "@/lib/prisma";
import GraphQLJSON from "graphql-type-json";

export const restauarantResolvers = {
	Query: {
		// Fetch all restaurants
		restaurants: async () => {
			const data = await prisma.restaurant.findMany({
				include: {
					meals: true, // include meals for each restaurant
				},
			});
			console.log("Fetched restaurants:", data);
			return data;
		},
	},
};

export const mealResolvers = {
	Query: {
		meals: async () => {
			const mealData = await prisma.meal.findMany({
				include: {
					restaurant: true, // include the restaurant info for each meal
				},
			});
			console.log("Fetched meals:", mealData);
			return mealData;
		},
	},
};

export const resolvers = {
	Json: GraphQLJSON,
	Query: {
		// Fetch all restaurants
		...restauarantResolvers.Query,
		// Fetch all meals
		...mealResolvers.Query,
	},
};
