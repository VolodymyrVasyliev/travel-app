import { Story } from "@/types/story";
import css from "@/components/StoryDetails/StoryDetails.module.css";

export default function StoryDetails(story : Story) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>
        {story.title}
      </h2>
      <div className={css.info}>
        <div className={css.info_row}>
          <p className={css.meta}>
            Автор статті <span className={css.author}> Ім`я автора</span>
          </p>
          <p className={css.meta}>
            Опубліковано<span className={css.date}>{story.date}</span>
          </p>
        </div>

        <p className={css.category}>Категорія</p>
      </div>

      <picture className={css.imageWrapper}>
        <source srcSet="/images/story-mobile.jpg" media="(max-width: 767px) " />
        <source srcSet="/images/story-tab.jpg" media="(max-width: 1439px)" />
        <source srcSet="/images/story-desk.jpg" media="(min-width: 1440px)" />
        <img src="/images/story-mobile.jpg" alt="story pictures " />
      </picture>
      <div className={css.container_story_save}>
        <article className={css.content}>
          <p>
            {story.article}
          </p>
        </article>

        <section className={css.cta} aria-label="Saving history">
          <h2 className={css.ctaTitle}>Збережіть собі історію</h2>
          <p className={css.ctaText}>
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button className={css.saveButton}>Зберегти</button>
        </section>
      </div>
    </div>
  );
}
