"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { axiosPublic } from "@/lib/axiosSecure";

/**
 * Wraps BetterAuth's useSession and, once a session appears, mints the
 * Express-API JWT (POST /jwt) and stores it in localStorage so axiosSecure
 * can attach it to protected requests. Also clears the token on logout.
 */
export const useAuth = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .post("/jwt", { email: user.email, name: user.name })
        .then((res) => {
          localStorage.setItem("access-token", res.data.token);
        })
        .catch(() => {
          // Non-fatal: protected calls will simply 401 until this succeeds again.
        });
    } else if (!isPending) {
      localStorage.removeItem("access-token");
    }
  }, [user?.email, user?.name, isPending]);

  return { user, loading: isPending };
};
