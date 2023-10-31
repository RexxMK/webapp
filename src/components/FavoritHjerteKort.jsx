import { useState } from "react";
import { BiSolidHeartCircle } from "react-icons/bi";

// RMK

export default function FavoritHjerteKort({ drinkid, farve }) {
  //Her bruger jeg useState til at oprette en variablen iconColor med en standardfarve
  const [iconColor, setIconColor] = useState(farve);

  const handleIconClick = (e) => {
    const drinkIden = e.currentTarget.getAttribute("data-drinkid");
    let favoritListe = [];

    // Hvis der allerede er en favoritliste i localstorage, så indlæses den.
    if (localStorage.getItem("favoritter")) {
      favoritListe = JSON.parse(localStorage.getItem("favoritter"));
    }

    //Når hjerteikonet klikkes på, vil farven på ikonet blive ændret
    //Hvis farven er grå, ændres den til rød, og omvendt

    if (iconColor === "838383") {
      setIconColor("CC4E45"); // rød
      favoritListe.push(drinkIden); // Tilføjer drinken til favoritlisten
    } else {
      setIconColor("838383"); // grå
      const indeks = favoritListe.indexOf(drinkIden); // Finder drinkens position i favoritListen
      favoritListe.splice(indeks, 1); // Fjerner drinken fra favoritListen
    }

    localStorage.setItem("favoritter", JSON.stringify(favoritListe));
  };

  return (
    //Her vises hjerteikonet med den aktuelle farven (enten grå eller rød)
    <div className="favoritHjerteKort">
      <label>
        <input
          type="checkbox"
          style={{
            display: "none",
          }}
          data-drinkid={drinkid}
          onClick={handleIconClick}
        />
        <BiSolidHeartCircle
          color={iconColor}
          size={50}
          style={{ cursor: "pointer" }}
        />
      </label>
    </div>
  );
}
