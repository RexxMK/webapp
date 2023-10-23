import { useNavigate } from "react-router-dom";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

// RMK
export default function DrinkKort({ drink }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`drinks/${drink.id}`);
  }

  // RMK & SD
  return (
    <div className="drinkcard">
      <div className="like">
        <FavoriteRoundedIcon />
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
