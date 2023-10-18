import React from "react";
import Knap from "../components/Knap";

export default function Favoritter() {
  return (
    <section>
      <h1>Favoritter</h1>

      <Knap className="buttonFull" label="Tilbage til forsiden" to="/" />
      <Knap className="buttonEmpty" label="Tilbage til forsiden" to="/" />
    </section>
  );
}
