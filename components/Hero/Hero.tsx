import css from '../../app/css/Hero.module.css';

const Hero = () => {
  return (
    <section>
      <div className={css.hero}>
            <div className={css.content}>
              <h1 className={css.title}>
                Відкривайте світ <br/> подорожей з нами!
              </h1>
              <p className={css.subtitle}>
                Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися своїми історіями та отримувати натхнення для нових пригод. Відкрийте для себе нові місця та знайдіть однодумців!</p>
              </div>
            <a href="#aboutus" className={css.moreButton}>Доєднатися</a>
            </div>
    </section>
  );
};

export default Hero;