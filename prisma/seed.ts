import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	await prisma.restaurant.createMany({
		data: [
			{
				name: "Mama Cass Kitchen",
				description: "Authentic Nigerian home-cooked meals served fresh daily.",
				address: "6 Akobo, Ibadan, Nigeria",
				phone: "+2348101234567",
				bannerImg:
					"https://images.unsplash.com/photo-1600891963933-7eeb5caa9b5c",
				rating: 4.7,
				isAcive: true,
				openTimes: {
					monday: ["08:00", "22:00"],
					tuesday: ["08:00", "22:00"],
					wednesday: ["08:00", "22:00"],
					thursday: ["08:00", "22:00"],
					friday: ["08:00", "23:00"],
					saturday: ["09:00", "23:00"],
					sunday: ["09:00", "21:00"],
				},
				baseDeliveryFee: 3.5,
				serviceFeeRate: 0.1,
				distanceRate: 0.5,
			},
			{
				name: "ChopLife Bistro",
				description:
					"Trendy African fusion spot with jollof, burgers, and smoothies.",
				address: "12 Ring Road, Ibadan, Nigeria",
				phone: "+2349098765432",
				bannerImg: "https://images.unsplash.com/photo-1555992336-cbf6d7c1d1f9",
				rating: 4.6,
				isAcive: true,
				openTimes: {
					monday: ["10:00", "22:00"],
					tuesday: ["10:00", "22:00"],
					wednesday: ["10:00", "22:00"],
					thursday: ["10:00", "22:00"],
					friday: ["10:00", "23:00"],
					saturday: ["10:00", "23:00"],
					sunday: ["12:00", "21:00"],
				},
				baseDeliveryFee: 4.0,
				serviceFeeRate: 0.12,
				distanceRate: 0.6,
			},
			{
				name: "Taste of Lagos",
				description:
					"Street food meets fine dining — suya, shawarma, and seafood.",
				address: "34 Awolowo Road, Ikeja, Lagos, Nigeria",
				phone: "+2348032223344",
				bannerImg: "https://images.unsplash.com/photo-1551782450-17144efb9c50",
				rating: 4.8,
				isAcive: true,
				openTimes: {
					monday: ["09:00", "23:00"],
					tuesday: ["09:00", "23:00"],
					wednesday: ["09:00", "23:00"],
					thursday: ["09:00", "23:00"],
					friday: ["09:00", "23:59"],
					saturday: ["10:00", "23:59"],
					sunday: ["10:00", "22:00"],
				},
				baseDeliveryFee: 5.0,
				serviceFeeRate: 0.15,
				distanceRate: 0.7,
			},
		],
	});

	const restaurantList = await prisma.restaurant.findMany();

	const meals = [
		{
			name: "Classic Margherita Pizza",
			description:
				"Fresh mozzarella, basil, and tomato sauce on a crispy crust.",
			price: 12.99,
			imageUrl: "https://images.unsplash.com/photo-1601924928376-3e3b60f7a8f3",
			category: "Pizza",
			restaurantId: restaurantList[0].id,
		},
		{
			name: "BBQ Chicken Burger",
			description: "Grilled chicken with smoky BBQ sauce, lettuce, and tomato.",
			price: 10.5,
			imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349",
			category: "Burgers",
			restaurantId: restaurantList[1].id,
		},
		{
			name: "Vegetable Stir Fry",
			description: "Colorful mix of veggies in a savory soy-based sauce.",
			price: 9.25,
			imageUrl: "https://images.unsplash.com/photo-1605475128173-35c527a6d4d7",
			category: "Asian",
			restaurantId: restaurantList[2].id,
		},
		{
			name: "Grilled Salmon with Lemon Butter",
			description: "Fresh Atlantic salmon with a tangy lemon butter sauce.",
			price: 18.0,
			imageUrl: "https://images.unsplash.com/photo-1617196035349-63e14c8e1e1b",
			category: "Seafood",
			restaurantId: restaurantList[0].id,
		},
		{
			name: "Spaghetti Carbonara",
			description: "Classic Italian pasta with eggs, pancetta, and parmesan.",
			price: 14.0,
			imageUrl: "https://images.unsplash.com/photo-1603133872878-684f3c25a9b1",
			category: "Pasta",
			restaurantId: restaurantList[1].id,
		},
	];
	await prisma.meal.createMany({ data: meals });
	console.log("✅ Seed data inserted successfully!");
}
main()
	.then(async () => await prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
