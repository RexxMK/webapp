import { useEffect, useState } from "react";
import DrinkKort from "../components/DrinkKort";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";
import Knap from "../components/Knap";
import Drink from "../components/Drink";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

//RMK
/*export default function Find() {
  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(true);

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
        setDrinks(drinksArray);
      }

      //Hvis der ikke er nogen data tilgængelig, opdateres "isDrinks" til "false" for at vise en meddelelse om, at der ikke er noget at vise.
      else {
        setIsDrinks(false);
      }
    }
    getDrinks();
  }, []);

  //Kopieret kode fra DK LightMode component
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
            <DrinkKort key={drinkOne.id} drink={drinkOne} />
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
}*/

//RMK
export default function Find() {
  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(false);
  const [soegeTekst, setSoegeTekst] = useState("");
  const [skyggeDrinksListe, setSkyggeDrinksListe] = useState([]);
  

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
        setDrinks(drinksArray);
        setSkyggeDrinksListe(drinksArray);
      }

      //Hvis der ikke er nogen data tilgængelig, opdateres "isDrinks" til "false" for at vise en meddelelse om, at der ikke er noget at vise.
      else {
        setIsDrinks(false);
      }
    }
    getDrinks();
    const currentTheme = document
      .querySelector("body")
      .getAttribute("data-theme");

    if (currentTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  function reset() {
    setSkyggeDrinksListe(drinks);
    setSoegeTekst("");
    setIsDrinks(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let soegeResultat = drinks.filter((drink) => {
      const s1 = drink.navn.toLowerCase().includes(soegeTekst.toLowerCase()); // Søg i drink navn
      const s2 = drink.ingredienser.find((ingrediens) =>
        ingrediens.toLowerCase().includes(soegeTekst.toLowerCase())
      ); // Søg blandt ingredienser
      return s1 || s2; // Hvis enten s1 eller s2 er sand, så eksisterer søgeteksten i drink navn eller ingredienser
    });

    if (soegeResultat.length === 0) {
      // Er der ingen drinks som matcher søgetekst, så er der ingen drinks at vise
      setIsDrinks(false);
    } else {
      setIsDrinks(true);
      setSkyggeDrinksListe(soegeResultat); // Sæt skyggelisten lig med resultat af søgning
    }
  }


  //Kopieret kode fra DK LightMode component
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



  return (
    <article className="page">

      <div className="filterHeaderDiv fixedMargin">
        <h1>Find Drink</h1>
        <button className="filterButton buttonFull"><FilterAltIcon className="filterIcon"/> Filtrer </button>
      </div>

     
      <form onSubmit={handleSubmit} className="fixedMargin">
        <div className="searchFormDiv">
          <input
            type="search"
            required
            value={soegeTekst}
            placeholder="Søg efter en drink"
            onChange={(e) => setSoegeTekst(e.target.value)}
            className="search"
          />
          <button type="button" onClick={reset} className="resetButton">
            <RestartAltIcon />
          </button>
          <button
            type="submit"
            className="searchButton"
          >
            <SearchIcon />
          </button>
        </div>
      </form>
      

      {isDrinks ? (
        <div className="flexbox">
          {skyggeDrinksListe.map((drink) => (
            <DrinkKort key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        //SD
        <div className="fixedMargin tomside">
          <p>Din søgning gav 0 resultater</p>
          <img src={theme === "light" ? tomsideLight : tomsideDark} id="tomsidebillede" />
          <h4>Du vil måske synes om</h4>
        </div>
      )}
    </article>
  );
}
