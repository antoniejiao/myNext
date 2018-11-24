import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class EncryptInterceptor implements HttpInterceptor {

constructor(
  private localStorage: LocalStorageService
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (this.localStorage.get("token1") && (req.method != 'GET' && req.method != 'get')) {
        console.log(req.url);
        var temp = new Array();
        var sortTemp = new Array();
        var str = "";
        var i = 0;
        for ( var key in req.body ) {
          console.log(key + "=[" + req.body[key] + "]");
          temp[i] = key + "=" + req.body[key];
          i++;
        }
        //console.log(temp.sort());
        sortTemp = temp.sort();
        for ( var index in sortTemp ) {
          str += sortTemp[index] + "&";
        }

        str += "token=" + this.localStorage.get("token1");
        console.log('str1=' + str);
        console.log(req.body);
        req.body['uid'] = this.localStorage.get("userid");
        req.body['signature']= Md5.hashStr(str).toString();
        console.log('str2=' + str);
        
        console.log(Md5.hashStr(str));
        console.log(req.body);
      } else if (req.method == 'GET') {
        var tmpUserParam = "";
        if (req.url.indexOf("?") == -1) {
          tmpUserParam = "?uid=" + this.localStorage.get("userid");
        } else {
          tmpUserParam = "&uid=" + this.localStorage.get("userid");
        }
        const newUrl = req.url + tmpUserParam;
        
        const newReq = req.clone({ url: newUrl });
        //const newBody = `{ uid:${this.localStorage.get("userid")}}`;
        //const newReq = req.clone({ body: newBody });
        //console.log(newReq.body);
        console.log(newReq);
        return next.handle(newReq);
      }
      return next.handle(req);

  }



}
