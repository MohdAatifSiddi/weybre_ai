import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Logout } from "@/components/logout";

export default async function Dashboard() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Logout />
        </div>
    );
}