"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";
import Image from "next/image";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/");
      clearIsAuthenticated();
    }
  };

  if (isAuthenticated && user) {
    return (
      <nav className={css.navogationList}>
        <Image
          src={user.avatarUrl || "/images/auth-no-avatar.jpg"}
          width={40}
          height={40}
          alt="User avatar"
          className={css.userAvatar}
        />
        <span className={css.userEmail}>{user.name}</span>
        <div className={css.separator}></div>
        <button onClick={handleLogout} className={css.logoutButton}>
          <svg
            // className={css.aboutIcon}
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <use
              // className={css.aboutIconSvg}
              href="/icon.svg#icon-logout"
            />
          </svg>
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
