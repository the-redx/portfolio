import { NextRequest } from "next/server";

export async function getBody(request: NextRequest) {
  try {
    return await request.json();
  } catch (err) {
    return null;
  }
}
