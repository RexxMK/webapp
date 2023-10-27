import { useNavigate } from "react-router-dom";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import FavoritHjerteKort from "./FavoritHjerteKort";


// RMK


export default function DrinkKort({ drink }) {
  const navigate = useNavigate();

  // Når der klikkes på drinkens navn eller billede, skal brugeren navigeres til detaljesiden for den pågældende opskrift.
  // RMK & DKK
  function handleClick() {
    navigate(`SeOpskrift/${drink.id}`);
  }

  // RMK & SD
  return (
    <div className="drinkcard">
      <div className="like">
        <FavoritHjerteKort />
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
