import DrinkCard from "../components/DrinkCard";
import Dummy from "../img/tomside-light.png";

export default function Find() {
  return (
    <section>
      <h1>Find Drink</h1>
      <DrinkCard img={Dummy} titel="Dummy Drink" />
    </section>
  );
}
