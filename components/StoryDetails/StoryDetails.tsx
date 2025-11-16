// import { Story } from "@/types/story";
import css from "@/components/StoryDetails/StoryDetails.module.css";
// type StoryDetailsProps = {
//   story: Story;
// };

export default function StoryDetails() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>
        Венеція без туристів: маршрути для справжніх мандрівників
      </h2>
      <div className={css.info}>
        <div className={css.info_row}>
          <p className={css.meta}>
            Автор статті <span className={css.author}> Ім`я автора</span>
          </p>
          <p className={css.meta}>
            Опубліковано<span className={css.date}>23.07.2025</span>
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
            Венеція — це не лише площа Святого Марка і гондоли на Канале Ґранде.
            Ми вирішили дослідити місто з іншого боку — вулицями, де не ходять
            натовпи, де старі венеціанці щодня п`ють еспресо на розі, а сусідки
            обговорюють погоду через балкони. Виявляється, є цілий район —
            Кастелло, де майже немає туристів, але є мальовничі канали,
            старовинні церкви і рибні ринки. Відкрили для себе і острів Джудекка
            — справжню Венецію без пафосу. У блозі ділюсь маршрутами, куди варто
            заглянути, аби побачити справжнє місто.
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
