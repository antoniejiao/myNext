import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public localStorage:any;
  constructor() {
    if (!localStorage) {
      throw new Error('local Storage is not supported');
    }
    this.localStorage = localStorage;
  }

  public set(key: string, value: string): void {
    this.localStorage[key] = value;
  }

  public get(key:string): string {
    return this.localStorage[key] || false;
  }

  public setValue(key:string, value: number): void {
    this.localStorage[key] = value;
  }

  public getValue(key:string):number {
    return this.localStorage[key] || false;
  }

  public remove(key:string): any {
    this.localStorage.removeItem(key);
  }

  public setObject(key:string, value: any):void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key:string): any {
    return JSON.parse(this.localStorage[key] || '{}');
  }

  public clear(): void {
    this.localStorage.clear();
    
  }

}
