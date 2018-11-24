import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string;

  constructor() { }

  setData(message: string) {
    this.message = message;
  }

  clear() {
    this.message = '';
  }

}
