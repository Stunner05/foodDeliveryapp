import { GraphQLError } from "graphql";
import prisma from "@/lib/prisma";
import GraphQLJSON from "graphql-type-json";

// Input interfaces
interface MealCreateWithoutRestaurantInput {
	name: string;
	description?: string;
	price: number;
	category: string;
}

interface RestaurantInput {
	name: string;
	address: string;
	phone: string;
	bannerImg: string;
	meals?: MealCreateWithoutRestaurantInput[];
}

interface RestaurantUpdateInput {
	name?: string;
	address?: string;
	phone?: string;
	bannerImg?: string;
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

export const resolvers = {
	Json: GraphQLJSON,

	Query: {
		// Restaurants
		restaurants: async () => {
			try {
				const data = await prisma.restaurant.findMany({
					include: { meals: true },
				});
				return data;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to fetch restaurants", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		restaurant: async (_: any, { id }: { id: string }) => {
			try {
				const restaurant = await prisma.restaurant.findUnique({
					where: { id },
					include: { meals: true },
				});
				if (!restaurant) {
					throw new GraphQLError("Restaurant not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}
				return restaurant;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to fetch restaurant", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		// Meals
		meals: async (_: any, { restaurantId }: { restaurantId?: string }) => {
			try {
				const where = restaurantId ? { restaurantId } : {};
				const mealData = await prisma.meal.findMany({
					where,
					include: { restaurant: true },
				});
				return mealData;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to fetch meals", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		meal: async (_: any, { id }: { id: string }) => {
			try {
				const meal = await prisma.meal.findUnique({
					where: { id },
					include: { restaurant: true },
				});
				if (!meal) {
					throw new GraphQLError("Meal not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}
				return meal;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to fetch meal", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},
	},

	Mutation: {
		// Restaurants
		addRestaurant: async (_: any, { data }: { data: RestaurantInput }) => {
			try {
				const newRestaurant = await prisma.restaurant.create({
					data: {
						name: data.name,
						address: data.address,
						phone: data.phone,
						bannerImg: data.bannerImg,
						meals: {
							create:
								data.meals?.map((meal) => ({
									name: meal.name,
									description: meal.description,
									price: meal.price,
									category: meal.category,
								})) || [],
						},
					},
					include: { meals: true },
				});
				return newRestaurant;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to create restaurant", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		updateRestaurant: async (
			_: any,
			{ id, data }: { id: string; data: RestaurantUpdateInput }
		) => {
			try {
				const updatedRestaurant = await prisma.restaurant.update({
					where: { id },
					data: {
						name: data.name,
						address: data.address,
						phone: data.phone,
						bannerImg: data.bannerImg,
					},
					include: { meals: true },
				});
				return updatedRestaurant;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to update restaurant", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		deleteRestaurant: async (_: any, { id }: { id: string }) => {
			try {
				const deletedRestaurant = await prisma.restaurant.delete({
					where: { id },
				});
				return {
					message: "Restaurant deleted successfully",
					restaurant: deletedRestaurant,
				};
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to delete restaurant", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		// Meals
		addMeal: async (_: any, { data }: { data: MealCreateInput }) => {
			try {
				const newMeal = await prisma.meal.create({ data });
				return newMeal;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to create meal", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		updateMeal: async (
			_: any,
			{ id, data }: { id: string; data: MealUpdateInput }
		) => {
			try {
				const updatedMeal = await prisma.meal.update({ where: { id }, data });
				return updatedMeal;
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to update meal", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},

		deleteMeal: async (_: any, { id }: { id: string }) => {
			try {
				const deletedMeal = await prisma.meal.delete({ where: { id } });
				return { message: "Meal deleted successfully", meal: deletedMeal };
			} catch (error: any) {
				console.error(error);
				throw new GraphQLError("Failed to delete meal", {
					extensions: { code: "DATABASE_ERROR", originalError: error },
				});
			}
		},
	},
};
