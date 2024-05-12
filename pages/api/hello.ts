import { NextApiRequest } from "next";

export default function handler(req: NextApiRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  return new Response(JSON.stringify({ message: "hello world!" }));
}

export const runtime = "edge";
