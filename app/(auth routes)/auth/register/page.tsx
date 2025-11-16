"use client";

import { useRouter } from "next/navigation";
import css from "../page.module.css";
import AuthForm from "../AuthForm";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main className={css.mainContent}>
      <div className={css.authBox}>
        <div className={css.toggleButtons}>
          <button className={`${css.chooseButton} ${css.active}`}>Реєстрація</button>
          <button
            className={`${css.chooseButton} `}
            onClick={() => router.push("/auth/login")}
          >
            Вхід
          </button>
        </div>

        <AuthForm mode="register" />
      </div>
    </main>
  );
}
