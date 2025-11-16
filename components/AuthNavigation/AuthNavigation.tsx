"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearIsAuthenticated();
    }
  };

  if (isAuthenticated && user) {
    console.log(user);

    return (
      <nav className={css.navogationList}>
        <span className={css.userEmail}>{user.name}</span>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </nav>
    );
  }

  return (
    <nav className={css.navogationList}>
      <button
        onClick={() => {
          router.push("/auth/login");
        }}
        className={css.loginBtn}
      >
        Вхід
      </button>

      <button
        onClick={() => {
          router.push("/auth/register");
        }}
        className={css.registerBtn}
      >
        Реєстрація
      </button>
    </nav>
  );
}
