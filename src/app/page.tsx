"use client";

import { use, useEffect, useState } from "react";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Header/Footer";
import MenuSection from "./components/common/MenuSection";
import { Sidebar } from "lucide-react";
import ClientRestaurants from "@/queries/GetRestaurants";



export default function Home() {
	
	return (
		<main>
			<Header />
			<Sidebar />
			<div>
				<h1>GraphQL Test</h1>

			</div>
			<ClientRestaurants />

			<MenuSection />

			<Footer />

		</main>
	);
}
