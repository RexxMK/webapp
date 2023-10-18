import React from "react";
import Knap from "../components/Knap";

export default function Favoritter() {
  return (
    <section>
      <h1>Favoritter</h1>

      <Knap className="testKnap" label="Tilbage til forsiden" to="/" />
    </section>
  );
}
