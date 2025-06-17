// Type definitions for mockData

export type Coordinates = [number, number];
export type PolygonCoordinates = Coordinates[];

export interface ShopInfo {
  id: number;
  shop_location: string;
  shop_name: string | false;
  code: string;
  description: string | false;
  mall: string;
  floor: string;
  area: number;
  show_brand_name: boolean;
  shop_type: string;
  is_shallow_shop: boolean;
  category: string;
  deal_status: string | null;
  shop_status: string;
  shop_color: string;
  start_date: string | false;
  expiry_date: string | false;
  contract_status: string;
  under_contract: boolean;
  soon_to_be_vacant: boolean;
  brand_name: string | false;
}

export interface ShopDataPoint {
  textInfoLayer: PolygonCoordinates;
  type: "Polygon";
  data: PolygonCoordinates;
  id: number;
  shop_location: string;
  shop_name: string | false;
  code: string;
  description: string | false;
  mall: string;
  floor: string;
  area: number;
  show_brand_name: boolean;
  shop_type: string;
  is_shallow_shop: boolean;
  category: string;
  fillOpacity: number;
  color: string;
  dashArray: string;
  shop_color: string;
  fillColor: string;
  deal_status: string | null;
  shop_status: string;
  start_date: string | false;
  expiry_date: string | false;
  contract_status: string;
  under_contract: boolean;
  soon_to_be_vacant: boolean;
  brand_name: string | false;
}

export interface ShopData {
  info: ShopInfo;
  datapoints: ShopDataPoint[];
}

export interface MockData {
  shop_data: ShopData[];
}

// Re-export mockData with proper typing
export { mockData } from "./mockData";
