import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import Dummy from '../img/tomside-light.png';
import { useNavigate } from "react-router-dom";

export default function AddCard({tilfoj}) {
    const navigate = useNavigate();

  function handleClick() {

    navigate(`drinks/${tilfoj.id}`); 
  }
    
    return (
      <div className="drinkcard" onClick={handleClick}>
        <img src={Dummy} className="drinkimg" />
        <h3 className="drinkheader">{tilfoj.navn}</h3>
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