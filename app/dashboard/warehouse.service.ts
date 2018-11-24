import { Injectable } from '@angular/core';
import { Space } from './space';
import { WareLocation } from './ware-location';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private getSpacesUrl = 'http://localhost:8082/Warehouse/doGetSpacesList?warehouseId=';
  private getSpaceDetailUrl = 'http://localhost:8082/Warehouse/doGetSpaceDetail?spaceId=';
  private getPositionDetailUrl = 'http://localhost:8082/Warehouse/doGetPositionDetail?spaceId=';
  private getShelfDetailUrl = 'http://localhost:8082/Warehouse/doGetGoodsShelvesDetail?shelf_id=';

  private addSpaceUrl = 'http://localhost:8082/Warehouse/doSaveNewSpace';
  private addLocationUrl = 'http://localhost:8082/Warehouse/doSaveNewPositionLocation';

  constructor(
    private http: HttpClient
  ) { }

  getSpaces(id: number): Observable<any> {
    var url = `${this.getSpacesUrl}${id}`;
    return this.http.get<any>(url).pipe(
        tap( warehouseInfo => { console.log(warehouseInfo); }),
        catchError(this.handleError<any>(`getSpaces`))
      );
  }

  getSpaceDetailById(id: number): Observable<any> {
    var url = `${this.getSpaceDetailUrl}${id}`;

    return this.http.get<any>(url).pipe(
        tap( spaceInfo => { console.log(spaceInfo); }),
        catchError(this.handleError<any>(`getSpaceInfo`))
      );
  }

  addSpace(space: Space): Observable<any> {
    var url = this.addSpaceUrl;

    return this.http.post<Space>(url, space, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo);} ),
        catchError(this.handleError<any>(`addSpace`))
      );
  }

  addPositionLocation(wareLocation: WareLocation): Observable<any> {
    var url = this.addLocationUrl;

    return this.http.post<WareLocation>(url, wareLocation, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); } ),
        catchError(this.handleError<any>(`addPositionLocation`))
      );
  }

  getPositionDetailById(id: number): Observable<any> {
    var url = `${this.getPositionDetailUrl}${id}`;

    return this.http.get<any>(url).pipe(
        tap( positionInfo => { console.log(positionInfo); }),
        catchError(this.handleError<any>(`getPositionInfo`))
      );
  }

  getShelfDetailById(id: number): Observable<any> {
    var url = `${this.getShelfDetailUrl}${id}`;
    
    return this.http.get<any>(url).pipe(
        tap( shelfInfo => { console.log(shelfInfo); } ),
        catchError(this.handleError<any>(`get shelf detail by ${id}`))     
      );
  } 

  getWarehouseInfoByOid(id: number): Observable<any> {
    var data = { warehouseId: 1, warehouseName: '银河1号仓库', address:'太阳系地球星', tel:'85535335', contact:'Mr.X-X'};
    return of(data);  
  }

  getSpaceInfoByOid(id: number): Observable<any> {
    // if (id == 2) {
      var data = { spaceId: 1, spaceName: '出货区1', spaceCode: 's01', barcode: 's01', dataType: '1', spaceType: '2', temperatureRange: '1', spaceStatus: '1', belongtospace: 0, belongtolocation: 0, warehouse_id: 1, creator_name: 'joe', creator_time: '2018-08-18 12:00:08' };
      if (id == 3) {
        var data = { spaceId: 12, spaceName: '出货区库位2', spaceCode: 'p02', barcode: 'p02', dataType: '2', spaceType: '2', temperatureRange: '1', spaceStatus: '1', belongtospace: 0, belongtolocation: 0, warehouse_id: 1, creator_name: 'joe', creator_time: '2018-08-18 12:00:08' };
      }
    return of(data);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        //console.error(error);
        return of(result as T);
      };
  }
}
