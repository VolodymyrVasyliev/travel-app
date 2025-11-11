"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { loginUser, registerUser } from "@/lib/api/clientApi";
import css from "./page.module.css";

type Mode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser, setLoading, loading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const user = await loginUser({ email, password });
        setUser(user);
      } else {
        const user = await registerUser({ username, email, password });
        setUser(user);
      }
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.authBox}>
        <div className={css.toggleButtons}>
          <button
            className={`${css.chooseButton} ${mode === "register" ? css.active : ""}`}
            onClick={() => setMode("register")}
            disabled={loading}
          >
            Реєстрація
          </button>

          <button
            className={`${css.chooseButton} ${mode === "login" ? css.active : ""}`}
            onClick={() => setMode("login")}
            disabled={loading}
          >
            Вхід
          </button>
        </div>

        <form className={css.form} onSubmit={handleSubmit}>
          <h1 className={css.formTitle}>
            {mode === "login" ? "Вхід" : "Реєстрація"}
          </h1>

          <p className={css.formMessage}>
            {mode === "login"
              ? "Вітаємо знову у спільноту мандрівників!"
              : "Раді вас бачити у спільноті мандрівників!"}
          </p>

          {mode === "register" && (
            <div className={css.formGroup}>
              <label htmlFor="username">Імʼя та Прізвище*</label>
              <input
                id="username"
                type="text"
                name="username"
                className={css.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className={css.formGroup}>
            <label htmlFor="email">Пошта*</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Пароль*</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={loading}
            >
              {loading
                ? mode === "login"
                  ? "Виконується вхід..."
                  : "Виконується реєстрація..."
                : mode === "login"
                  ? "Увійти"
                  : "Зареєструватись"}
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
