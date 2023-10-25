import DrinkKort from "./DrinkKort";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// DKK


// Til at lave karrusellerne med drinkCards på forsiden bruges React-pluginnet React Slick. Hertil er importeret noget CSS.

export default function HjemSliders({ drinksListe, isDrinks }) {

    // Indstillnger til karusellerne defineres, så React Slick ved hvad de betyder.
    const settings = {
        infinite: false, // Muliggør ikke uendelig rulning
        slidesToShow: 2, // Antal slides at vise ad gangen på skærmen
        slidesToScroll: 2, // Antal billeder, der rulles ad gangen
        variableWidth: true,
        dots: true, // Vis prikker til navigation
        autoplay: false, // Ingen automatisk afspilning
        speed: 500, // Overgangshastighed i millisekunder
      };


      // Der returneres layoutet til én af disse karuseller.
      return (
        <div className="sliderContainer">

          {/* 1. Hvis isDrinks er true vises en karrusel med drinkskort. Ellers beskeden "der er intet at vise. 
          2. Vi bruger Slider med de givne settings.
          3. Indholdet genereres. drinksListe er et array og med map-metoden opdeles drinksListe i sine enkelte elementer. 
          (drink) => () er en arrow function. Den tager en paramenter kaldet drink, som repræsenterer hvert element i drinkListe.
          4. Hvert element i drinksListe sættes ind i DrinkKort-opsætningen. */}
          {isDrinks ? (
            <Slider {...settings}>
              {drinksListe.map((drink) => (
                <DrinkKort key={drink.id} drink={drink} className="hjemDrinkCard" />
          ))}
            </Slider>
          ) : (
            <p>Der er intet at vise.</p>
          )}
        </div>
      );
}