import { Polygon } from "leaflet";
import { useLeafletMapContext } from "./Map.context";
import { mockData } from "./types";
const PolygonPopup = (
  obj: { label: string; value: string | boolean | null }[] = []
): HTMLDivElement => {
  const content = obj
    .map(({ label, value }) => {
      const valueText = value ? value.toString() : "N/A";
      return `<b>${label}:</b> ${valueText}`;
    })
    .join("<br/>");

  const polygonElement = document.createElement("div");
  polygonElement.innerHTML = `${content}`;
  polygonElement.style.color = "#000";
  return polygonElement;
};
const LeafletPolygon = () => {
  const { map } = useLeafletMapContext();

  mockData.shop_data.forEach(({ datapoints }) => {
    datapoints.forEach(
      ({
        data,
        color,
        fillColor,
        fillOpacity,
        shop_location,
        brand_name,
        area,
        shop_type,
        shop_status,
        deal_status,
        contract_status,
        expiry_date,
      }) => {
        const polygon = new Polygon(data, {
          color: color,
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          weight: 1,
        });
        polygon.bindTooltip(
          `${shop_location}${
            brand_name ? `<br/>${brand_name}` : ""
          }<br/>${area}sqm`,
          {
            permanent: true,
            direction: "center",
            className: "polygon-label",
            opacity: 1,
          }
        );
        polygon.bindPopup(
          PolygonPopup([
            { label: "Brand name", value: brand_name },
            { label: "Shop location", value: shop_location },
            { label: "Shop type", value: shop_type },
            { label: "Shop area", value: `${area} sqm` },
            { label: "Shop status", value: shop_status },
            { label: "Deal status", value: deal_status },
            { label: "Contract status", value: contract_status },
            { label: "Expired date", value: expiry_date },
          ])
        );
        polygon.addTo(map);
      }
    );
  });
  //   console.log("shopMapLatLng", shopMapLatLng);
  //   const polygon = new Polygon(shopMapLatLng, {
  //     color: "red",
  //     fillColor: "#f03",
  //     fillOpacity: 0.3,
  //     weight: 2,
  //   });

  //   polygon.addTo(map);

  return null;
};

export default LeafletPolygon;
