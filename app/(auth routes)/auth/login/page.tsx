"use client";

import { useRouter } from "next/navigation";
import css from "../page.module.css";
import AuthForm from "../AuthForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className={css.mainContent}>
      <div className={css.authBox}>
        <div className={css.toggleButtons}>
          <button
            className={`${css.chooseButton} `}
            onClick={() => router.push("/auth/register")}
          >
            Реєстрація
          </button>
          <button className={`${css.chooseButton} ${css.active}`}>Вхід</button>
        </div>

        <AuthForm mode="login" />
      </div>
    </main>
  );
}
