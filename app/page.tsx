import Hero from "@/components/Hero/Hero";
import css from "./mainPage.module.css";
import About from "@/components/About/About";
import Popular from "@/components/Popular/Popular";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import Join from "@/components/Join/Join";
export default function Home() {
  return (
    <main>
      <h1>Main Page</h1>
      <Hero />
      <About />
      <Popular />
      <OurTravellers />
      <Join isAuthenticated={false}/>
    </main>
  );
}