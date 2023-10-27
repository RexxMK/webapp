import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import FavoritHjerteDrink from "./FavoritHjerteDrink";

// RMK
export default function Drink({ drink }) {
  /*const navigate = useNavigate();*/

  //Skal måske være under komponenten til drinkkort??
  /*function handleClick() {
    navigate(`drinks/${drink.id}`);
  }*/


  // Deler ingredienserne i en liste
  const ingredienserListe = drink && drink.ingredienser
  ? drink.ingredienser.map((ingrediens, index) => (
      <li key={index}>{ingrediens}</li>
    ))
  : null;

  // Deler metoden i separate <p> elementer
  const metodeAfsnit = drink && drink.metode ? drink.metode.map((afsnit, index) => (
    <li key={index}>{afsnit}</li>
  )) : null;


  console.log(drink.billede);

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
            <FavoritHjerteDrink />
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
        <StarRating />
      </div>
    </section>
  );
}
