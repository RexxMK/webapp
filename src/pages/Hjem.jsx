import { useEffect, useState } from "react";
import HjemSliders from "../components/HjemSliders";

// DKK

export default function Hjem() {
  // JSON-data med drinksene hentes fra Firebase.

  // Kopieret fra RMK, Find.jsx.
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

  // Der laves en skyggeliste for hver kategori, som filterer efter kategori

  /* drinks er en liste over alle drinks og deres attributter, herunder "kategori". 
  Med filter-metoden oprettes en ny liste ved at filtrere elementerne i drinks-listen baseret på betingelsen drink.kategori.includes(" ").
  Hvis en drink indeholder tekststrengen hhv. jul, barbie, popular, new eller tequila (kategorinavne) returneres true. Ellers false.
  Hvis der returneres true, vises elementet i skyggelisten. Ellers ikke. */

  const julDrinksListe = drinks.filter((drink) =>
    drink.kategori.includes("jul")
  );
  const barbieDrinksListe = drinks.filter((drink) =>
    drink.kategori.includes("barbie")
  );
  const popDrinksListe = drinks.filter((drink) =>
    drink.kategori.includes("popular")
  );
  const newDrinksListe = drinks.filter((drink) =>
    drink.kategori.includes("new")
  );
  const teqDrinksListe = drinks.filter((drink) =>
    drink.kategori.includes("tequila")
  );

  // Med komponenten HjemSliders får vi vist de drinkkort, som de fem skyggelister indeholder i karruseller.
  return (
    <article>
      <h2 className="hjemTopHeader fixedMargin">Juledrinks</h2>
      <HjemSliders drinksListe={julDrinksListe} isDrinks={isDrinks} />

      <h2 className="hjemHeader fixedMargin">Barbies favoritter</h2>
      <HjemSliders drinksListe={barbieDrinksListe} isDrinks={isDrinks} />

      <h2 className="hjemHeader fixedMargin">Mest populære</h2>
      <HjemSliders drinksListe={popDrinksListe} isDrinks={isDrinks} />

      <h2 className="hjemHeader fixedMargin">Nyeste drinks</h2>
      <HjemSliders drinksListe={newDrinksListe} isDrinks={isDrinks} />

      <h2 className="hjemHeader fixedMargin">Alt med tequila</h2>
      <HjemSliders drinksListe={teqDrinksListe} isDrinks={isDrinks} />
    </article>
  );
}
