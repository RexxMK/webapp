export default function Knap(props) {
  const handleClick = () => {
    //Knappen udfører en handling baseret på den modtagne prop
    if (props.destination === "/") {
      //Knappen navigerer brugeren til forsiden
    } else if (props.destination === "/find") {
      //Knappen navigerer brugeren til Find drink siden
    }
  };

  return (
    <button className={props.className} onClick={handleClick}>
      {props.label}
    </button>
  );
}
