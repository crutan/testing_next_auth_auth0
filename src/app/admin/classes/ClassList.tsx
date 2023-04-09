"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/gql";
import type { Class } from "@/gql/graphql";
import { clientClient } from "@/lib/utils/graphql";

const listClasses = graphql(/* graphql */ `
  query ClassList {
    classes {
      name
      id
    }
  }
`);

export default function ClassList() {
  const { data: session } = useSession();
  const graphql_client = clientClient(session || undefined);

  const { data, isLoading } = useQuery({
    queryKey: ["Classes"],
    queryFn: async () => graphql_client.request(listClasses),
  });
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.classes.map((c: Class, i: number) => {
          return <div key={i}>{c.name}</div>;
        })}
    </div>
  );
}
