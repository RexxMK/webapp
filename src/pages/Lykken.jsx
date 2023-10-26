import lightShaker from "../img/lightmodeShaker.gif";
import darkShaker from "../img/darkmodeShaker.gif";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// DKK

export default function Lykken() {
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

  // Når der klikkes på knappen "Eller klik her", skal knappen, shakerbilledet og teksten forsvinde og to nye knapper dukke op.

  const [visKnap, setVisKnap] = useState(true); // Tilstand for visning af første knap

  function lykkenLayout() {
    // Når den første knap klikkes, opdateres tilstandene for knappernes visning
    setVisKnap(false);
  }

  // JSON-dataet hentes fra Firebase.

  // RMK
  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
  const [jsonData, setDrinks] = useState([]);
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

  // Når der klikkes på knapperne "Eller klik her!" og "Shake for at prøve igen!" skal der genereres en random drink.

  // Vi starter med at have currentDrink = null, så der ikke vises noget på skærmen.
  const [currentDrink, setCurrentDrink] = useState(null);

  /* Med Math.random genereres et tilfældigt tal mellem 0 og 1. Dette ganges med længden af jsonData, dvs. antallet af drinks, 
    sådan at alle drinksene i jsonData har mulighed for at blive genereret. Med Math.floor sikrer vi, at vi får et heltal. 
    Dette heltal, randomIndex, bruges til at udvælge en drink fra jsonData-listen ved at vælge den drink med index lig randomIndex. 
    Denne drink sættes lig currentDrink, sådan at vi kan få drinken frem på skærmen. */
  function randomDrink() {
    const randomIndex = Math.floor(Math.random() * jsonData.length);
    const randomDrink = jsonData[randomIndex];
    setCurrentDrink(randomDrink);
  }

  // Da to funktioner skal køre ved klik på knappen "Eller klik her!" og ved ryst af mobilen samles disse to funktioner i én.

  function handleBothFunctions() {
    lykkenLayout();
    randomDrink();
  }

  // Der skal også genereres en random drink, når brugeren ryster sin mobil. Samtidig skal lykkenLayout-funktionen køre.

  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    function mobileShake(event) {
      // Indeholder information om eventets bevægelse i retningerne x, y og z.
      const acceleration = event.acceleration;

        // Følsomhed overfor rystelse. Mindskes værdien øges følsomheden, øges værdien mindskes følsomheden.
        const sensitivity = 25;
        
        // Hvis brugeren ryster sin mobil mere en sensitivity, genereres et random tal som ved randomDrink-funktionen og lykkenLayout køres.
        // Med Math.abs sikrer vi, at vi kigger på bevægelsens absolutte (postive) værdi.
        if (Math.abs(acceleration.x) > sensitivity || Math.abs(acceleration.y) > sensitivity || Math.abs(acceleration.z) > sensitivity) {
          handleBothFunctions();
        };
      };
  
      // mobileShake skal virke for hele vinduet.
      window.addEventListener('devicemotion', mobileShake);
  
      return () => {
        window.removeEventListener('devicemotion', mobileShake);
      };

    }, []);



/*
    const navigate = useNavigate();

    function handleClick() {
  
      navigate(`lykkenSeOpskrift/${current.id}`); 
    }
*/



  return (
    <section>
      <Header />

      <div className="fixedMargin">
        <h1>Prøv Lykken!</h1>

        {/* GIF'en der vises afhænger af theme. Hvis theme er light vises lightShaker, ellers darkShaker */}
        {visKnap && (
          <img
            src={theme === "light" ? lightShaker : darkShaker}
            alt="Tegnet GIF af en drinkshaker, der shaker"
            id="shakerbillede"
          />
        )}

        {visKnap && <h3 className="shakeTxt">Shake din mobil!</h3>}

        {/* Billede og navn på en random drink. Indholdet mellem tuborgklammerne vises kun når currentDrink er true. */}
        {currentDrink && (
          <div className="randomContainer">
            <img
              src={currentDrink.billede}
              alt={currentDrink.navn}
              className="randomImg"
            />
            <h2 className="randomName">{currentDrink.navn}</h2>
          </div>
        )}

        {/* Indholdet mellem tuborgklammerne vises kun når visKnap er true (hvilket den er defineret til fra start). 
          Når der klikkes på knappen starter funktionen LykkenLayout, så denne knap får visKnap = false og dermed forsvinder. */}
        {visKnap && (
          <button className="buttonFull" onClick={handleBothFunctions}>
            Eller klik her!
          </button>
        )}

        {/* !visKnap omvender tilstanden af visKnap, så disse knapper er først false og bliver true ved klik på ovenstående knap. */}
        {!visKnap && (
          <button className="buttonFull lykkenButton">Se opskrift!</button>
        )}
        <Link to={"/detalje/" + currentDrink.id}>Se opskrift</Link>
        {!visKnap && (
          <button className="buttonEmpty lykkenButton" onClick={randomDrink}>
            Shake for at prøve igen!
          </button>
        )}
      </div>
    </section>
  );
}
