import { Injectable } from '@angular/core';
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
export class InstockService {
  private inBoundUrl = 'http://localhost:8082/Stock/doWarehousing';
  private outBoundUrl = 'http://localhost:8082/Stock/doOutStock';
  private startCheckingUrl = 'http://localhost:8082/Stock/startChecking';
  private pauseCheckingUrl = 'http://localhost:8082/Stock/pauseChecking';
  private continueCheckUrl = 'http://localhost:8082/Stock/continueCheck';
  private cancelCheckUrl = 'http://localhost:8082/Stock/cancelCheck';
  private finishCheckUrl = 'http://localhost:8082/Stock/finishCheck';

  private getCheckListUrl = 'http://localhost:8082/Stock/getCheckList';
  private getGoodsOutinListUrl = 'http://localhost:8082/Stock/getGoodsOutinList';
  private getOutinDetailUrl = 'http://localhost:8082/Stock/OutinDetail';

  private getRealTimeStockListUrl = 'http://localhost:8082/Stock/realTimeStockList';
  private getReportInfoUrl = 'http://localhost:8082/Stock/getReportInfo';
  private getCheckingDetailUrl = 'http://localhost:8082/Stock/checkDetail';

  private getSkuWarelocationStockUrl = 'http://localhost:8082/Stock/getSkuWarelocationStock';
  private getSaveProductWastageUrl = 'http://localhost:8082/Stock/saveProductWastage';
  private getWastageListUrl = 'http://localhost:8082/Stock/getWastageList';
  private getWastageDetailUrl = 'http://localhost:8082/Stock/getWastageDetail';


  constructor(
    private http: HttpClient
  ) { }
  
  doGetSkuInStockInfo(getData): Observable<any> {
    var url = this.getSkuWarelocationStockUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getCheckList`))
      );
  }

  doSaveProductWastage(getData): Observable<any> {
    var url = this.getSaveProductWastageUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getCheckList`))
      );
  }

  doGetWastageList(getData): Observable<any> {
    var url = this.getWastageListUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getCheckList`))
      );
  }

  doGetWastageDetail(getData): Observable<any> {
    var url = this.getWastageDetailUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getCheckList`))
      );
  }

  doGetReport(getData): Observable<any> {
    var url = this.getReportInfoUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getCheckList`))
      );
  }

  doGetCheckingDetail(getData): Observable<any> {
    var url = this.getCheckingDetailUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getCheckList`))
      );
  }

  doGetCheckList(getData): Observable<any> {
    var url = this.getCheckListUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getCheckList`))
      );
  }

  doGetRealTimeStockList(getData): Observable<any> {
    var url = this.getRealTimeStockListUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getRealTimeStockList`))
      );
  }

  doGetGoodsOutinList(getData): Observable<any> {
    var url = this.getGoodsOutinListUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getGoodsOutinList`))
      );
  }

  doGetOutInDetail(getData): Observable<any> {
    var url = this.getOutinDetailUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`getGoodsOutinList`))
      );
  }

  doStartChecking(checkData): Observable<any> {
    var url = this.startCheckingUrl;
    return this.http.post<any>(url, checkData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`doStartChecking`))
      );
  }

  doFinishChecking(checkData): Observable<any> {
    var url =this.finishCheckUrl;
    return this.http.post<any>(url, checkData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`doFinishChecking`))
      );
  }

  doPauseChecking(checkData): Observable<any> {
    var url = this.pauseCheckingUrl;
    return this.http.post<any>(url, checkData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`doPauseChecking`))
      );
  }

  doContinueChecking(checkData): Observable<any> {
    var url = this.continueCheckUrl;
    return this.http.post<any>(url, checkData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`doContinueChecking`))
      );
  }

  doCancelChecking(checkData): Observable<any> {
    var url = this.cancelCheckUrl;
    return this.http.post<any>(url, checkData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`doCancelCheck`))
      );
  }

  doSkuInBound(inBoundData): Observable<any> {
    var url = this.inBoundUrl;
    return this.http.post<any>(url, inBoundData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`doSkuInBound`))
      );

  }

  doSkuOutBound(outBoundData): Observable<any> {
    var url = this.outBoundUrl;
    return this.http.post<any>(url, outBoundData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`doSkuOutBound`))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        return of(result as T);
      }
  }

}
