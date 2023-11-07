import { useNavigate } from "react-router-dom";
import CardRating from "./CardRating";

//SD

export default function AddCard({ tilfoj }) {
  const navigate = useNavigate();


  //Gør det muligt at hver gang man trykker på denne komponent bliver man navigeret til en anden side
  //På app.jsx kan i se at denne funktion navigerer brugeren til rediger siden
  function handleClick() {
    navigate(`tilfojs/${tilfoj.id}`);
  }

  return (
    <div className="drinkcard">
      {/*Funktionen handleClick bliver kaldt hver gang man klikker på 
      img og h3*/}
      <img
        src={tilfoj.billede}
        alt={tilfoj.navn}
        className="drinkimg"
        onClick={handleClick}
      />
      <h3 className="drinkheader" onClick={handleClick}>
        {tilfoj.navn}
      </h3>
      <div className="star-wrap">
        <CardRating />
      </div>
    </div>
  );
}
