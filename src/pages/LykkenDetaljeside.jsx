import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Drink from "../components/Drink";


// DKK & SD


export default function LykkenDetaljeside() {

    const params = useParams();

    const [currentDrink, setCurrentDrink] = useState({});

    const url =
          `https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/drinks/${params.currentDrinkId}.json`;
  
    useEffect(() => {
      async function getCurrentDrink() {
        const response = await fetch(url);
        const data = await response.json();
        setCurrentDrink(data);
      }
      getCurrentDrink();
    }, [url]);
    

  
  
  
    return (
      <article>
   
            <Drink key={currentDrink.id} drink={currentDrink} />

      </article>
    );
  }
  