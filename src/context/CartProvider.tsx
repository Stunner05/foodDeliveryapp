"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, MenuItem, Restaurant } from "@/types";

interface CartContextType {
	cartItems: CartItem[];
	restaurant: Restaurant | null;
	addToCart: (item: MenuItem, restaurant: Restaurant) => void;
	removeFromCart: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

	const addToCart = (item: MenuItem, restaurantData: Restaurant) => {
		// If adding from different restaurant, clear cart
		if (restaurant && restaurant.id !== restaurantData.id) {
			if (
				!confirm(
					"Your cart contains items from another restaurant. Clear cart and add this item?"
				)
			) {
				return;
			}
			setCartItems([]);
		}

		setRestaurant(restaurantData);

		setCartItems((prev) => {
			const existing = prev.find((i) => i.id === item.id);
			if (existing) {
				return prev.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
				);
			}
			return [...prev, { ...item, quantity: 1 }];
		});
	};

	const removeFromCart = (itemId: string) => {
		setCartItems((prev) => {
			const filtered = prev.filter((i) => i.id !== itemId);
			if (filtered.length === 0) {
				setRestaurant(null);
			}
			return filtered;
		});
	};

	const updateQuantity = (itemId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(itemId);
			return;
		}
		setCartItems((prev) =>
			prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
		);
	};

	const clearCart = () => {
		setCartItems([]);
		setRestaurant(null);
	};

	const getCartTotal = () => {
		return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	};

	const getItemCount = () => {
		return cartItems.reduce((sum, item) => sum + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				restaurant,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartTotal,
				getItemCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within CartProvider");
	}
	return context;
}
