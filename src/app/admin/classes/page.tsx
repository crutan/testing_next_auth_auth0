import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/gql";
import type { Class } from "@/gql/graphql";
import { serverClient } from "@/lib/utils/graphql";

const listClasses = graphql(/* graphql */ `
  query ClassList {
    classes {
      name
      id
    }
  }
`);

export default async function Page() {
  const graphql_client = await serverClient();
  const data = await graphql_client.request(listClasses);

  return (
    <div>
      {data &&
        data.classes.map((c: Class, i: number) => {
          return <div key={i}>{c.name}</div>;
        })}
    </div>
  );
}
