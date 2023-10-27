/*import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Favoritter() {
  const [data, setData] = useState([]);

  let favoritListe = [];

  // Hvis der allerede er en favoritliste i localstorage, så indlæses den.
  if (localStorage.getItem("favoritter")) {
    favoritListe = JSON.parse(localStorage.getItem("favoritter"));
  }

  function handleFavorite(e) {
    const drinkId = e.currentTarget.getAttribute("data-id");
    const checked = e.currentTarget.checked;
    console.log(drinkId + " " + checked);

    if (checked) {
      favoritListe.push(drinkId);
    } else {
      const indeks = favoritListe.indexOf(drinkId);
      favoritListe.splice(indeks, 1);
    }
    //Gem favoritter i localstorage
    localStorage.setItem("favoritter", JSON.stringify(favoritListe));
  }

  return (
    <section>
      <h1>Favoritter</h1>
      <ul>
        {data.map((item) => (
          <div key={item.id}>
            {favoritListe.includes(item.id) ? (
              <li style={{ listStyleType: "none" }}>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  data-id={item.id}
                  onChange={handleFavorite}
                  style={{ display: "inline-block" }}
                />
              </li>
            ) : (
              console.log("Drink ikke på favoritlisten.")
            )}
          </div>
        ))}
      </ul>
    </section>
  );
}*/
