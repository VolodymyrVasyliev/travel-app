import css from "./about.module.css";

export default function About() {
  return (
    <section className={css.aboutSection}>
      <div className={css.aboutContainer}>
        <div className={css.aboutHeader}>
          <h2 className={css.aboutHeading}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={css.aboutDescription}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб нею поділилися. Наша платформа створена, щоб об'єднати людей, закоханих у відкриття нового. Тут ви можете ділитися власним досвідом, знаходити друзів та надихатися на наступні пригоди разом з нами.
          </p>
        </div>

        <ul className={css.aboutCards}>
          <li className={css.aboutCard}>
            <svg
              className={css.aboutIcon}
              viewBox="0 0 24 24"
              width="48"
              height="48"
            >
              <use
                className={css.aboutIconSvg}
                href="/icon.svg#icon-wand_stars"
              />
            </svg>
            <h3 className={css.aboutCardTitle}>Наша місія</h3>
            <p className={css.aboutCardText}>
              Об'єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </li>

          <li className={css.aboutCard}>
            <svg
              className={css.aboutIcon}
              viewBox="0 0 24 24"
              width="48"
              height="48"
            >
              <use
                className={css.aboutIconSvg}
                href="/icon.svg#icon-travel_luggage_and_bags"
              />
            </svg>
            <h3 className={css.aboutCardTitle}>Автентичні історії</h3>
            <p className={css.aboutCardText}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </li>

          <li className={css.aboutCard}>
            <svg
              className={css.aboutIcon}
              viewBox="0 0 24 24"
              width="48"
              height="48"
            >
              <use
                className={css.aboutIconSvg}
                href="/icon.svg#icon-communication"
              />
            </svg>
            <h3 className={css.aboutCardTitle}>Ваша спільнота</h3>
            <p className={css.aboutCardText}>
              Станьте частиною спільноти, де кожен може бути і автором, і
              читачем.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
