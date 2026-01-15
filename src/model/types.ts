export interface Restaurant {
	id: string;
	name: string;
	image: string;
	cuisine: string[];
	rating: number;
	deliveryTime: string;
	deliveryFee: number;
	minOrder: number;
	isOpen: boolean;
}

export interface MenuItem {
	id: string;
	restaurantId: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	isVegetarian?: boolean;
	isPopular?: boolean;
}

export interface CartItem extends MenuItem {
	quantity: number;
}

export interface Order {
	items: CartItem[];
	restaurant: Restaurant;
	subtotal: number;
	deliveryFee: number;
	tax: number;
	total: number;
}

