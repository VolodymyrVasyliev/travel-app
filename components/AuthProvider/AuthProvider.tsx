"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getAuthSession, getCurrentUser } from "@/lib/api/clientApi";

const privateRoutes = ["/profile", "/dashboard"];

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, setUser, clearIsAuthenticated, loading, setLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const session = await getAuthSession();
        if (session?.success) {
          const userData = await getCurrentUser();
          if (userData) {
            setUser(userData);
            return;
          }
        }
        clearIsAuthenticated();
        if (isPrivateRoute) router.push("/");
      } catch {
        clearIsAuthenticated();
        if (isPrivateRoute) router.push("/");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if not authenticated yet
    if (!isAuthenticated) {
      initAuth();
    }
  }, [pathname, isPrivateRoute, router, isAuthenticated, setUser, clearIsAuthenticated, setLoading]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (isPrivateRoute && !isAuthenticated) return null;

  return <>{children}</>;
}
