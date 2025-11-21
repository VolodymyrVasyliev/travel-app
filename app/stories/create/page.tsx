"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import styles from "./AddStoryPage.module.css";

type FormData = {
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
  accessToken: string;
}

export default function AddStoryPage({ accessToken }: AddStoryPageProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const createStoryMutation = useMutation({
    mutationFn: async (values: FormData) => {
      const formData = new FormData();
      if (values.storyImage) formData.append("storyImage", values.storyImage);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
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
    shortDescription: Yup.string().max(61, "Максимум 61 символ"),
    description: Yup.string()
      .max(2500, "Максимум 2500 символів")
      .required("Введіть текст історії"),
    category: Yup.string().required("Оберіть категорію"),
  });

  const formik = useFormik<FormData & { shortDescription?: string }>({
    initialValues: {
      storyImage: null,
      title: "",
      description: "",
      category: "",
      shortDescription: "", // поле існує лише для UI
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (
      values: FormData & { shortDescription?: string },
      { setSubmitting }
    ) => {
      createStoryMutation.mutate(values); // shortDescription не відправляється
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
            <div className={styles.selectWrapper}>
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
              <div className={styles.arrowIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.08691 9.02344C7.18774 9.02344 7.26471 9.05385 7.34277 9.13184L11.6455 13.459L11.999 13.8145L16.6816 9.13184C16.7593 9.05424 16.8257 9.03227 16.9062 9.03516C17.0005 9.0386 17.0819 9.07117 17.168 9.15723C17.246 9.23531 17.2764 9.31223 17.2764 9.41309C17.2763 9.51371 17.2458 9.59001 17.168 9.66797L12.249 14.5869C12.1949 14.6411 12.1522 14.667 12.124 14.6787C12.0885 14.6935 12.0486 14.7021 12 14.7021C11.9755 14.7021 11.9532 14.6993 11.9326 14.6953L11.875 14.6787L11.8223 14.6484C11.8015 14.634 11.7779 14.6138 11.751 14.5869L6.80664 9.64355C6.7328 9.56972 6.70662 9.50009 6.70996 9.40527C6.71375 9.29797 6.74977 9.2141 6.83203 9.13184C6.90996 9.05403 6.98632 9.02351 7.08691 9.02344Z"
                    fill="black"
                    stroke="black"
                  />
                </svg>
              </div>
            </div>
            {formik.touched.category && formik.errors.category && (
              <p className={styles.error}>{formik.errors.category}</p>
            )}
          </div>

          {/* Короткий опис - для UI, не відправляється */}
          <div className={styles.hidden}>
            <div className={styles.field}>
              <label className={styles.shortDescLabel}>Короткий опис</label>
              <textarea
                name="shortDescription"
                placeholder="Введіть короткий опис"
                value={formik.values.shortDescription || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={61}
                className={styles.shortDesc}
              />
              <div className={styles.counter}>
                {formik.values.shortDescription?.length || 0}/61
              </div>
            </div>
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
