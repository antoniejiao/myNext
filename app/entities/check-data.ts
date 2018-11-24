import { InstockItem } from './instock-item';
export class CheckData {
  warehouse_id: number;
  check_batch_cd: string;
  check_location_cd: string;
  created_dt: string;
  start_time: string;
  end_time: string;
  id: number;
  oper_id: number;
  oper_name: string;
  status: number;
  type: number;
  updated_dt: string;
  content: InstockItem[];
}
