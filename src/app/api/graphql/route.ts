import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql/schema";

const server = new ApolloServer({
	schema,
});

const handler = startServerAndCreateNextHandler(server);

// Export for HTTP methods
export const GET = handler;
export const POST = handler;
