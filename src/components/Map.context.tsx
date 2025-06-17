import type { Map as LeafletMap } from "leaflet";
import { createContext, use } from "react";

export type LeafletMapContextType = {
  map: LeafletMap;
};

export const LeafletMapContext = createContext<LeafletMapContextType | null>(
  null
);

export const useLeafletMapContext = (): LeafletMapContextType => {
  const context = use(LeafletMapContext);
  console.log("context", context);
  if (!context) {
    throw new Error(
      "useLeafletMapContext must be used within a <MapContainer/>"
    );
  }
  return context;
};
