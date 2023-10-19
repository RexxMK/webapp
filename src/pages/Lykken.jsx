import Knap from "../components/Knap";
import lightShaker from "../img/lightmodeShaker.gif";
import darkShaker from "../img/darkmodeShaker.gif";
import React, { useState, useEffect } from "react";


// DKK
export default function Lykken() {

    // Variabel som kan være dark eller light.
    const [theme, setTheme] = useState("dark");
      
    // Vi tjekker om temaet i body er dark eller light og sætter currentTheme lig den pågældende.
    useEffect(() => {
        const currentTheme = document.querySelector("body").getAttribute('data-theme');

          if (currentTheme === "dark" || currentTheme === "light") {
            setTheme(currentTheme);
          }

          console.log("Current Theme:", currentTheme);
        }, [theme]);


        return (
            
            <section className="fixedMargin">

              <h1>Prøv Lykken!</h1>

              {/* Display the image based on the current theme */}
              <img src={theme === "dark" ? darkShaker : lightShaker} alt="Tegnet GIF af en drinkshaker, der shaker" className="lykkenImg"/>

              <h3>Shake din mobil!</h3>

              <Knap className="buttonFull" label="Eller klik her" />
           
            </section>
          );
        }
