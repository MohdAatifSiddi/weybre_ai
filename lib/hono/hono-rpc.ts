import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const client = hc<AppType>(NEXT_PUBLIC_API_URL);

export const api = client.api;
