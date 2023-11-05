import React, { useEffect, useState } from "react";
import Knap from "../components/Knap";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";
import DrinkKort from "../components/DrinkKort";

//RMK
export default function Favoritter() {
  const [data, setData] = useState([]);
  const [isDrinks, setIsDrinks] = useState(true);

  let favoritListe = [];

  // Hvis der allerede er en favoritliste i localstorage, så indlæses den.
  if (localStorage.getItem("favoritter")) {
    favoritListe = JSON.parse(localStorage.getItem("favoritter"));
  }


  useEffect(() => {
    async function getDrinks() {
      //Der defineres en URL til at hente drinks-data fra vores Firebase-database.
      const url =
        "https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/drinks.json";

      //Her bruges "fetch" til hente drinks-data fra vores Firebase-database og konvertere dem til JSON-format.
      const response = await fetch(url);
      const data = await response.json();

      //Hvis der er data tilgængelig, laves dataerne til et array og opdaterer "drinks" til at indeholde denne liste af drinks.
      if (data !== null) {
        const drinksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setData(drinksArray);
      }

      //Hvis der ikke er nogen data tilgængelig, opdateres "isDrinks" til "false" for at vise en meddelelse om, at der ikke er noget at vise.
      else {
        setIsDrinks(false);
      }
    }
    getDrinks();

    //Kopieret kode fra DKK Lykken page
    //at få billedet at skiftes imellem light og dark mode
    const [theme, setTheme] = useState("dark");
    const currentTheme = document
      .querySelector("body")
      .getAttribute("data-theme");

    if (currentTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  // Her filtrerer jeg de drinks fra, som står på favoritlisten
  const skyggeFavoritListe = data.filter((drink) =>
    favoritListe.includes(drink.id)
  );

  return (
    <section>
      <h1 className="fixedMargin">Mine favoritter</h1>
      {/* Her returneres enten en liste over favoritdrinks eller en besked om, at der ikke er nogen favoritter, 
      afhængigt af isDrinks og længden af skyggeFavoritListe. */}
      {isDrinks && skyggeFavoritListe.length > 0 ? (
        <div className="flexbox">
          {/* Hvis der er drinks at vise, oprettes en liste af DrinkKort-komponenter for hver favoritdrink */}
          {skyggeFavoritListe.map((drink) => (
            <DrinkKort key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        <div className="fixedMargin tomside">
          {/* Hvis der ikke er nogen favoritter, vises en besked sammen med et billede og en knap, til at komme i gang med at finde drinks */}
          <p>Du har ikke tilføjet nogen favoritter.</p>
          <img
            src={theme === "light" ? tomsideLight : tomsideDark}
            id="tomsidebillede"
          />
          <Knap to={"/find"} className={"buttonFull"} label={"Kom i gang!"} />
        </div>
      )}
    </section>
  );
}
