import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Drink from "../components/Drink";


export default function LykkenDetaljeside() {

 
  const params = useParams();

  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(true);

  useEffect(() => {
    async function getDrinks() {
      //Der defineres en URL til at hente drinks-data fra vores Firebase-database.
      const url =
        `https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/drinks${params.currentId}.json`;
  
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



  return (
    <article className="page">
      {isDrinks ? (
        <div className="flexbox">
          {drinks.map((drink) => (
            <Drink key={drink.id} drink={drink} />
          ))}
        </div>
      ) : (
        <p>Nothing to show</p>
      )}
    </article>
  );


}