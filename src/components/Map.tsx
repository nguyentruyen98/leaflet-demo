import {
  map,
  CRS,
  imageOverlay,
  polygon,
  type LatLngBoundsExpression,
} from "leaflet";
import { useEffect } from "react";

const PolygonPopup = (): HTMLDivElement => {
  const polygonElement = document.createElement("div");
  polygonElement.innerHTML = "Polygon Popup";
  polygonElement.style.color = "#ffffff";
  polygonElement.style.backgroundColor = "#f03";
  polygonElement.style.opacity = "0.5";
  polygonElement.style.padding = "10px";
  polygonElement.style.border = "2px solid red";
  return polygonElement;
};

const EXAMPLE_URL =
  "https://www.superprof.com.au/blog/wp-content/uploads/2018/02/landscape-photography-tutorials-980x551.jpg";

const Map = () => {
  useEffect(() => {
    const mapNe = map("map", { crs: CRS.Simple });
    const bounds = [
      [0, 0],
      [1000, 1000],
    ] as LatLngBoundsExpression;
    imageOverlay(EXAMPLE_URL, bounds).addTo(mapNe);
    mapNe.fitBounds(bounds).setMaxBounds(bounds);

    polygon(
      [
        [500, 500],
        [600, 500],
        [600, 600],
        [500, 600],
      ],
      {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        weight: 2,
      }
    )
      .bindPopup(PolygonPopup())
      .bindTooltip("This is a polygon", {
        permanent: true,
        direction: "center",
        className: "polygon-label",
        opacity: 1,
      })
      .addTo(mapNe);
    mapNe.attributionControl.setPrefix(false); // Bỏ chữ "Leaflet"
    mapNe.attributionControl.addAttribution(""); // Xóa attribution khác nếu muốn
    return () => {
      mapNe.remove();
    };
  }, []);

  return <div className="h-[1000px] w-[1000px]" id="map"></div>;
};

export default Map;
