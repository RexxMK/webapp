import { useEffect, useState } from "react";
import Drink from "../components/Drink";
import DrinkKort from "./DrinkKort";

//RMK
export default function Filter() {
  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(true);
  const [skyggeDrinksListe, setSkyggeDrinksListe] = useState([]);
  const [searchWordListe, setSearchWordListe] = useState([]);

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

  function handleCheckbox(e) {
    const checkboxStatus = e.currentTarget.checked; // er true(checked) eller false(ikke checked)
    const searchWord = e.currentTarget.getAttribute("data-searchWord"); // gemmer på søgeordet
    if (checkboxStatus) {
      searchWordListe.push(searchWord); // Indsætter søgeordet på søgeordslisten
    } else {
      const indeks = searchWordListe.indexOf(searchWord); // Finder søgeordets position på søgeordslisten
      searchWordListe.splice(indeks, 1); // Fjerner søgeordet fra søgeordslisten
    }

    setSearchWordListe(searchWordListe);
  }

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

        return s1 || s2; // Hvis enten s1 eller s2 er sand, så eksisterer søgeordet i drink navn eller ingredienser
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

  //Hvis "isDrinks" er "true", vises en liste af drinks vha. "map" funktionen, ellers vises en besked om, at der ikke er noget at vise.
  return (
    <article className="page">
      <form onSubmit={handleAktiver}>
        <h2>Smag</h2>
        <label className="checkboxButton">
          Sød
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="sød"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Sur
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="sur"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Bitter
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="bitter"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Frisk
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="frisk"
            onChange={handleCheckbox}
          />
        </label>
      </form>
      <form onSubmit={handleAktiver}>
        <h2>Alkohol</h2>
        <label className="checkboxButton">
          Vodka
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="vodka"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Gin
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="gin"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Rom
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="rom"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Tequila
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="tequila"
            onChange={handleCheckbox}
          />
        </label>
      </form>
      <form onSubmit={handleAktiver}>
        <h2>Mixer</h2>
        <label className="checkboxButton">
          Cola
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="cola"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Sprite
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="sprite"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Fanta
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="fanta"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Appelsinjuice
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="appelsinjuice"
            onChange={handleCheckbox}
          />
        </label>
        <label className="checkboxButton">
          Æblejuice
          <input
            type="checkbox"
            defaultChecked={false}
            data-searchWord="æblejuice"
            onChange={handleCheckbox}
          />
        </label>
        <form onSubmit={handleAktiver}>
          <h2>Sirup</h2>
          <label className="checkboxButton">
            Mango
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="mango"
              onChange={handleCheckbox}
            />
          </label>
          <label className="checkboxButton">
            Grenadine
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="grenadine"
              onChange={handleCheckbox}
            />
          </label>
          <label className="checkboxButton">
            Blue Curacao
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="blue curacao"
              onChange={handleCheckbox}
            />
          </label>
          <label className="checkboxButton">
            Sirup
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="sirup"
              onChange={handleCheckbox}
            />
          </label>
        </form>
        <form onSubmit={handleAktiver}>
          <h2>Antal ingredienser</h2>
          <label className="checkboxButton">
            2-3
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="2-3"
              onChange={handleCheckbox}
            />
          </label>
          <label className="checkboxButton">
            4-5
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="4-5"
              onChange={handleCheckbox}
            />
          </label>
          <label className="checkboxButton">
            6 eller flere
            <input
              type="checkbox"
              defaultChecked={false}
              data-searchWord="6 eller flere"
              onChange={handleCheckbox}
            />
          </label>
        </form>
        <button type="submit">Aktiver</button>
      </form>
      {isDrinks ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {skyggeDrinksListe.map((drink) => (
            <DrinkKort key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        <p>Nothing to show</p>
      )}
    </article>
  );
}
