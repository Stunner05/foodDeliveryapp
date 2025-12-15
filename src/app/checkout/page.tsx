"use client";

import { useState } from "react";
import {
	ArrowLeft,
	CreditCard,
	MapPin,
	Clock,
	CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
	const router = useRouter();
	const { cartItems, restaurant, getCartTotal, clearCart } = useCart();
	const [showSuccess, setShowSuccess] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		zipCode: "",
		deliveryInstructions: "",
		paymentMethod: "card",
	});

	const subtotal = getCartTotal();
	const deliveryFee = restaurant?.deliveryFee || 0;
	const tax = subtotal * 0.08;
	const total = subtotal + deliveryFee + tax;

	if (cartItems.length === 0 && !showSuccess) {
		router.push("/cart");
		return null;
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowSuccess(true);
		setTimeout(() => {
			clearCart();
			router.push("/");
		}, 3000);
	};

	if (showSuccess) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 flex items-center justify-center">
				<div className="bg-white rounded-2xl p-12 shadow-2xl text-center max-w-md">
					<CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
					<h2 className="text-3xl mb-4">Order Placed Successfully!</h2>
					<p className="text-gray-600 mb-6">
						Your order from {restaurant?.name} has been confirmed. Estimated
						delivery: {restaurant?.deliveryTime}
					</p>
					<p className="text-sm text-gray-500">Redirecting to home...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<Header />

				<div className="py-8">
					<Link
						href="/cart"
						className="inline-flex items-center space-x-2 mb-6 hover:text-orange-500 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Back to cart</span>
					</Link>

					<h1 className="text-4xl mb-8">Checkout</h1>

					<form onSubmit={handleSubmit}>
						<div className="grid lg:grid-cols-3 gap-8">
							{/* Checkout Form */}
							<div className="lg:col-span-2 space-y-6">
								{/* Delivery Information */}
								<div className="bg-white rounded-2xl p-6 shadow-lg">
									<div className="flex items-center gap-3 mb-6">
										<MapPin className="w-6 h-6 text-orange-500" />
										<h2 className="text-2xl">Delivery Information</h2>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm mb-2">Full Name *</label>
											<input
												type="text"
												required
												value={formData.name}
												onChange={(e) =>
													setFormData({ ...formData, name: e.target.value })
												}
												className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
										</div>
										<div>
											<label className="block text-sm mb-2">Email *</label>
											<input
												type="email"
												required
												value={formData.email}
												onChange={(e) =>
													setFormData({ ...formData, email: e.target.value })
												}
												className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
										</div>
										<div>
											<label className="block text-sm mb-2">Phone *</label>
											<input
												type="tel"
												required
												value={formData.phone}
												onChange={(e) =>
													setFormData({ ...formData, phone: e.target.value })
												}
												className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
										</div>
										<div>
											<label className="block text-sm mb-2">Address *</label>
											<input
												type="text"
												required
												value={formData.address}
												onChange={(e) =>
													setFormData({ ...formData, address: e.target.value })
												}
												className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
										</div>
										<div>
											<label className="block text-sm mb-2">City *</label>
											<input
												type="text"
												required
												value={formData.city}
												onChange={(e) =>
													setFormData({ ...formData, city: e.target.value })
												}
												className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
										</div>
										<div>
											<label className="block text-sm mb-2">Zip Code *</label>
											<input
												type="text"
												required
												value={formData.zipCode}
												onChange={(e) =>
													setFormData({ ...formData, zipCode: e.target.value })
												}
												className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
										</div>
									</div>

									<div className="mt-4">
										<label className="block text-sm mb-2">
											Delivery Instructions
										</label>
										<textarea
											value={formData.deliveryInstructions}
											onChange={(e) =>
												setFormData({
													...formData,
													deliveryInstructions: e.target.value,
												})
											}
											rows={3}
											className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
											placeholder="Ring the bell, leave at door, etc."
										/>
									</div>
								</div>

								{/* Payment Method */}
								<div className="bg-white rounded-2xl p-6 shadow-lg">
									<div className="flex items-center gap-3 mb-6">
										<CreditCard className="w-6 h-6 text-orange-500" />
										<h2 className="text-2xl">Payment Method</h2>
									</div>

									<div className="space-y-3">
										<label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
											<input
												type="radio"
												name="payment"
												value="card"
												checked={formData.paymentMethod === "card"}
												onChange={(e) =>
													setFormData({
														...formData,
														paymentMethod: e.target.value,
													})
												}
												className="w-4 h-4 text-orange-500"
											/>
											<span>Credit/Debit Card</span>
										</label>
										<label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
											<input
												type="radio"
												name="payment"
												value="cash"
												checked={formData.paymentMethod === "cash"}
												onChange={(e) =>
													setFormData({
														...formData,
														paymentMethod: e.target.value,
													})
												}
												className="w-4 h-4 text-orange-500"
											/>
											<span>Cash on Delivery</span>
										</label>
									</div>
								</div>
							</div>

							{/* Order Summary */}
							<div className="lg:col-span-1">
								<div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
									<div className="flex items-center gap-3 mb-6">
										<Clock className="w-6 h-6 text-orange-500" />
										<h3 className="text-xl">Order Summary</h3>
									</div>

									{restaurant && (
										<div className="mb-4 pb-4 border-b border-gray-200">
											<h4>{restaurant.name}</h4>
											<p className="text-sm text-gray-600">
												Estimated: {restaurant.deliveryTime}
											</p>
										</div>
									)}

									<div className="space-y-2 mb-4">
										{cartItems.map((item) => (
											<div
												key={item.id}
												className="flex justify-between text-sm"
											>
												<span>
													{item.quantity}x {item.name}
												</span>
												<span>${(item.price * item.quantity).toFixed(2)}</span>
											</div>
										))}
									</div>

									<div className="space-y-2 mb-4 pb-4 border-t border-gray-200 pt-4">
										<div className="flex justify-between">
											<span>Subtotal</span>
											<span>${subtotal.toFixed(2)}</span>
										</div>
										<div className="flex justify-between">
											<span>Delivery Fee</span>
											<span>${deliveryFee.toFixed(2)}</span>
										</div>
										<div className="flex justify-between">
											<span>Tax</span>
											<span>${tax.toFixed(2)}</span>
										</div>
									</div>

									<div className="flex justify-between text-xl mb-6">
										<span>Total</span>
										<span className="text-orange-500">${total.toFixed(2)}</span>
									</div>

									<button
										type="submit"
										className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full transition-colors"
									>
										Place Order
									</button>

									<p className="text-xs text-gray-500 text-center mt-4">
										By placing your order, you agree to our terms and conditions
									</p>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
