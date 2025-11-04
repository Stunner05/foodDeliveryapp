"use client";

import { useEffect, useState } from "react";

export default function Home() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetch("/api/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: "{ hello }" }),
		})
			.then((res) => res.json())
			.then((data) => setMessage(data.data.hello));
	}, []);

	return (
		<div>
			<h1>GraphQL Test</h1>
			<p>{message}</p>
		</div>
	);
}
