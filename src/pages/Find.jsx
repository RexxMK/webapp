import { useEffect, useState } from "react";
import DrinkKort from "../components/DrinkKort";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";


//RMK


export default function Find() {


  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(false);




  //Kopieret kode fra DKK Lykken page
    //at få billedet at skiftes imellem light og dark mode
    const [theme, setTheme] = useState("dark");
      
    useEffect(() => {
        const currentTheme = document.querySelector("body").getAttribute('data-theme');

    if (currentTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }

    }, []);


    
    


  //Hvis "isDrinks" er "true", vises en liste af drinks vha. "map" funktionen, ellers vises en besked om, at der ikke er noget at vise.
  return (
    <article className="page">




      {isDrinks ? (
        <div className="flexbox">
          {drinks.map((drink) => (
            <DrinkKort key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        //SD
        <div className="fixedMargin tomside"> 
          <p>Din søgning gav 0 resultater.</p>
          <img src={theme === "light" ? tomsideLight : tomsideDark} id="tomsidebillede"/>
          <h4>Du vil måske synes om</h4>
        </div>
      )}
    </article>
  );
}
