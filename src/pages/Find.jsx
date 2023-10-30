import { useEffect, useState } from "react";
import DrinkKort from "../components/DrinkKort";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Filter from "../components/Filter";


// DKK


export default function Find() {

  // RMK
  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(true);

  // DKK
  // Til at lave søgefunktionen oprettes yderligere to variable.
  const [soegeTekst, setSoegeTekst] = useState("");
  const [skyggeDrinksListe, setSkyggeDrinksListe] = useState([]);
  

  // RMK
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

  }, []);


  // DKK
  // Når brugeren resetter deres søgning, skal der ske 3 ting.
  // 1. Alle drinks skal igen vises. Derfor tages sættes skyggeDrinksListe til drinks (som netop er alle drinks).
  // 2. Brugerens søgetekst skal slettes fra søgefeltet. Den sættes derfor til en tom streng.
  // 3. isDrinks sættes til true, så alle drinksene igen vises i tilfælde af en "tom" søgning.
  function reset() {
    setSkyggeDrinksListe(drinks);
    setSoegeTekst("");
    setIsDrinks(true);
  }

  // DKK
  // handleSubmit-funktionen skal kaldes, når brugeren laver en søgning.
  function handleSubmit(e) {

    // Normalt genindlæses siden ved en formularindsendelse. Dette forhindres her med preventDefault.
    e.preventDefault();

    /* Med filter-metoden gennemgås hvert element i drinks og det vurderes om elementet skal inkluderes i det nye array, soegeResultat, 
    baseret på de to betingelser, s1 og s2. */ 
    let soegeResultat = drinks.filter((drink) => {

      // Med s1 tjekkes om søgeteksten (som er gemt i soegeTekst) er inkluderet i navnet på en drink.
      // toLowerCase() sørger for at alt læses med små bogstaver, så der ikke gøres forskel på små og store bogstaver.
      const s1 = drink.navn.toLowerCase().includes(soegeTekst.toLowerCase());

      // Med s2 tjekkes om søgeteksten er inkluderet i ingredienserne til en drink.
      const s2 = drink.ingredienser.find((ingrediens) =>
        ingrediens.toLowerCase().includes(soegeTekst.toLowerCase())
      );

      // Hvis enten s1 eller s2 er sand, eksisterer søgeteksten i drinks navn eller ingredienser.
      return s1 || s2;
    });

    // Hvis længden på søgeresultatet er 0, betyder det, at der ikke blev fundet nogen drinks, der matcher søgeteksten.
    if (soegeResultat.length === 0) {

      // I så fald er der ingen drinks at vise.
      setIsDrinks(false);
    } else {

      // Ellers er der drinks at vise, hvilket sker ved at sætte skyggeDrinksListe til at være søgeresultatet.
      setIsDrinks(true);
      setSkyggeDrinksListe(soegeResultat);
    }
  }


    // Kopieret kode fra DKK Lykken page
    // Til at få billedet at skiftes imellem light og dark mode
    const [theme, setTheme] = useState("dark");
      
    useEffect(() => {
        const currentTheme = document.querySelector("body").getAttribute('data-theme');

    if (currentTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }

    }, []);




  // DKK
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

        <div className="fixedMargin tomside">
          <p>Din søgning gav 0 resultater</p>
          <img src={theme === "light" ? tomsideLight : tomsideDark} id="tomsidebillede" />
          <h4>Du vil måske synes om</h4>
        </div>
      )}
    </article>
  );
}