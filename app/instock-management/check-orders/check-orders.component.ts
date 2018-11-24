import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ManagementOrder } from '../../entities/management-order';
import { CheckData } from '../../entities/check-data';

import { Dictionary, CHECKSTATUSARRAYS } from '../../dictionary';

import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

@Component({
  selector: 'app-check-orders',
  templateUrl: './check-orders.component.html',
  styleUrls: ['./check-orders.component.css']
})
export class CheckOrdersComponent implements OnInit {
  validateForm: FormGroup;
  selectOrder: CheckData;
  //outin_batch_cd: string;
  //oper_name: string;
  //created_dt: string;

  //operateOrder: ManagementOrder;
  checkOrders: CheckData[] = [];
  checkStatusArrays = CHECKSTATUSARRAYS;

  loading: boolean =true;
  total: number;
  pageSize: number;
  pageIndex: number;
  //nextPage: number;
  //previousPage: number;
  //pageCount: number;
  //pageLimit: number;

  title_txt: string;
  new_txt: string;
  filter_ordercd_txt: string;
  filter_operator_txt: string;
  filter_operdate_txt: string;
  filter_No_txt: string;
  filter_status_txt: string;
  filter_search_txt: string;
  filter_clear_txt: string;
  filter_actions_txt: string;
  btn_report_txt: string;
  cancel_txt: string;
  btn_continue_txt: string;
  go_back_txt: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private instockService: InstockService
  ) { }

  ngOnInit() {
    this.dataInit();
    this.getLanguage();
    this.getBaseData(true);
  }

  dataInit() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('outin_batch_cd', new FormControl());
    this.validateForm.addControl('oper_name', new FormControl());
    this.validateForm.addControl('created_dt', new FormControl());

    this.pageIndex = 1;
    
    this.total = 1;
    this.pageSize = 10;

    this.selectOrder = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'check_batch_cd': '',
      'check_location_cd': '',
      'created_dt': '',
      'start_time': '',
      'end_time': '',
      'id': 0,
      'oper_id': 0,
      'oper_name': '',
      'status': 3,
      'type': 0,
      'updated_dt': '',
      'content': []
      };
  }

  getBaseData(reset) {
    if (reset) {
      this.pageIndex = 1;
    }

    let checkGetData = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'page': this.pageIndex,
      'limit': this.pageSize
    };
    this.loading = true;
    this.getCheckData(checkGetData);
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  getCheckData(getData) {
    this.instockService.doGetCheckList(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.checkOrders = rtnData.data;
          this.total = rtnData.page.count;
          this.pageIndex = rtnData.page.page;
          this.loading = false;
        }
      }
    );
  }
  
  doCheckCancel(batch_cd: string, index: number) {
    if (batch_cd == '') {
      return;
    }

    let operateOrder = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'check_batch_cd': batch_cd,
      'check_location_cd': '',
      'created_dt': '',
      'start_time': '',
      'end_time': '',
      'id': 0,
      'oper_id': 0,
      'oper_name': '',
      'status': 0,
      'type': 0,
      'updated_dt': '',
      'content': []
    };
    this.instockService.doCancelChecking(operateOrder).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          //this.location.back();
          if (batch_cd == this.checkOrders[index].check_batch_cd) {
            this.checkOrders[index].status = 0;
          }
        } else {
          console.log("eeeeeeeerrorrrr!!!");
        }
      }
    );
  }

  doContinueCheck(batch_cd: string) {
    this.router.navigate(['/continuecheck', 10, batch_cd]);
  }

  showDetail(code: string) {
    this.router.navigate(['/instockreport', code]);
  }

  new() {
    this.router.navigate(['/dashboard/checking', 1]);
  }

  goBack() {
    this.location.back();
  }

  getLanguage() {
  //this.go_back_txt = this.languageService.get('go_back_txt');
    this.title_txt = this.languageService.get('dbd_checking_txt');
    this.new_txt = this.languageService.get('new_txt');
    this.filter_ordercd_txt = this.languageService.get('filter_ordercd_txt');
    this.filter_operator_txt = this.languageService.get('filter_operator_txt');
    this.filter_operdate_txt = this.languageService.get('filter_operdate_txt'); 
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.filter_status_txt = this.languageService.get('filter_status_txt');
    this.filter_search_txt = this.languageService.get('filter_search_txt'); 
    this.filter_clear_txt = this.languageService.get('filter_clear_txt'); 
    this.filter_actions_txt = this.languageService.get('filter_actions_txt'); 
    this.btn_report_txt = this.languageService.get('btn_report_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');
    this.btn_continue_txt = this.languageService.get('btn_continue_txt');
  }

}
