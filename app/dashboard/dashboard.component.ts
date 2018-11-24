import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LanguageServiceService } from '../language-service.service';
import { LocalStorageService } from '../local-storage.service';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocking_txt: string;
  in_stock_txt: string;
  Dashboard: string = 'Dashboard';
  dbd_space_management_txt: string = '';
  dbd_shelf_management_txt: string = '';
  dbd_location_management_txt: string = '';

  dbd_instock_info_txt: string = '';
  dbd_inbound_txt: string = '';
  dbd_outbound_txt: string = '';
  dbd_checking_txt: string = '';
  dbd_wastage_txt: string = '';
  dbd_item_move_txt: string = '';

  dbd_task_management_txt: string = '';
  dbd_task_list_txt: string = '';
  dbd_do_task_txt: string = '';
  dbd_history_task_txt: string = '';
  dbd_all_task_txt: string = '';
  dbd_backorder_txt: string = '';

  dbd_purchasing_management_txt: string = '';
  dbd_safe_instock_num_txt: string = '';
  dbd_start_purchasing_txt: string = '';
  dbd_purchasing_order_management_txt: string = '';
  dbd_receving_management_txt: string = '';

  dbd_report_center_txt: string = '';
  dbd_report1_txt: string = '';
  dbd_report2_txt: string = '';


  wid: number;
  isLogin: boolean;
  auth: {};

  constructor(
    private languageService: LanguageServiceService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.wid = this.localStorageService.getValue('warehouseid');
    console.log("wid="+ this.wid);
    var temp = this.localStorageService.getValue('isLogin');
    this.isLogin = (temp == 1) ? true : false;
    this.auth = this.localStorageService.getObject('auth');
  }

  getLanguage(): void {
    this.stocking_txt = this.languageService.get("stocking_txt");
    this.in_stock_txt = this.languageService.get("in_stock_txt");
    this.dbd_space_management_txt = this.languageService.get("dbd_space_management_txt");
    this.dbd_shelf_management_txt = this.languageService.get("dbd_shelf_management_txt");
    this.dbd_location_management_txt = this.languageService.get("dbd_location_management_txt");

    this.dbd_instock_info_txt = this.languageService.get("dbd_instock_info_txt");
    this.dbd_inbound_txt = this.languageService.get("dbd_inbound_txt");
    this.dbd_outbound_txt = this.languageService.get("dbd_outbound_txt");
    this.dbd_checking_txt = this.languageService.get("dbd_checking_txt");
    this.dbd_wastage_txt = this.languageService.get("dbd_wastage_txt");
    this.dbd_item_move_txt = this.languageService.get("dbd_item_move_txt");

    this.dbd_task_management_txt = this.languageService.get("dbd_task_management_txt");
    this.dbd_task_list_txt = this.languageService.get("dbd_task_list_txt");
    this.dbd_do_task_txt = this.languageService.get("dbd_do_task_txt");
    this.dbd_history_task_txt = this.languageService.get("dbd_history_task_txt");
    this.dbd_all_task_txt = this.languageService.get("dbd_all_task_txt");
    this.dbd_backorder_txt = this.languageService.get("dbd_backorder_txt");

    this.dbd_purchasing_management_txt = this.languageService.get("dbd_purchasing_management_txt");
    this.dbd_safe_instock_num_txt = this.languageService.get("dbd_safe_instock_num_txt");
    this.dbd_start_purchasing_txt = this.languageService.get("dbd_start_purchasing_txt");
    this.dbd_purchasing_order_management_txt = this.languageService.get("dbd_purchasing_order_management_txt");
    this.dbd_receving_management_txt = this.languageService.get("dbd_receving_management_txt");

    this.dbd_report_center_txt = this.languageService.get("dbd_report_center_txt");
    this.dbd_report1_txt = this.languageService.get("dbd_report1_txt");
    this.dbd_report2_txt = this.languageService.get("dbd_report2_txt");
  }

  /*
  * 监听URL改变并处理
  */
  ngAfterViewInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.isLogin = this.localStorageService.getValue('isLogin') == 1 ? true : false;
          this.auth = this.localStorageService.getObject('auth');
          this.wid = this.localStorageService.getValue('warehouseid');
          console.log("db-viewinit");
        }
      });
  } 

  logout(): void {
    this.loginService.logout(this.localStorageService.getObject('loginData')).subscribe( xxxx => {
        console.log('x=' + xxxx);
        if (xxxx.code == 200) {
          this.localStorageService.clear();
          this.router.navigate(['/']);
        } else {

        }
      }
      );
  }
}
