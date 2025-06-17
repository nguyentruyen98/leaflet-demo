import "./App.css";
import "./map.css";
import Map from "./components/Map";
import LeafletPolygon from "./components/Polygon";

function App() {
  return (
    <div className="bg-black/35">
      <Map>
        <LeafletPolygon />
      </Map>
    </div>
  );
}

export default App;
