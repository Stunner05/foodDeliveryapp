"use client";

import { Search, Play, Bike, Package, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Hero() {
	const router = useRouter();

	return (
		<section className="py-12 relative">
			<div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
				{/* Left Content */}
				<div className="space-y-8">
					<div className="space-y-4">
						<h2 className="text-6xl lg:text-7xl">
							Fastest <span className="text-orange-500">Delivery</span> &<br />
							Easy <span className="text-orange-500">Pickup</span>
						</h2>

						<div className="flex items-start space-x-3 max-w-md">
							<div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
								<span className="text-2xl">👨‍🍳</span>
							</div>
							<p className="pt-2">
								When you are too lazy to cook, we are just a click away !
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<button
							onClick={() => router.push("/restaurants")}
							className="bg-teal-600 hover:bg-teal-700 transition-colors text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg"
						>
							<Search className="w-5 h-5" />
							<span>Find Restaurants</span>
						</button>

						<button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
							<div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
								<Play className="w-5 h-5 text-orange-500 fill-orange-500" />
							</div>
							<span>How to order</span>
						</button>
					</div>
				</div>

				{/* Right Content with Image and Feature Cards */}
				<div className="flex items-center gap-8">
					{/* Main Image Circle */}
					<div className="relative w-80 h-80 flex-shrink-0">
						<div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full transform -rotate-12"></div>
						<div className="relative z-10 p-8 w-full h-full">
							<ImageWithFallback
								src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=500&h=500&fit=crop"
								alt="Woman enjoying food"
								className="w-full h-full object-cover rounded-full"
							/>
						</div>

						{/* Decorative curved line */}
						<div className="absolute -bottom-8 -right-8 w-32 h-32">
							<svg
								viewBox="0 0 100 100"
								className="w-full h-full text-orange-500"
							>
								<path
									d="M 10 50 Q 50 10, 90 50"
									fill="none"
									stroke="currentColor"
									strokeWidth="8"
									strokeLinecap="round"
								/>
							</svg>
						</div>
					</div>

					{/* Feature Cards Column */}
					<div className="space-y-6 flex-shrink-0">
						<FeatureCard
							icon={<Bike className="w-6 h-6" />}
							title="Fast delivery"
							description="Promise to deliver within 30 mins"
						/>
						<FeatureCard
							icon={<Package className="w-6 h-6" />}
							title="Pick up"
							description="Pickup delivery at your doorstep"
						/>
						<FeatureCard
							icon={<UtensilsCrossed className="w-6 h-6" />}
							title="Dine in"
							description="Enjoy your food fresh & hot"
						/>
					</div>
				</div>
			</div>

			{/* Decorative elements */}
			<div className="absolute top-20 left-0 w-32 h-32 bg-pink-200 rounded-full opacity-50 blur-3xl"></div>
			<div className="absolute bottom-20 right-0 w-40 h-40 bg-yellow-200 rounded-full opacity-50 blur-3xl"></div>
		</section>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="bg-white rounded-2xl p-4 shadow-xl min-w-[200px] hover:shadow-2xl transition-shadow">
			<div className="flex items-start space-x-3">
				<div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
					{icon}
				</div>
				<div>
					<h3 className="font-semibold">{title}</h3>
					<p className="text-sm text-gray-600">{description}</p>
				</div>
			</div>
		</div>
	);
}
