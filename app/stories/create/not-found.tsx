// import css from "./mainPage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "there is no page on this url",
  openGraph: {
    title: "Not found",
    description: "there is no page on this url",
  },
};
export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
