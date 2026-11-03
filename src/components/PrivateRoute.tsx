"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Loading from "./Loading";

/**
 * Wraps a page's content. While the session is loading we show a spinner —
 * NOT a redirect — so a logged-in user who hits reload on a private route
 * never gets bounced to /login before their session has had a chance to load.
 * Only once loading is finished and there is truly no user do we redirect.
 */
export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, pathname, router]);

  if (loading || !user) {
    return <Loading />;
  }

  return <>{children}</>;
}
