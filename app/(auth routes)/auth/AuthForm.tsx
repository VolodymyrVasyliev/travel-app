"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/lib/store/authStore";
import { loginUser, registerUser } from "@/lib/api/clientApi";
import css from "./page.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

interface AuthFormProps {
  mode: "login" | "register";
}

interface AuthValues {
  username?: string;
  email: string;
  password: string;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { setUser, setLoading, loading } = useAuthStore();
  const [status, setStatus] = useState<string | null>(null);

  const initialValues: AuthValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username:
      mode === "register"
        ? Yup.string().max(32, "Максимум 32 символи").required("Ім’я є обов’язковим")
        : Yup.string().notRequired(),
    email: Yup.string()
      .email("Некоректна електронна пошта")
      .max(64, "Максимум 64 символи")
      .required("Електронна пошта є обов’язковою"),
    password: Yup.string()
      .min(8, "Мінімум 8 символів")
      .max(128, "Максимум 128 символів")
      .required("Пароль є обов’язковим"),
  });

const mutation = useMutation({
  mutationFn: async (values: AuthValues) => {
    if (mode === "login") {
      return await loginUser({ email: values.email!, password: values.password! });
    } else {
      return await registerUser({
        name: values.username!,
        email: values.email!,
        password: values.password!,
      });
    }
  },
  onSuccess: (user) => {
    setUser(user);
  },
  onError: (err: unknown) => {
    if (err instanceof Error) setStatus(err.message);
    else setStatus("Сталася помилка. Спробуйте ще раз.");
  },
});

const handleSubmit = async (
  values: AuthValues,
  { setSubmitting }: FormikHelpers<AuthValues>
) => {
  setStatus(null);
  setLoading(true);
  try {
    await mutation.mutateAsync(values);
  } finally {
    setSubmitting(false);
    setLoading(false);
  }
};

  return (
    <Formik
      key={mode} // reset form when mode changes
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <h1 className={css.formTitle}>{mode === "login" ? "Вхід" : "Реєстрація"}</h1>
          <p className={css.formMessage}>
            {mode === "login"
              ? "Вітаємо знову у спільноті мандрівників!"
              : "Раді вас бачити у спільноті мандрівників!"}
          </p>

          {mode === "register" && (
            <div className={css.formGroup}>
              <label htmlFor="username">Ім’я та Прізвище*</label>
              <Field name="username">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="Ваше ім’я та прізвище"
                    className={`${css.input} ${
                      touched.username && errors.username ? css.inputError : ""
                    }`}
                  />
                )}
              </Field>
              {touched.username && errors.username && (
                <div className={css.error}>{errors.username}</div>
              )}
            </div>
          )}

          <div className={css.formGroup}>
            <label htmlFor="email">Пошта*</label>
            <Field name="email">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="hello@podorozhnyky.ua"
                  className={`${css.input} ${
                    touched.email && errors.email ? css.inputError : ""
                  }`}
                />
              )}
            </Field>
            {touched.email && errors.email && <div className={css.error}>{errors.email}</div>}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Пароль*</label>
            <Field name="password">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="********"
                  className={`${css.input} ${
                    touched.password && errors.password ? css.inputError : ""
                  }`}
                />
              )}
            </Field>
            {touched.password && errors.password && (
              <div className={css.error}>{errors.password}</div>
            )}
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || loading || mutation.isPending}
            >
              {mutation.isPending
                ? mode === "login"
                  ? "Виконується вхід..."
                  : "Виконується реєстрація..."
                : mode === "login"
                ? "Увійти"
                : "Зареєструватись"}
            </button>
          </div>

          {status && <div className={css.error}>{status}</div>}
          <AuthNavigation />
        </Form>
      )}
    </Formik>

    
  );
}
