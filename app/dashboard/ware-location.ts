import { Item } from '../entities/item';
export class WareLocation {
  location_id: number;
  location_code: string;
  shelf_id: number;
  position_id: number;
  barcode: string;
  status: string;
  items: Item[];
}
