import Knap from "../components/Knap";
import lightShaker from "../img/lightmodeShaker.gif";
import darkShaker from "../img/darkmodeShaker.gif";
import React, { useState, useEffect } from "react";

// DKK
export default function Lykken() {
  // Variabel som kan være dark eller light.
  const [theme, setTheme] = useState("dark");

  // Vi tjekker om temaet i body er dark eller light og sætter currentTheme lig denne.
  useEffect(() => {
    const currentTheme = document
      .querySelector("body")
      .getAttribute("data-theme");

    // Hvis temaet i body er light sættes theme til light. Ellers dark.
    if (currentTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }

    console.log("Current Theme:", theme);

    // useEffect skal køre én gang når siden loades og så hver gang der er en ændring i theme.
  }, [theme]);

  return (
    <section className="fixedMargin">
      <h1>Prøv Lykken!</h1>

      {/* GIF'en der vises afhænger af theme. Hvis theme er light vises lightShaker, ellers darkShaker */}
      <img
        src={theme === "light" ? lightShaker : darkShaker}
        alt="Tegnet GIF af en drinkshaker, der shaker"
        className="lykkenImg"
      />

      <h3 className="shakeTxt">Shake din mobil!</h3>

      <Knap className="buttonFull" label="Eller klik her" />
    </section>
  );
}
