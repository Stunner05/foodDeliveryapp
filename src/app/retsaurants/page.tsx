"use client";

import { useState, use } from "react";
import { Star, Clock, DollarSign, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { restaurants, menuItems } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { MenuItem } from "@/types";

export default function RestaurantPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = use(params);
	const restaurant = restaurants.find((r) => r.id === resolvedParams.id);
	const items = menuItems[resolvedParams.id] || [];
	const { addToCart, getItemCount } = useCart();

	const [selectedCategory, setSelectedCategory] = useState("All");

	if (!restaurant) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Restaurant not found</p>
			</div>
		);
	}

	const categories = [
		"All",
		...Array.from(new Set(items.map((item) => item.category))),
	];
	const filteredItems =
		selectedCategory === "All"
			? items
			: items.filter((item) => item.category === selectedCategory);

	const handleAddToCart = (item: MenuItem) => {
		addToCart(item, restaurant);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<Header />

				<div className="py-8">
					{/* Back Button */}
					<Link
						href="/restaurants"
						className="inline-flex items-center space-x-2 mb-6 hover:text-orange-500 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Back to restaurants</span>
					</Link>

					{/* Restaurant Header */}
					<div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
						<div className="relative h-64">
							<ImageWithFallback
								src={restaurant.image}
								alt={restaurant.name}
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="p-6">
							<div className="flex items-start justify-between mb-4">
								<div>
									<h1 className="text-3xl mb-2">{restaurant.name}</h1>
									<div className="flex items-center gap-2 mb-2">
										{restaurant.cuisine.map((c, i) => (
											<span
												key={i}
												className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
											>
												{c}
											</span>
										))}
									</div>
								</div>

								<Link
									href="/cart"
									className="relative bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors"
								>
									<ShoppingCart className="w-6 h-6" />
									{getItemCount() > 0 && (
										<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
											{getItemCount()}
										</span>
									)}
								</Link>
							</div>

							<div className="flex items-center gap-6 text-sm">
								<div className="flex items-center space-x-1">
									<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
									<span>{restaurant.rating} Rating</span>
								</div>
								<div className="flex items-center space-x-1">
									<Clock className="w-5 h-5 text-gray-500" />
									<span>{restaurant.deliveryTime}</span>
								</div>
								<div className="flex items-center space-x-1">
									<DollarSign className="w-5 h-5 text-gray-500" />
									<span>${restaurant.deliveryFee} Delivery</span>
								</div>
								<span className="text-gray-500">
									Min. ${restaurant.minOrder}
								</span>
							</div>

							{!restaurant.isOpen && (
								<div className="mt-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg">
									Currently closed
								</div>
							)}
						</div>
					</div>

					{/* Category Filter */}
					<div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
									selectedCategory === category
										? "bg-orange-500 text-white"
										: "bg-white hover:bg-gray-100 shadow"
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Menu Items */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredItems.map((item) => (
							<div
								key={item.id}
								className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
							>
								<div className="relative h-48">
									<ImageWithFallback
										src={item.image}
										alt={item.name}
										className="w-full h-full object-cover"
									/>
									{item.isPopular && (
										<span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
											Popular
										</span>
									)}
									{item.isVegetarian && (
										<span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
											Vegetarian
										</span>
									)}
								</div>

								<div className="p-4">
									<h3 className="text-xl mb-2">{item.name}</h3>
									<p className="text-sm text-gray-600 mb-4">
										{item.description}
									</p>

									<div className="flex items-center justify-between">
										<span className="text-2xl text-orange-500">
											${item.price.toFixed(2)}
										</span>
										<button
											onClick={() => handleAddToCart(item)}
											disabled={!restaurant.isOpen}
											className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full transition-colors"
										>
											Add to Cart
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{filteredItems.length === 0 && (
						<div className="text-center py-16">
							<p className="text-xl text-gray-500">No items in this category</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
