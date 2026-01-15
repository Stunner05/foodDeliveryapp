import {
	Apple,
	Star,
	Users,
	Flame,
	Coffee,
	IceCream,
	Pizza,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function AppDownload() {
	return (
		<section className="py-16 relative">
			<div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl overflow-hidden shadow-2xl relative">
				<div className="grid lg:grid-cols-2 gap-8 items-center p-12">
					{/* Left - Phone Mockup */}
					<div className="relative flex justify-center lg:justify-start">
						{/* Decorative fork */}
						<div className="absolute -left-8 bottom-0 text-white opacity-20">
							<svg
								width="80"
								height="120"
								viewBox="0 0 80 120"
								fill="currentColor"
							>
								<rect x="35" y="40" width="10" height="80" />
								<rect x="25" y="0" width="5" height="45" />
								<rect x="35" y="0" width="5" height="45" />
								<rect x="45" y="0" width="5" height="45" />
							</svg>
						</div>

						{/* Phone Mockup */}
						<div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
							<div className="w-64 h-[520px] bg-white rounded-[3rem] shadow-2xl p-4 relative">
								<div className="w-full h-full bg-gradient-to-br from-orange-50 to-yellow-50 rounded-[2.5rem] overflow-hidden">
									{/* Phone Screen Content */}
									<div className="p-6 space-y-4">
										<div className="flex items-center justify-between">
											<h3 className="text-xl">Let's eat</h3>
											<div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
										</div>
										<h4>Quality food 😋</h4>

										<div className="flex space-x-2">
											<div className="bg-yellow-400 text-xs px-3 py-1 rounded-full flex items-center space-x-1">
												<Flame className="w-3 h-3" />
												<span>Popular</span>
											</div>
											<div className="bg-white text-xs px-3 py-1 rounded-full">
												Fast food
											</div>
										</div>

										<div className="grid grid-cols-2 gap-3">
											<FoodCard
												image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"
												name="Jumbo Burger"
												price="$8.99"
											/>
											<FoodCard
												image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop"
												name="Chicken Wrap"
												price="$6.99"
											/>
										</div>
									</div>
								</div>
								{/* Notch */}
								<div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full"></div>
							</div>

							{/* Decorative lines */}
							<div className="absolute -top-4 -right-4">
								<div className="flex space-x-1">
									<div className="w-1 h-8 bg-gray-900 rounded-full transform rotate-12"></div>
									<div className="w-1 h-8 bg-gray-900 rounded-full transform rotate-12"></div>
								</div>
							</div>
						</div>

						{/* Decorative pizza */}
						<div className="absolute -right-12 top-0 transform rotate-12">
							<div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center">
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop"
									alt="Pizza"
									className="w-28 h-28 object-cover rounded-full"
								/>
							</div>
						</div>
					</div>

					{/* Right - Download Info */}
					<div className="text-white space-y-8">
						<div className="space-y-4">
							<h2 className="text-5xl">
								Download
								<br />
								our Mobile App
							</h2>
						</div>

						{/* App Icons */}
						<div className="flex items-center space-x-4">
							<AppIcon icon={<Users className="w-6 h-6" />} />
							<AppIcon icon={<Flame className="w-6 h-6" />} />
							<AppIcon icon={<Coffee className="w-6 h-6" />} />
							<AppIcon icon={<IceCream className="w-6 h-6" />} />
							<AppIcon icon={<Pizza className="w-6 h-6" />} />
						</div>

						{/* App Store Badges */}
						<div className="flex items-center space-x-4">
							<AppStoreBadge
								icon={
									<svg
										className="w-8 h-8"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
									</svg>
								}
								rating="4.9/5"
								reviews="1,074"
							/>
							<AppStoreBadge
								icon={
									<svg
										className="w-8 h-8"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
									</svg>
								}
								rating="4.8/5"
								reviews="2,341"
							/>
						</div>
					</div>
				</div>

				{/* Decorative yellow circle */}
				<div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-400 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
			</div>
		</section>
	);
}

function FoodCard({
	image,
	name,
	price,
}: {
	image: string;
	name: string;
	price: string;
}) {
	return (
		<div className="bg-white rounded-2xl p-3 shadow-md">
			<ImageWithFallback
				src={image}
				alt={name}
				className="w-full h-20 object-cover rounded-xl mb-2"
			/>
			<p className="text-xs">{name}</p>
			<p className="text-xs text-orange-500">{price}</p>
		</div>
	);
}

function AppIcon({ icon }: { icon: React.ReactNode }) {
	return (
		<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-500 hover:scale-110 transition-transform cursor-pointer shadow-lg">
			{icon}
		</div>
	);
}

function AppStoreBadge({
	icon,
	rating,
	reviews,
}: {
	icon: React.ReactNode;
	rating: string;
	reviews: string;
}) {
	return (
		<div className="bg-white text-gray-900 rounded-2xl p-4 flex items-center space-x-4 hover:scale-105 transition-transform cursor-pointer shadow-lg">
			<div className="flex-shrink-0">{icon}</div>
			<div>
				<div className="flex items-center space-x-1">
					{[...Array(5)].map((_, i) => (
						<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
					))}
				</div>
				<p className="text-sm">{rating}</p>
				<p className="text-xs text-gray-500">{reviews}</p>
			</div>
		</div>
	);
}
