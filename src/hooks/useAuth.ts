'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  role: string;
}

export default function useAuth(allowedRole: "admin" | "subadmin") {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          router.push("/dashboard/login");
          return;
        }

        const data: User = await res.json();
        if (data.role !== allowedRole) {
          router.push("/unauthorized");
          return;
        }

        setUser(data);
      } catch {
        router.push("/dashboard/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRole, router]);

  return { user, loading };
}
