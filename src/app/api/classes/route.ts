import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const listClasses = `
  query ClassList {
    classes {
      name
      id
    }
  }
`;

export async function GET() {
  const session = await getServerSession(authOptions);
  const res = await fetch(process.env.HONEYCOMB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session?.accessToken,
    },
    body: JSON.stringify({ query: listClasses }),
  });
  console.log(res.status);
  const data = await res.json();
  if (data?.data) {
    return NextResponse.json(data.data.classes);
  } else {
    return NextResponse.json("Error");
  }
}
