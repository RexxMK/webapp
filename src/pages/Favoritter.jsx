import Knap from "../components/Knap";
import Navigation from "../components/Navigation";

export default function Favoritter() {
  return (
    <section>
      <h1>Favoritter</h1>

      <Knap className="testKnap" label="gå til hjem" destination="/" />
    </section>
  );
}
