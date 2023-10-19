const firebase = require("firebase/app");
require("firebase/database");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZVKrP5Imc9cuee2-SuuMrQef7TCuQJLs",
  authDomain: "webapp-68213.firebaseapp.com",
  databaseURL:
    "https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webapp-68213",
  storageBucket: "webapp-68213.appspot.com",
  messagingSenderId: "175589170295",
  appId: "1:175589170295:web:9c494ffea51a8ef995fa72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Reference til database
const database = firebase.database();
const ref = database.ref("drinks");

// Data til databasen
ref.push({
  billede: "gs://webapp-68213.appspot.com/drinkbilleder/mojito.jpeg",
  navn: "Mojito",
  ingredienser:
    "5 cl Lys rom" <
    br >
    "1 Lime, skåret i både" <
    br >
    "1 tsk Sukker" <
    br >
    "1 håndfuld frisk Mynte" <
    br >
    "Danskvand" <
    br >
    "knuste isterninger",
  metode:
    "Kom mynte, halvdelen af limebådene og sukker i et glas og brug en muddler til at støde det godt sammen, så mynten afgiver en masse saft og smag og sukkeret næsten bliver opløst." <
    br >
    "Hæld rom i glasset, rør godt rundt og fyld derefter glasset med knuste isterninger." <
    br >
    "Top med danskvand og pynt med sugerør, limebåde og mynteblade på toppen inden servering",
});
