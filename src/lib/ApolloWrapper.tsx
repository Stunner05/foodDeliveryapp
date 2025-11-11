// lib/ApolloWrapper.tsx
"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./ApolloClient"; // 👈 standard import

export function ApolloWrapper({ children }: { children: ReactNode }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
