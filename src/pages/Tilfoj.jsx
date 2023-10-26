import { useEffect, useState } from "react";
import AddCard from "../components/AddCard";
import Knap from "../components/Knap";

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

    return (
        <div>

          <h1>Tilføj</h1>
          {isTilfoj ? (
            <div>
                <h1>Tilføj</h1>
                <Knap to={"/nydrink"} className={"buttonFull"} label={"Ny Drink"}/>
                 {tilfoj.map((tilfoj) => (
                    <AddCard key={tilfoj.id} tilfoj={tilfoj}/>
                 ))}
            </div>
         ) : (
            <p>Nothing to show</p>
        )}
        </div>
      );
}