"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function Logout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut();

      // 🔥 force-clear any local state if needed
      router.replace("/"); // redirect to home immediately
      router.refresh();    // refresh to ensure no stale session
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a toast/alert here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        onClick={handleLogout} 
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
        {!loading && <LogOut className="size-4 ml-2" />}
      </Button>
    </div>
  );
}
