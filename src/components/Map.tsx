import { imageOverlay, Map as LeafletMap } from "leaflet";
import { LeafletMapContext, type LeafletMapContextType } from "./Map.context";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { MAP_BOUNDS, MAP_OPTIONS } from "./constants";

import image from "../assets/image.jpg"; // Importing an image for the map

export type MapRef = LeafletMap | null;
const EXAMPLE_URL =
  "https://www.superprof.com.au/blog/wp-content/uploads/2018/02/landscape-photography-tutorials-980x551.jpg";

function createWhiteImage(width = 2000, height = 2000) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/png");
}

const Map = ({ children }: PropsWithChildren) => {
  const mapInstanceRef = useRef<LeafletMap>(undefined);
  const [context, setContext] = useState<LeafletMapContextType | null>(null);

  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && !mapInstanceRef.current) {
      const map = new LeafletMap(node, MAP_OPTIONS);

      map.fitBounds(MAP_BOUNDS);
      const whiteImage = createWhiteImage();

      imageOverlay(image, MAP_BOUNDS).addTo(map);

      mapInstanceRef.current = map;
      setContext({ map });
    }
  }, []);

  useEffect(() => {
    return () => {
      context?.map?.remove();
    };
  }, [context]);

  // useEffect(() => {
  //   const mapNe = map("map", { crs: CRS.Simple });
  //   const bounds = [
  //     [0, 0],
  //     [1000, 1000],
  //   ] as LatLngBoundsExpression;
  //   imageOverlay("", bounds).addTo(mapNe);
  //   mapNe.fitBounds(bounds).setMaxBounds(bounds);

  //   polygon(
  //     [
  //       [608.288609, 186.587417],
  //       [608.553774, 384.135913],
  //       [591.759988, 382.721699],
  //       [591.48498, 435.140026],
  //       [539.384648, 436.089636],
  //       [539.080532, 269.230753],
  //       [586.191522, 268.435181],
  //       [585.837968, 187.55992],
  //       [608.288609, 186.587417],
  //     ],
  // {
  //   color: "red",
  //   fillColor: "#f03",
  //   fillOpacity: 0.5,
  //   weight: 2,
  // }
  //   )
  //     .bindPopup(PolygonPopup())
  //     .bindTooltip("112233", {
  //       permanent: true,
  //       direction: "center",
  //       className: "polygon-label",
  //       opacity: 1,
  //     })
  //     .addTo(mapNe);

  //   mapNe.attributionControl.setPrefix(false);
  //   return () => {
  //     mapNe.remove();
  //   };
  // }, []);
  const contents = context ? (
    <LeafletMapContext value={context}>{children}</LeafletMapContext>
  ) : null;

  return (
    <div className="h-[500px] w-[1000px] !bg-gray-400" ref={mapRef}>
      {contents}
    </div>
  );
};

export default Map;
