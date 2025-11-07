import prisma from "@/lib/prisma";
import GraphQLJSON from "graphql-type-json";
import { Restaurant } from "@prisma/client";

interface RestaurantInput {
	name: string;
	address: string;
	phone: string;
	bannerImg: string;
}

interface Mutation {
	addRestaurant(data: RestaurantInput): Promise<Restaurant>;
}

interface MealCreateInput {
	name: string;
	description?: string;
	price: number;
	restaurantId: string;
	category: string;
}

interface MealUpdateInput {
	name?: string;
	description?: string;
	price?: number;
	category?: string;
	restaurantId?: string;
}

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
		restaurant: async (_: any, args: { id: string }) => {
			const restaurant = await prisma.restaurant.findUnique({
				where: { id: args.id },
				include: {
					meals: true,
				},
			});
			return restaurant;
		},
	},
};

export const mealResolvers = {
	Query: {
		meals: async (_: any, arg: { restaurantId?: string }) => {
			const restaurantCheck = arg.restaurantId
				? { restaurantId: arg.restaurantId }
				: {};
			const mealData = await prisma.meal.findMany({
				where: restaurantCheck,
				include: {
					restaurant: true,
				},
			});
			console.log("Fetched meals:", mealData);
			return mealData;
		},

		meal: async (_: any, { id }: { id: string }) => {
			const meal = await prisma.meal.findUnique({
				where: { id },
				include: {
					restaurant: true,
				},
			});
			return meal;
		},
	},

	Mutation: {
		addMeal: async (_: any, { data }: { data: MealCreateInput }) => {
			const newMeal = await prisma.meal.create({
				data: {
					name: data.name,
					description: data.description,
					price: data.price,
					category: data.category,
					restaurantId: data.restaurantId,
				},
			});
			return newMeal;
		},
		updateMeal: async (
			_: any,
			{ id, data }: { id: string; data: MealUpdateInput }
		) => {
			const updatedMeal = await prisma.meal.update({
				where: { id },
				data,
			});
			return updatedMeal;
		},
		deleteMeal: async (_: any, { id }: { id: string }) => {
			const deletedMeal = await prisma.meal.delete({
				where: { id },
			});
			return {
				message: "Meal deleted successfully",
				meal: deletedMeal,
			};
		},
	},
};

export const restauarantMutationResolvers = {
	Mutation: {
		addRestaurant: async (_: any, { data }: { data: RestaurantInput }) => {
			const newRestaurant = await prisma.restaurant.create({
				data: {
					name: data.name,
					address: data.address,
					bannerImg: data.bannerImg,
					phone: data.phone,
				},
			});
			return newRestaurant;
		},

		updateRestaurant: async (
			_: any,
			{ id, data }: { id: string; data: RestaurantInput }
		) => {
			const updateRestaurant = await prisma.restaurant.update({
				where: { id },
				data,
			});
			return updateRestaurant;
		},
		deleteRestaurant: async (_: any, { id }: { id: string }) => {
			const deletedRestaurant = await prisma.restaurant.delete({
				where: { id },
			});
			return {
				message: "Restaurant deleted successfully",
				restaurant: deletedRestaurant,
			};
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
	Mutation: {
		...restauarantMutationResolvers.Mutation,
		...mealResolvers.Mutation,
	},
};
