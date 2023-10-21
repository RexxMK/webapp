import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

// RMK
export default function Drink({ drink }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`drinks/${drink.id}`);
  }

  // Deler ingredienserne i en liste
  const ingredienserListe = drink.ingredienser.map((ingrediens, index) => (
    <li key={index}>{ingrediens}</li>
  ));

  // Deler metoden i separate <p> elementer
  const metodeAfsnit = drink.metode.map((afsnit, index) => (
    <li key={index}>{afsnit}</li>
  ));

  console.log(drink.billede);

  // RMK & SD
  return (
    <section className="op-wrap" onClick={handleClick}>
      <button className="back">
        <ArrowBackRoundedIcon />
      </button>
      <img className="opimg" src={drink.billede} alt="Billede af drink" />
      <div className="fixedMargin">
        <div className="opheader">
          <h2>{drink.navn}</h2>
          <div className="op-like">
            <FavoriteRoundedIcon />
          </div>
        </div>
        <h3>Ingredienser</h3>
        <div className="items">
          <ul className="items">{ingredienserListe}</ul>
        </div>
        <h3>Fremgangsmåde</h3>
        <div className="howto">
          <ul>{metodeAfsnit}</ul>
        </div>
        <h3>Bedømmelse</h3>
        <StarRating />
      </div>
    </section>
  );
}
