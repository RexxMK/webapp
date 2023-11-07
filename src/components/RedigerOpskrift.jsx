import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import imgPlaceholder from "../img/placeholder.png";

//SD
//Denne komponent har kalder tilbage til saveTilfoj
//Så om vi klikker på noget som har allerede felterne udfyldt
//Så bliver det vist i denne komponent
export default function RedigerOpskrift({ saveTilfoj, tilfoj }) {
  const [billede, setBillede] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [navn, setNavn] = useState("");
  const [ingridienser, setIngridienser] = useState("");
  const [metode, setMetode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (tilfoj) {
      //Det samme sker her
      //Om felterne var fyldte før så er de det når denne komponetn bliver vist
      setBillede(tilfoj.billede);
      setNavn(tilfoj.navn);
      setIngridienser(tilfoj.ingridienser);
      setMetode(tilfoj.metode);
    }
  }, [tilfoj]); 
  //use effect bliver kaldt hver gang man laver en ændring på opskriften


  //functionen bliver kalt hver gang brugeren vælger et billede
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 5000000) {
      //for at det skal være muligt for at kunne tilføje et billede med telefon kameraet
      //så må vi have en maks på 5MB, d.v.s. at billedet har ikke lov at være større end 5MB
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBillede(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage("");
    } else {

      //for at brugeren også ved maks størrelsen på billedet
      //så kommer en error message når brugeren har vælgt et som er mere end 5MB
      setErrorMessage("Hov! Billedet skal være under 5 MB");
    }
  }
  async function uploadImage() {
    let imageUrl = "";

    if (imageFile) {
      // om der allerede er et billede så...
     
      //url er fra vores firestorage hvor alle billederne bliver gemt
      const url = `https://firebasestorage.googleapis.com/v0/b/webapp-68213.appspot.com/o/${imageFile.name}`;
      const response = await fetch(url, {
        method: "POST",
        body: imageFile,
        headers: { "Content-Type": imageFile.type },
      });
      const data = await response.json();
      console.log(data);
      imageUrl = `${url}?alt=media`;
    } else {
      
      // Hvis ikke der er angivet et billede, så vil en place holder billede blive vist i stedet for
      imageUrl = billede;
    }
    return imageUrl;
  }

  //Når et felt bliver udfyldt bliver et object lavet (formData)
  async function handleSubmit(e) {
    e.preventDefault();
    const imageUrl = await uploadImage();
    const formData = {
     
      //De fire attributer på vores opskrift objekt
      //Denne funktion gør det muligt at lave en ny opskrift eller at redigere opskriften
      //Med at skrive informationen i vores tekst input
      //Vi bruger imageUrl, for at ramme den uploaded version af billedet og ikke "billedet selv"
      billede: imageUrl,
      navn: navn,
      ingridienser: ingridienser,
      metode: metode,
    };

    //For at sikkre at alle felter bliver udfuldt bruger vi denne funktion
    const validForm =
      formData.billede &&
      formData.navn &&
      formData.ingridienser &&
      formData.metode;
      
      //Når alle atributter er udfyldt eller valid
      //Så kan funktionen saveTilføj gå igennem
    if (validForm) {
      saveTilfoj(formData);
      
      //Men om alt ikke er udfyldt så kommer en error message
      //Så brugern ved at der er noget han mangler
    } else {
      setErrorMessage("Hey, du er ikke færdig endnu!");
    }
  }

  return (
      
    //Her kalder vi funktionen handleSubmit og siger at den skal gå igennem on submit
      //Det følger med at gem knappen er type submit
      <form onSubmit={handleSubmit}>
      <label className="rediger-img">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        
        {/*Her definerer vi vores place holder billede*/}
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
