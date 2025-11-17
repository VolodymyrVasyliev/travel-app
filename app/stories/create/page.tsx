"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./AddStoryPage.module.css";
import Select from "react-select";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Створення історії | AddStoryPage",
// };

export default function AddStoryPage() {
  const [cover, setCover] = useState<string | null>(null);
  const [shortDesc, setShortDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const categoryOptions = [
    { value: "Подорожі", label: "Подорожі" },
    { value: "Їжа", label: "Їжа" },
    { value: "Культура", label: "Культура" },
    { value: "Навчання", label: "Навчання" },
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCover(url);
    }
  };

  const handleShortDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 61) {
      setShortDesc(e.target.value);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Створення історії</h1>

      <div className={styles.formWrapper}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <label className={styles.label}>Обкладинка статті</label>
          <div className={styles.coverPreview}>
            {cover ? (
              <Image
                src={cover}
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

          <label className={styles.uploadBtn}>
            Завантажити фото
            <input type="file" accept="image/*" onChange={handleUpload} />
          </label>

          <div className={styles.field}>
            <label>Заголовок</label>
            <input
              className={styles.storieTitle}
              type="text"
              placeholder="Введіть заголовок історії"
            />
          </div>

          <Select
            options={categoryOptions}
            placeholder="Категорія"
            value={selectedCategory}
            onChange={(option) => setSelectedCategory(option)}
            isClearable
            classNamePrefix="custom-select"
            styles={{
              control: (provided) => {
                let width = "335px";
                let minHeight = 40;
                let padding = "8p";

                if (typeof window !== "undefined") {
                  if (window.innerWidth >= 768 && window.innerWidth < 1440) {
                    width = "335px";
                    minHeight = 45;
                    padding = "0 12px";
                  } else if (window.innerWidth >= 1440) {
                    width = "335px";
                    minHeight = 50;
                    padding = "0 16px";
                  }
                }

                return {
                  ...provided,
                  width,
                  minHeight,
                  padding,
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 8,
                  boxShadow: "none",
                };
              },
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />

          <div className={styles.field}>
            <label className={styles.shortDescLabel}>Короткий опис</label>
            <input
              type="text"
              placeholder="Введіть короткий опис"
              value={shortDesc}
              onChange={handleShortDescChange}
              className={styles.shortDesc}
            />
            <div className={styles.counter}>{shortDesc.length}/61</div>
          </div>

          <div className={styles.field}>
            <label>Текст історії</label>
            <textarea placeholder="Ваша історія тут" rows={7} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <button className={styles.save}>Зберегти</button>
          <button className={styles.cancel}>Відмінити</button>
        </div>
      </div>
    </div>
  );
}
