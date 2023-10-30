import { useNavigate } from "react-router-dom";
import CardRating from "./CardRating";

//SD

export default function AddCard({tilfoj}) {
    const navigate = useNavigate();

  function handleClick() {

    navigate(`tilfojs/${tilfoj.id}`); 
  }
    
    return (
      <div className="drinkcard">
        <img src={tilfoj.billede} alt={tilfoj.navn} className="drinkimg" onClick={handleClick}/>
        <h3 className="drinkheader" onClick={handleClick}>{tilfoj.navn}</h3>
        <div className="star-wrap">
          <CardRating/>
        </div>
      </div>
    );
  }