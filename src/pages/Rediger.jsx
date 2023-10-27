import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RedigerOpskrift from "../components/RedigerOpskrift";

//SD:

export default function Rediger() {
    const navigate = useNavigate();
  const [tilfoj, setTilfoj] = useState({});
  const params = useParams();

  const url = `https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/tilfoj/${params.tilfojId}.json`;

  useEffect(() => {
    async function getTilfoj() {
      const response = await fetch(url);
      const data = await response.json();
      setTilfoj(data);
    }
    getTilfoj();
  }, [url]);

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

  async function deleteTilfoj() {
    const confirmDelete = window.confirm(`Do you want to delete this drink?`)
    
    if (confirmDelete) {
        const response = await fetch(url, {
            method: "DELETE"
        });

        const data = await response.json();
        console.log(data);
        navigate("/tilfoj");
      }

  }

  return (
    <section>
      <RedigerOpskrift tilfoj={tilfoj} saveTilfoj={saveTilfoj} />
      <button onClick={deleteTilfoj} className="buttonEmpty">
        Slet
      </button>
    </section>
  );
}