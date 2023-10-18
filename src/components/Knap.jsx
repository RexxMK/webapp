import React from "react";
import { Link } from "react-router-dom";

function Knap(props) {
  return (
    <Link to={props.to} className={props.className}>
      {props.label}
    </Link>
  );
}

export default Knap;
