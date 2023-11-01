import { useEffect, useState } from "react";
import DrinkKort from "../components/DrinkKort";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// DKK & RMK

export default function Find() {
  // RMK
  // Her oprettes tilstandsvariabler ved hjælp af "useState".
  // "drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(true);
  // Til filtrering
  const [searchWordListe, setSearchWordListe] = useState([]);

  // DKK
  // Til søgefunktionen
  const [soegeTekst, setSoegeTekst] = useState("");

  // Til om den tomme side ved ingen søgeresultater skal vises eller ej.
  const [visning, setVisning] = useState("none");

  // RMK & DKK
  // Til søg og filtrering
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

  // RMK
  function handleCheckbox(e) {
    const checkboxStatus = e.currentTarget.checked; // Her tjekkes om checkboksen er true(checked) eller false(ikke checked)
    const searchWord = e.currentTarget.getAttribute("data-searchWord"); // gemmer på søgeordet

    if (checkboxStatus) {
      searchWordListe.push(searchWord); // Indsætter søgeordet på søgeordslisten
    } else {
      const indeks = searchWordListe.indexOf(searchWord); // Finder søgeordets position på søgeordslisten
      searchWordListe.splice(indeks, 1); // Fjerner søgeordet fra søgeordslisten
    }

    setSearchWordListe(searchWordListe);
  }

  // RMK
  function handleAktiver(e) {
    e.preventDefault();

    // setSkyggeDrinksListe(drinks);
    setIsDrinks(true);

    let temp = [];
    let searchResultatListe = drinks;

    for (const searchWord of searchWordListe) {
      temp = searchResultatListe.filter((drink) => {
        const s1 = drink.navn.toLowerCase().includes(searchWord.toLowerCase()); // Søg i drink navn
        const s2 = drink.ingredienser.find((ingrediens) =>
          ingrediens.toLowerCase().includes(searchWord.toLowerCase())
        ); // Søg blandt ingredienser
        const s3 = drink.smag.find(
          (elem) => elem.toLowerCase().includes(searchWord.toLowerCase()) // Søg i smag
        );
        const s4 = drink.antalingredienser.includes(searchWord); // Søg i antal

        return s1 || s2 || s3 || s4; // Hvis enten s1, s2, s3 eller s4 er sand, så eksisterer søgeordet i drink navn eller ingredienser
      });

      searchResultatListe = temp;
    }

    if (skyggeDrinksListe.length === 0) {
      // Er der ingen drinks som matcher , så er der ingen drinks at vise
      setIsDrinks(false);
    } else {
      setSkyggeDrinksListe(searchResultatListe);
    }
  }

  // DKK
  // Når brugeren resetter deres søgning, skal der ske 3 ting.
  // 1. Alle drinks skal igen vises. Derfor tages sættes skyggeDrinksListe til drinks (som netop er alle drinks).
  // 2. Brugerens søgetekst skal slettes fra søgefeltet. Den sættes derfor til en tom streng.
  // 3. isDrinks sættes til true, så alle drinksene igen vises i tilfælde af en "tom" søgning.
  // 4. Tekst og billede ved ingen søgeresultater skal ikke vises, altså have display: none.
  function reset() {
    setSkyggeDrinksListe(drinks);
    setSoegeTekst("");
    setIsDrinks(true);
    setVisning("none");
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

      // Ved ingen søgeresultater får brugeren foreslået 4 drinks.
      const antalDrinks = 4;
      setSkyggeDrinksListe(drinks.slice(0, antalDrinks));
      setVisning("block");
    } else {
      // Ellers er der drinks at vise, hvilket sker ved at sætte skyggeDrinksListe til at være søgeresultatet.
      setIsDrinks(true);
      setSkyggeDrinksListe(soegeResultat);
      setVisning("none");
    }
  }

  // Kopieret fra DKK Lykken.jsx.
  /* Følgende funktion sikrer, at det rigtige shakerbillede vises fra start afhængigt af om brugeren klikker ind på Prøv Lykken i 
  light eller dark mode. Har brugeren valgt dark mode når de klikker ind på Prøv Lykken skal darkShaker vises. Har de valgt light mode,
  skal lightShaker vises. (Ændrer brugeren mode imens de er på Prøv Lykken skifter billedet også, men dette sker under LightMode.jsx.) */

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

    // useEffect skal køre én gang når siden loades. Derfor de tomme [].
  }, []);

  // DKK
  // Når der klikkes på "Filtrer"-knappen, skal filteret åbne eller lukke afhængigt af, hvad den er, idet der klikkes.
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Med !isFilterOpen omvendes tilstanden af isFilterOpen.
  function toggleFilter() {
    setIsFilterOpen(!isFilterOpen);
  }

  return (
    <article className="page">
      {/* DKK */}
      <div className="filterHeaderDiv fixedMargin">
        <h1>Find Drink</h1>
        <button className="filterButton buttonFull" onClick={toggleFilter}>
          <FilterAltIcon className="filterIcon" /> Filtrer{" "}
        </button>
      </div>

      {/* RMK */}
      <div
        className={`fixedMargin filter-container ${
          isFilterOpen ? "open" : "closed"
        }`}
      >
        {/* Her er alle knapperne i filteret */}
        <form onSubmit={handleAktiver}>
          <h2 className="filterTopHeader">Smag</h2>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="sød"
              onChange={handleCheckbox}
            />
            <span className="checkmark">Sød</span>
          </label>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="sur"
              onChange={handleCheckbox}
            />
            <span className="checkmark">Sur</span>
          </label>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="bitter"
              onChange={handleCheckbox}
            />
            <span className="checkmark">Bitter</span>
          </label>
          <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="frisk"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Frisk</span>
        </label>
      </form>
      <form onSubmit={handleAktiver}>
        <h2 className="filterHeader">Alkohol</h2>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="vodka"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Vodka</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="gin"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Gin</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="rom"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Rom</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="tequila"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Tequila</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="cointreau"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Cointreau</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="prosecco"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Prosecco</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="hyldeblomstlikør"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Hyldeblomstlikør</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="ferskenlikør"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Ferskenlikør</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="solbærlikør"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Solbærlikør</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="midori likør"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Melonlikør</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="campari"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Campari</span>
        </label>
      </form>
      <form onSubmit={handleAktiver}>
        <h2 className="filterHeader">Mixer</h2>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="cola"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Cola</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="appelsinjuice"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Appelsinjuice</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="danskvand"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Danskvand</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="lemon/lime sodavand"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Lemon/Limesodavand</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="pink lemonade"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Pink Lemonade</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="tranebærjuice"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Tranebærjuice</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="ananasjuice"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Ananasjuice</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="limejuice"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Limejuice</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="limesaft"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Limesaft</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="tonic"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Tonic</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="ginger ale"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Ginger Ale</span>
        </label>
        <form onSubmit={handleAktiver}>
          <h2 className="filterHeader">Sirup</h2>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="mango"
              onChange={handleCheckbox}
            />
            <span className="checkmark">Mangosirup</span>
          </label>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="grenadine"
              onChange={handleCheckbox}
            />
            <span className="checkmark">Grenadine</span>
          </label>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="blue curacao"
              onChange={handleCheckbox}
            />
            <span className="checkmark">Blue Curacao</span>
          </label>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="sirup"
              onChange={handleCheckbox}
            />
            <span className="checkmark">Sirup</span>
          </label>
          <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="jordbærsirup"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Jordbærsirup</span>
        </label>
        <label className="checkboxButton">
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="Rosmarinsirup"
            onChange={handleCheckbox}
          />
          <span className="checkmark">Rosmarinsirup</span>
        </label>
        </form>
        <form onSubmit={handleAktiver}>
          <h2 className="filterHeader">Antal ingredienser</h2>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="2-3"
              onChange={handleCheckbox}
            />
            <span className="checkmark">2-3</span>
          </label>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="4-5"
              onChange={handleCheckbox}
            />
            <span className="checkmark">4-5</span>
          </label>
          <label className="checkboxButton">
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="6 eller flere"
              onChange={handleCheckbox}
            />
            <span className="checkmark">6 eller flere</span>
          </label>
        </form>
        <button type="submit" onClick={toggleFilter} className="buttonFull aktiverButton">Find drinks</button>
      </form>
      </div>

      {/* DKK */}
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
          <button type="submit" className="searchButton">
            <SearchIcon />
          </button>
        </div>
      </form>

      {/* RMK & DKK */}
      {isDrinks ? (
        <div className="flexbox">
          {skyggeDrinksListe.map((drink) => (
            <DrinkKort key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        //SD
        <div className="tomside" style={{ display: visning }}>
          <p className="fixedMargin">0 resultater</p>
          <img
            src={theme === "light" ? tomsideLight : tomsideDark}
            id="tomsidebillede"
          />
          <h4 className="tomsideHeader fixedMargin">Du vil måske synes om</h4>
          <div className="flexbox">
            {skyggeDrinksListe.map((drink) => (
              <DrinkKort key={drink.id} drink={drink} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
