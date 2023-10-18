import React from "react";
import { Link } from "react-router-dom";

//RMK
function Knap(props) {
  //Funktionen genererer et link, der bruger React Router til at navigere til en angiven side, når der klikkes på knappen.
  //Knappens destination, tekst og udseende kan tilpasses ved at ændre på props, når komponenten bruges.
  return (
    <Link to={props.to} className={props.className}>
      {props.label}
    </Link>
  );
}

export default Knap;
