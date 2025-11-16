import css from "@/styles/travellers/OurTravellers.module.css";
import type { Traveller } from "@/types/traveller";

interface TravellersListProps {
  items: Traveller[];
}

export default function TravellersList({ items }: TravellersListProps) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li className={css.item} key={item._id}>
          <img className={css.img} src={item.avatarUrl} alt="Avatar image" />
          <h3 className={css.titleName}>{item.name}</h3>
          <p className={css.text}>{item.description}</p>
          <a className={css.btnUser} href="/">
            Переглянути профіль
          </a>
        </li>
      ))}
    </ul>
  );
}
