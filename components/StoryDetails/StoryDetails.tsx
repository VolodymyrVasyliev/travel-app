"use client";

import { Story } from "@/types/story";
import css from "./StoryDetails.module.css";
import Image from "next/image";
import { useState } from "react";
// import { savedArticles } from "@/lib/api/clientApi";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/lib/store/authStore";

type StoryDetailsProps = {
  data?: Story;
};

export default function StoryDetails({ data }: StoryDetailsProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  // const user = useAuthStore((state) => state.user);
  // const token = useAuthStore((state) => state.isAuthenticated);

  if (!data) {
    return <p className={css.noStory}>Історія не знайдена</p>;
  }

  // const handleSave = () => {
  //   if (!user || !token) {
  //     router.push("/auth/register");
  //     return;
  //   }

  //   setLoading(true);
  //   savedArticles(story._id);
  //   setSaved(true);
  // };
  console.log(data);

  return (
    <div className={css.container}>
      <h2 className={css.title}>{data.title}</h2>

      <div className={css.info}>
        <div className={css.info_row}>
          <p className={css.meta}>
            Автор статті
            <span className={css.author}>{data.ownerId?.name}</span>
          </p>
          <p className={css.meta}>
            Опубліковано
            <span className={css.date}>{data.date}</span>
          </p>
        </div>
        <p className={css.category}>{data.category?.name}</p>
      </div>

      <picture>
        <source media="(max-width: 767px)" srcSet={data.img} />
        <source media="(max-width: 1439px)" srcSet={data.img} />

        <Image
          src={data.img}
          alt={data.title}
          width={1312}
          height={874}
          className={css.imageWrapper}
        />
      </picture>

      <div className={css.container_story_save}>
        <article className={css.content}>
          <p>{data.article}</p>
        </article>

        <section className={css.cta} aria-label="Saving history">
          <h2 className={css.ctaTitle}>Збережіть собі історію</h2>
          <p className={css.ctaText}>
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button
            className={css.saveButton}
            // onClick={handleSave}
            disabled={saved || loading}
          >
            {saved ? "Збережено" : loading ? "Збереження..." : "Зберегти"}
          </button>
        </section>
      </div>
    </div>
  );
}
