import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZH } from './language-zh';
import { EN } from './language-en';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  lg: number = 1;
  zh: {} = ZH;
  en: {} = EN;
  constructor() { }

  //getLanguageMessage(msgName: string): Observable<string> {
  get(msgName: string) {
    return this.lg==1 ? this.zh[msgName] : this.en[msgName];
  }
}
