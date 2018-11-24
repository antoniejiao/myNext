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
export class TaskService {
  private newTaskUrl = 'http://localhost:8082/Task/getNewTaskList';
  private takeAJobUrl = 'http://localhost:8082/Task/takeAJob';
  private getMyTaskUrl = 'http://localhost:8082/Task/getMyTaskList';

  constructor(
    private http: HttpClient
  ) { }

  doGetNewTask(getData): Observable<any> {
    var url = this.newTaskUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`new Task`))
      );
  }

  doTakeAJob(getData): Observable<any> {
    var url = this.takeAJobUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`new Task`))
      );
  }

  doGetMyTask(getData): Observable<any> {
    var url = this.getMyTaskUrl;
    return this.http.post<any>(url, getData, httpOptions).pipe(
        tap( rtnInfo => { console.log(rtnInfo); }),
        catchError(this.handleError<any>(`new Task`))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        return of(result as T);
      }
  }
}
