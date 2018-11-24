import { Injectable } from '@angular/core';
import { InstockItem } from '../entities/instock-item';

@Injectable({
  providedIn: 'root'
})
export class DataMessageService {
  message: string;
  loseData;
  checkingItems;
  

  constructor() { }

  setData(message: string, lose, items) {
    this.message = message;
    this.loseData = lose;
    this.checkingItems = items;
  }

  clear() {
    this.message = '';
    this.loseData = null;
    this.checkingItems = null;
  }
}
