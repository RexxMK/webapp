import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import imgPlaceholder from "../img/placeholder.png";

//SD

export default function RedigerOpskrift({ saveTilfoj, tilfoj }) {
  const [billede, setBillede] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [navn, setNavn] = useState("");
  const [ingridienser, setIngridienser] = useState("");
  const [metode, setMetode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (tilfoj) {
        setBillede(tilfoj.billede)
        setNavn(tilfoj.navn);
        setIngridienser(tilfoj.ingridienser);
        setMetode(tilfoj.metode);
    } 
}, [tilfoj]);

function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = event => {
                setBillede(event.target.result);
            };
            reader.readAsDataURL(file);
            setErrorMessage("");
        } else {
            setErrorMessage("Hov! Billedet skal være under 0,5 MB");
        }
    }
    async function uploadImage() {

        let imageUrl = "";

        if (imageFile) { // Er der angivet et billede, så ...
            const url = `https://firebasestorage.googleapis.com/v0/b/webapp-68213.appspot.com/o/${imageFile.name}`;
            const response = await fetch(url, {
                method: "POST",
                body: imageFile,
                headers: { "Content-Type": imageFile.type }
            });
            const data = await response.json();
            console.log(data);
            imageUrl = `${url}?alt=media`;
        } else { // Hvis ikke der er angivet et billede, så sæt billede = det allerede eksisterende
            imageUrl = billede;
        }
        return imageUrl;
    }
  }, [tilfoj]);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBillede(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage("");
    } else {
      setErrorMessage("Hov! Billedet skal være under 0,5 MB");
    }
  }
  async function uploadImage() {
    const url = `https://firebasestorage.googleapis.com/v0/b/webapp-68213.appspot.com/o/${imageFile.name}`;
    const response = await fetch(url, {
      method: "POST",
      body: imageFile,
      headers: { "Content-Type": imageFile.type },
    });
    const data = await response.json();
    console.log(data);
    const imageUrl = `${url}?alt=media`;
    return imageUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const imageUrl = await uploadImage();
    const formData = {
      billede: imageUrl,
      navn: navn,
      ingridienser: ingridienser,
      metode: metode,
    };

    const validForm =
      formData.billede &&
      formData.navn &&
      formData.ingridienser &&
      formData.metode;
    if (validForm) {
      saveTilfoj(formData);
    } else {
      setErrorMessage("Hey, du er ikke færdig endnu!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
     <label className="rediger-img">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <img
          className="rediger-img"
          src={billede}
          alt="Choose"
          onError={(event) => (event.target.src = imgPlaceholder)}
        />
      </label>
      <div className="info-wrap fixedMargin">
        <label className="rediger-navn">
          <input
            type="text"
            name="navn"
            value={navn}
            placeholder="Navnet på drink"
            onChange={(e) => setNavn(e.target.value)}
          />
          <CreateRoundedIcon />
        </label>
        <label className="rediger-items">
          <h3>Ingredienser</h3>
          <input
            type="textbox"
            name="ingridienser"
            value={ingridienser}
            onChange={(e) => setIngridienser(e.target.value)}
          />
          <div className="trin">
            <AddRoundedIcon />
            <h4>Tilføj Ingredienser</h4>
          </div>
        </label>
        <label className="rediger-items">
          <h3>Fremgangsmåde</h3>
          <input
            type="textbox"
            name="metode"
            value={metode}
            onChange={(e) => setMetode(e.target.value)}
          />
          <div className="trin">
            <AddRoundedIcon />
            <h4>Tilføj trin til fremgangsmåde</h4>
          </div>
        </label>
        <div className="rediger-items">
          <h3>Bedømmelse</h3>
          <StarRating />
        </div>
        <h4 className="error">{errorMessage}</h4>
      </div>

      <button type="submit" className="buttonFull addbtn">
        Gem
      </button>
    </form>
  );
}
