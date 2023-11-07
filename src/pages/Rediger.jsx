import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RedigerOpskrift from "../components/RedigerOpskrift";

//SD

export default function Rediger() {
    const navigate = useNavigate();
  const [tilfoj, setTilfoj] = useState({});

  const params = useParams();

  //url er fra realtime databasen, men vi har tilføjet use params på linket
  //Det gør vi så ar når vi klikker på et element, blive vi navigeret til en anden side
  //med kun informationen på det ene element man klikkede på
  const url = `https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/tilfoj/${params.tilfojId}.json`;

  //Her bliver det ene element fetched
  useEffect(() => {
    async function getTilfoj() {
      const response = await fetch(url);
      const data = await response.json();
      setTilfoj(data);
    }
    getTilfoj();
  }, [url]);

  //Efter du har ændret indholdet så sender denne function
  //den ændrete version tilbage til serveren
  async function saveTilfoj(tilfojToUpdate) {
    tilfojToUpdate.uid = tilfoj.uid;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(tilfojToUpdate)
    });
    const data = await response.json();
    console.log(data);
    navigate("/tilfoj");
  }

  //denne function gør det muligt hos brugern at slette en opskrift
  async function deleteTilfoj() {
    //Vi laver en confirm pop up for at være sikker i at brugern har lyst at slette opskriften
    const confirmDelete = window.confirm(`Do you want to delete this drink?`)
    
    //Hvis brugern siger ja så bliver opskriften slettet
    //Og brugeren bliver navigeret til tilføj siden
    //Hvis brugern siger nej bliver funktionen annulleret
    if (confirmDelete) {
        const response = await fetch(url, {
            method: "DELETE"
        });

        const data = await response.json();
        console.log(data);
        navigate("/tilfoj");
      }

  }

  //vi bruger komponenten redigerOpskrift
  //og ved at tilføje saveTilfoj funktionen
  //sikrer vi at den ændrede version bliver vist
  return (
    <section>
      <RedigerOpskrift tilfoj={tilfoj} saveTilfoj={saveTilfoj} />

      {/*her kalder vi deleteTilføj funktionen
      Den bliver kaldt med at klikke på knappen*/} 
      <button onClick={deleteTilfoj} className="buttonEmpty">
        Slet
      </button>
    </section>
  );
}