"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/clientApi"; 
import styles from "./AuthNavigation.module.css";

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
      router.push("/");
    }
  };

  if (isAuthenticated && user) {
    return (
      <nav className={styles.navigationItem}>
        <span className={styles.userEmail}>{user.email}</span>
        <Link href="/profile" className={styles.navigationLink}>
          Profile
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </nav>
    );
  }

  return (
    <nav className={styles.navigationItem}>
      <Link href="/auth/login" className={styles.navigationLink}>
        Login
      </Link>
      <Link href="/auth/register" className={styles.navigationLink}>
        Sign Up
      </Link>
    </nav>
  );
}
