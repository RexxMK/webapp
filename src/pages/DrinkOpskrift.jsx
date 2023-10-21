import { useEffect, useState } from "react";
import Drink from "../components/Drink";

export default function DrinkOpskrift() {
  // "posts" and "isposts" have hooks. Posts holds the
  // data from the fetch GET. isPosts is used to check
  // if translations exists in the database. If not, an
  // appropriate information is shown to the user.
  const [drinks, setDrinks] = useState([]);
  const [isDrinks, setIsDrinks] = useState(true); // isPosts can be true or false

  useEffect(() => {
    async function getDrinks() {
      const url =
        "https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/drinks.json";
      const response = await fetch(url);
      const data = await response.json();
      if (data !== null) {
        // This code makes a new array (postsArray) with all the
        // data (translations) from the database. "id" becomes equal to
        // the unique database key, each post have - like "-NDxg_qx1eWfdkNlZ6oj"
        // and the rest of the data is kept as they are: eng = english, dk = danish,
        // tid = transaction id.
        const drinksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDrinks(drinksArray); // Update "posts" object array list. Set posts equal to postsArray
      } else {
        setIsDrinks(false); // If no data is found, set isPosts to "false". "Noting to show" message is shown.
      }
    }
    getDrinks();
  }, []);

  // PostCard is implemented. It receives the data (translations)
  // retrieved above.
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
