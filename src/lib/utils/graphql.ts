import { getServerSession } from "next-auth";
import { GraphQLClient } from "graphql-request";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { HoneycombSession } from "@/types";
import { Session } from "next-auth";
export { gql } from "graphql-request";

const graphql_client = new GraphQLClient(
  process.env.HONEYCOMB_API_URL || "http://host.docker.internal:4000/graphql"
);

const client_graphql_client = new GraphQLClient(
  process.env.HONEYCOMB_CLIENT_API_URL || "http://localhost:4000/graphql"
);

export async function serverClient(): Promise<GraphQLClient> {
  const session = (await getServerSession(authOptions)) as HoneycombSession;
  if (session) {
    return graphql_client.setHeader(
      "authorization",
      `Bearer ${session.accessToken}`
    );
  } else {
    console.log("Couldn't apply Authorization header");
    return graphql_client;
  }
}

export function clientClient(session?: Session): GraphQLClient {
  if (!session) return client_graphql_client;

  const hc_session = session as HoneycombSession;
  const client = client_graphql_client.setHeader(
    "authorization",
    `Bearer ${hc_session.accessToken}`
  );
  return client;
}
