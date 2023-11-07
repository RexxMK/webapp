import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddCard from "../components/AddCard";
import Knap from "../components/Knap";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";

//SD

export default function Tilfoj() {
  //tilfoj og isTilfoj er hooks
  //tilfoj holder data'et som bliver fetchet
  const [tilfoj, setTilfoj] = useState([]);
  //isTilfoj checker om der er noget i databasen
  //om der ikke er så vises der en anden information
  const [isTilfoj, setIsTilfoj] = useState(true);

  useEffect(() => {
    async function getTilfoj() {

      //Url er realtime databasen
      //Realtime databasen bliver fetched
      const url =
        "https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/tilfoj.json";
      const response = await fetch(url);
      const data = await response.json();
      if (data !== null) {
        //Hvis der er noget gemt i realtime databasen
        //Så bliver bliver det vist på siden 
        //Det er en map af et array og om der er nogle objekter i array'et
        //så bliver mappen vist
        const tilfojArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setTilfoj(tilfojArray);
      } else {

        //hvis der er ikke noget på realtime database
        //så bliver setIsTilføj falsk og en tom side bliver vist
        setIsTilfoj(false);
      }
    }
    getTilfoj();
  }, []);

  //Kopieret kode fra DKK Lykken page
  //at få billedet at skiftes imellem light og dark mode
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document
      .querySelector("body")
      .getAttribute("data-theme");

    if (currentTheme === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  return (
    <div>
      <h1 className="fixedMargin">Tilføj Opskrifter</h1>

      {/*Hvis der allerede er nogle opskrifter på siden
      bliver det her vist*/}
      {isTilfoj ? (
        <section className="flexbox">
          <Link to="/nydrink" className="add">
            <AddRoundedIcon />
            <img
              src={theme === "light" ? tomsideLight : tomsideDark}
              id="tomsidebillede"
            />
          </Link>

          {tilfoj.map((tilfoj) => (
            <AddCard key={tilfoj.id} tilfoj={tilfoj} />
          ))}
        </section>
      ) : (
        //Hvis der er ingen opskrifter så bliver denne tom side vist
        <div className="fixedMargin tomside">
          <p>Du har ikke tilføjet nogen opskrifter.</p>
          <img
            src={theme === "light" ? tomsideLight : tomsideDark}
            id="tomsidebillede"
          />
          <Knap
            to={"/nydrink"}
            className={"buttonFull"}
            label={"Tilføj en opskrift"}
          />
        </div>
      )}
    </div>
  );
}
