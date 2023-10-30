import { useNavigate } from "react-router-dom";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import FavoritHjerteKort from "./FavoritHjerteKort";

// RMK

export default function DrinkKort({ drink }) {
  const navigate = useNavigate();

  let favoritListe = [];

  // Hvis der allerede er en favoritliste i localstorage, så indlæses den.
  if (localStorage.getItem("favoritter")) {
    favoritListe = JSON.parse(localStorage.getItem("favoritter"));
  }

  // Når der klikkes på drinkens navn eller billede, skal brugeren navigeres til detaljesiden for den pågældende opskrift.
  // RMK & DKK
  function handleClick() {
    navigate(`SeOpskrift/${drink.id}`);
  }

  // RMK & SD
  return (
    <div className="drinkcard">
      <div className="like">
        {favoritListe.length > 0 && favoritListe.includes(drink.id) ? (
          <FavoritHjerteKort drinkid={drink.id} farve="CC4E45" />
        ) : (
          <FavoritHjerteKort drinkid={drink.id} farve="838383" />
        )}
      </div>
      <div className="drinkKortInfo" onClick={handleClick}>
        <img src={drink.billede} className="drinkimg" />
        <h3 className="drinkheader">{drink.navn}</h3>
      </div>
      <div className="star-wrap">
        <StarBorderRoundedIcon />
        <StarBorderRoundedIcon />
        <StarBorderRoundedIcon />
        <StarBorderRoundedIcon />
        <StarBorderRoundedIcon />
      </div>
    </div>
  );
}
