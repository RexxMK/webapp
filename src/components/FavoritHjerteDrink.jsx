import { useEffect, useState } from "react";
import { BiSolidHeartCircle } from "react-icons/bi";

// RMK

export default function FavoritHjerteDrink() {
  //Her bruger jeg useState til at oprette en variablen iconColor med en standardfarve
  const [iconColor, setIconColor] = useState("838383");

  useEffect(() => {
    const savedColor = localStorage.getItem("iconColor");
    if (savedColor) {
      setIconColor(savedColor);
    }
  }, []);

  const handleIconClick = () => {
    //Når hjerteikonet klikkes på, vil farven på ikonet blive ændret
    //Hvis farven er grå, ændres den til rød, og omvendt
    let newColor;
    if (iconColor === "838383") {
      newColor = "CC4E45";
    } else if (iconColor === "CC4E45") {
      newColor = "838383";
    }

    setIconColor(newColor);
    localStorage.setItem("iconColor", newColor);
  };

  return (
    //Her vises hjerteikonet med den aktuelle farven (enten grå eller rød)
    <div className="favoritHjerteDrink">
      <BiSolidHeartCircle
        color={iconColor}
        size={100}
        onClick={handleIconClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
