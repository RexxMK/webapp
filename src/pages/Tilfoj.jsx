import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddCard from "../components/AddCard";
import Knap from "../components/Knap";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";

//SD

export default function Tilfoj() {
    const [tilfoj, setTilfoj] = useState([]);
    const [isTilfoj, setIsTilfoj] = useState(true);
    
    useEffect(() => {
      async function getTilfoj() {
        const url = "https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/tilfoj.json";
        const response = await fetch(url);
        const data = await response.json();
        if (data !== null) {
    
          const tilfojArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setTilfoj(tilfojArray);

        } else {

          setIsTilfoj(false);

        }
      }
      getTilfoj();
    }, []);

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
        <div>
          <h1 className="add-head">Tilføj Opskrifter</h1>
          {isTilfoj ? (
            <section className="flexbox">
                <Link to="/nydrink" className="add">
                    <AddRoundedIcon/>
                    <img src={theme === "light" ? tomsideLight : tomsideDark} id="tomsidebillede"/>
                </Link>
                 {tilfoj.map((tilfoj) => (
                    <AddCard key={tilfoj.id} tilfoj={tilfoj}/>
                 ))}
            </section>
         ) : (
            <div className="fixedMargin tomside"> 
              <p>Du har ikke tilføjet nogen opskrifter.</p>
              <img src={theme === "light" ? tomsideLight : tomsideDark} id="tomsidebillede"/>
              <Knap to={"/nydrink"} className={"buttonFull"} label={"Tilføj en opskrift"}/>
            </div>
        )}
        </div>
      );
}