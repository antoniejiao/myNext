import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Login } from './login';
import { LanguageServiceService } from '../language-service.service';
import { LocalStorageService } from '../local-storage.service';
import { LoginService } from './login.service';
import { MessageService } from '../system-message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: Login;

  loginCode: number;
  welcome_text: string;
  login_text: string;
  ph_name_txt: string;
  ph_pwd_txt: string;

  //@Input() loginname: string;
  //@Input() loginpwd: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private loginService: LoginService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.loginData = { 
      account: '',
      password: ''
      };
    this.loginCode = 0;
    //this.loginData.password = '';
    this.localStorage.setValue('isLogin', 0);
  }

  getLanguage(): void {
  //this.languageService.getLanguageMessage('welcome_text').subscribe(text => this.welcome_text = text);
    this.welcome_text = this.languageService.get("welcome_text");
    this.login_text = this.languageService.get("login_text");
    this.ph_name_txt = this.languageService.get("ph_name_txt");
    this.ph_pwd_txt = this.languageService.get("ph_pwd_txt");
  }

  userLogin(): void {
    this.localStorage.setValue('isLogin', 0);
    this.loginService.loginS(this.loginData).subscribe( xxxx => {
    //console.log(xxxx);
          if (xxxx.code == 200) {
            this.localStorage.set('username', xxxx.data.userInfo.name);
            this.localStorage.set('userid', xxxx.data.userInfo.id);
            this.localStorage.set('account', xxxx.data.userInfo.account);
            this.localStorage.set('employeeCd', xxxx.data.userInfo.uno);
            this.localStorage.set('token1', xxxx.data.userInfo.token);


            this.localStorage.setObject('loginData', this.loginData);

            this.localStorage.setObject('auth', xxxx.data.nodes);

            this.localStorage.set('warehousename', xxxx.data.userInfo.warehouse.warehouseName);
            this.localStorage.setValue('warehouseid', xxxx.data.userInfo.warehouse.warehouseId);
            this.localStorage.setValue('isLogin', 1);
            this.localStorage.setValue('shelfLife', 0);
            this.localStorage.setValue('needBarcode', 1);
            //this.router.navigate(['/base-management', 1, xxxx.data.userInfo.warehouse.warehouseId]);
            this.router.navigate(['/dashboard']);
          } else {
            this.localStorage.clear();
            this.messageService.setData(xxxx.data);
            this.router.navigate([{ outlets: { msg:['msg'] }}]);
          }
        }
      );
    
  }
}
