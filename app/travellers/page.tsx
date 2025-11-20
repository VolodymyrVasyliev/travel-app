import OurTravellers from "@/components/OurTravellers/OurTravellers";
import css from "@/styles/travellers/OurTravellers.module.css";

export default function OurTravellersPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Мандрівники</h1>
      <OurTravellers perPage={12} />
    </div>
  );
}
