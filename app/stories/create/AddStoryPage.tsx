"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "./AddStoryPage.module.css";

type FormDataType = {
  storyImage: File | null;
  title: string;
  description: string;
  category: string;
};

const categoryOptions = [
  { value: "68fb50c80ae91338641121f0", label: "Азія" },
  { value: "68fb50c80ae91338641121f4", label: "Африка" },
  { value: "68fb50c80ae91338641121f8", label: "Кавказ" },
  { value: "68fb50c80ae91338641121f7", label: "Балкани" },
  { value: "68fb50c80ae91338641121f6", label: "Пустелі" },
  { value: "68fb50c80ae91338641121f2", label: "Європа" },
  { value: "68fb50c80ae91338641121f3", label: "Америка" },
  { value: "68fb50c80ae91338641121f9", label: "Океанія" },
  { value: "68fb50c80ae91338641121f1", label: "Гори" },
];

interface AddStoryPageProps {
  accessToken?: string; 
}

export default function AddStoryPage({}: AddStoryPageProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const createStoryMutation = useMutation({
    mutationFn: async (values: FormDataType) => {
      const formData = new FormData();
      if (values.storyImage) formData.append("storyImage", values.storyImage);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`, {
        method: "POST",
        body: formData,
        credentials: "include", 
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Помилка створення історії");
      }

      return res.json();
    },
    onSuccess: (data) => {
      router.push(`/stories/${data.data._id}`);
    },
    onError: (error: any) => {
      alert(
        error instanceof Error ? error.message : "Помилка створення історії"
      );
    },
  });

  const validationSchema = Yup.object({
    storyImage: Yup.mixed().nullable(),
    title: Yup.string()
      .max(80, "Максимум 80 символів")
      .required("Введіть заголовок"),
    description: Yup.string()
      .max(2500, "Максимум 2500 символів")
      .required("Введіть текст історії"),
    category: Yup.string().required("Оберіть категорію"),
  });

  const formik = useFormik<FormDataType>({
    initialValues: {
      storyImage: null,
      title: "",
      description: "",
      category: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values, { setSubmitting }) => {
      createStoryMutation.mutate(values);
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.page}>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
        <div className={styles.left}>
          <h1 className={styles.title}>Створити нову історію</h1>

          <label className={styles.label}>Обкладинка статті</label>
          <div className={styles.coverPreview}>
            {preview ? (
              <Image
                src={preview}
                alt="cover"
                width={600}
                height={400}
                className={styles.coverImage}
                unoptimized
              />
            ) : (
              <div className={styles.placeholder}>
                <span>📷</span>
                <p>Завантажте зображення</p>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                formik.setFieldValue("storyImage", file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
          <button
            type="button"
            className={styles.uploadBtn}
            onClick={handleFileButtonClick}
          >
            Завантажити фото
          </button>

          <div className={styles.field}>
            <label>Заголовок</label>
            <input
              type="text"
              name="title"
              placeholder="Введіть заголовок"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.storieTitle}
            />
            {formik.touched.title && formik.errors.title && (
              <p className={styles.error}>{formik.errors.title}</p>
            )}
          </div>

          <div className={styles.field}>
            <label>Категорія</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.selectField}
            >
              <option value="">Оберіть категорію</option>
              {categoryOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className={styles.error}>{formik.errors.category}</p>
            )}
          </div>

          <div className={styles.field}>
            <label>Текст історії</label>
            <textarea
              name="description"
              placeholder="Ваша історія тут"
              rows={7}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p className={styles.error}>{formik.errors.description}</p>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <button
            type="submit"
            className={`${styles.save} ${formik.isValid ? styles.active : ""}`}
            disabled={!formik.isValid || createStoryMutation.isPending}
          >
            {createStoryMutation.isPending ? "Збереження..." : "Зберегти"}
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => router.push("/stories")}
          >
            Відмінити
          </button>
        </div>
      </form>
    </div>
  );
}
