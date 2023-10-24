import { useState } from "react";
import { BiSolidHeartCircle } from "react-icons/bi";

// RMK

export default function FavoritHjerteKort() {
  //Her bruger jeg useState til at oprette en variablen iconColor med en standardfarve
  const [iconColor, setIconColor] = useState("838383");

  const handleIconClick = () => {
    //Når hjerteikonet klikkes på, vil farven på ikonet blive ændret
    //Hvis farven er grå, ændres den til rød, og omvendt
    if (iconColor === "838383") {
      setIconColor("CC4E45");
    } else if (iconColor === "CC4E45") {
      setIconColor("838383");
    }
  };

  return (
    //Her vises hjerteikonet med den aktuelle farven (enten grå eller rød)
    <div className="favoritHjerteKort">
      <BiSolidHeartCircle
        color={iconColor}
        size={50}
        onClick={handleIconClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
