import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppDownload from "@/components/AppDownload";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<Header />
				<Hero />
				<AppDownload />
			</div>
		</div>
	);
}
