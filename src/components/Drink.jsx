import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import FavoritHjerteDrink from "./FavoritHjerteDrink";
import StarRating from "./StarRating";

// RMK
export default function Drink({ drink, drinkid }) {
  let favoritListe = [];

  // Hvis der allerede er en favoritliste i localstorage, så indlæses den
  if (localStorage.getItem("favoritter")) {
    favoritListe = JSON.parse(localStorage.getItem("favoritter"));
  }

  // Deler ingredienserne op i en HTML-liste (ingredienserListe) ved hjælp af map-funktionen, hvis der er ingredienser tilgængelige
  const ingredienserListe =
    drink && drink.ingredienser
      ? drink.ingredienser.map((ingrediens, index) => (
          <li key={index}>{ingrediens}</li>
        ))
      : null;

  // Deler fremgangsmåden op i separate <li>-elementer i en anden HTML-liste (metodeAfsnit), hvis der er en fremgangsmåde tilgængelig.
  const metodeAfsnit =
    drink && drink.metode
      ? drink.metode.map((afsnit, index) => <li key={index}>{afsnit}</li>)
      : null;

  // SD
  // Ved brug af use navigate kan vi lave en go back knap
  // Så ved tryk af knappen navigerer hjemmesiden dig til den side du var sidst på
  const history = useNavigate();

  // RMK & SD
  return (
    <section className="op-wrap">
      {/*Vi laver en onclick function
      Så ved klik af knappen så går du et tilbage (-1) af din webbrowser historik*/}
      <button className="back" onClick={() => history(-1)}>
        <ArrowBackRoundedIcon />
      </button>
      <img className="opimg" src={drink.billede} alt="Billede af drink" />
      <div className="fixedMargin">
        <div className="opheader">
          <h2>{drink.navn}</h2>
          <div className="op-like">
            {favoritListe.includes(drinkid) ? (
              <FavoritHjerteDrink drinkid={drinkid} farve="CC4E45" />
            ) : (
              <FavoritHjerteDrink drinkid={drinkid} farve="838383" />
            )}
          </div>
        </div>
        <h3>Ingredienser</h3>
        <div className="items">
          <ul className="itemsList">{ingredienserListe}</ul>
        </div>
        <h3>Fremgangsmåde</h3>
        <div className="howto">
          <ul>{metodeAfsnit}</ul>
        </div>
        <h3>Bedømmelse</h3>
        <StarRating starId={drink.id} />
      </div>
    </section>
  );
}
