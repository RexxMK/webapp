import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

//SD

export default function DrinkCard(props) {
  return (
    <div className="drinkcard">
      <div className="like">
        <FavoriteRoundedIcon />
      </div>
      <img src={props.img} className="drinkimg" />
      <h3 className="drinkheader">{props.titel}</h3>
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
