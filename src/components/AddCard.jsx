import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { useNavigate } from "react-router-dom";

//SD

export default function AddCard({tilfoj}) {
    const navigate = useNavigate();

  function handleClick() {

    navigate(`tilfojs/${tilfoj.id}`); 
  }
    
    return (
      <div className="drinkcard" onClick={handleClick}>
        <img src={tilfoj.billede} alt={tilfoj.navn} className="drinkimg" />
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