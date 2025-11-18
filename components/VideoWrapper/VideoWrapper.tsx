import Hero from "../Hero/Hero";
import css from "./VideoWrapper.module.css";

export default function VideoWrapper() {
  return (
    <section>
      <video
        className={css.backgroundVideo}
        src="/images/herovideo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={css.videoOverlay}></div>
      <div className={css.videoContent}>
        <Hero />
      </div>
    </section>
  );
}
