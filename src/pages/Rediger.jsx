import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RedigerOpskrift from "../components/RedigerOpskrift";

//SD

export default function Rediger() {
    const navigate = useNavigate();
  const [tilfoj, setTilfoj] = useState({});
  // The url contains a parameter which is equal
  // to the id (key) of the translation to be
  // updated.
  const params = useParams();

  // console.log(`params ${params.postId}`);

  // The url must reflect the fact, that only one translation
  // is to be updated. This translation is identified by its
  // id (key).
  const url = `https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/tilfoj/${params.tilfojId}.json`;

  // Fetch (GET) this single translation
  useEffect(() => {
    async function getTilfoj() {
      const response = await fetch(url);
      const data = await response.json();
      setTilfoj(data);
    }
    getTilfoj();
  }, [url]);

  // This function sends the updated translation
  // to the server.
  async function saveTilfoj(tilfojToUpdate) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(tilfojToUpdate)
    });
    const data = await response.json();
    console.log(data);
    navigate("/tilfoj");
  }

  // This function deletes the current translation.
  // It asks the user for permission before the
  // deletion is completed.
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

  // PostForm.js is implemented and 
  // callback "savePost" holds the 
  // name of the method that updates
  // the new translation.
  return (
    <section>
      <h1>Update Post</h1>
      <RedigerOpskrift tilfoj={tilfoj} saveTilfoj={saveTilfoj} />
      <button onClick={deleteTilfoj}>
        Delete
      </button>
    </section>
  );
}