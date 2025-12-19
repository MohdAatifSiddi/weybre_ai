import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

// Prefer the provided public API URL, otherwise fall back to the current origin.
// Using a relative/same-origin base avoids hard-coding localhost in production
// and ensures auth cookies are sent with requests.
const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    if (typeof window !== "undefined") return window.location.origin;
    return "";
};

export const client = hc<AppType>(getBaseUrl(), {
    fetch: (input, init) =>
        fetch(input, {
            ...init,
            credentials: "include",
        }),
});

export const api = client.api;
