import { Injectable } from '@angular/core';
import * as LocalForage from 'localforage';
import { BehaviorSubject, Observable, observable } from 'rxjs';

export enum StorageKey{
  theme = "theme"
}


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage:LocalForage;
  private themeBS:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public theme$:Observable<boolean> = this.themeBS;
 // public theme$:Observable<boolean> = this.themeBS.asObservable();

  constructor() { 
    const options:LocalForageOptions = {
      driver: LocalForage.LOCALSTORAGE,
      name: 'claireStorage',
      storeName: 'keyvaluepairs'
    };

    this._storage = LocalForage.createInstance(options);
    this.initTheme();
    
  }

  private async initTheme(){
    const theme = await this.getItem<boolean>(StorageKey.theme) ;
    this.themeBS.next(theme||false);
  }

  private get storage():LocalForage{ return this._storage;}

  async setItem(key:StorageKey, payload:any){
    const strPayload = JSON.stringify(payload);
    await this._storage.setItem(key,strPayload);
  }


  async getItem<T>(key:StorageKey):Promise<T>{
    const value = await this._storage.getItem<string>(key.toString()) || 'false';
    return JSON.parse(value);
  }

  async removeItem(key:StorageKey){
    await this._storage.removeItem(key.toString());
  }
 
  private setTheme(darkMode:boolean){
    this.themeBS.next(darkMode);
    this.setItem(StorageKey.theme,darkMode);
  }


  switchTheme(){
   this.setTheme(!this.themeBS.value);
  }
}
