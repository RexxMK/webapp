import React, { useEffect, useState } from "react";
import Knap from "../components/Knap";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";


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
       {/*SD*/}
       <div className="fixedMargin tomside"> 
              <p>Du har ikke tilføjet nogen favoritter.</p>
              <img src={theme === "light" ? tomsideLight : tomsideDark} id="tomsidebillede"/>
              <Knap to={"/find"} className={"buttonFull"} label={"Kom i gang!"}/>
        </div>
    </section>
  );
}
