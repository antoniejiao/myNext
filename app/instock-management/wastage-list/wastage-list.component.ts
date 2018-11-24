import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
//import { Subscription } from 'rxjs';

import { Location } from '@angular/common';

import { ManagementOrder } from '../../entities/management-order';

import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

@Component({
  selector: 'app-wastage-list',
  templateUrl: './wastage-list.component.html',
  styleUrls: ['./wastage-list.component.css']
})
export class WastageListComponent implements OnInit {
//subscript: Subscription;

  validateForm: FormGroup;
  selectOrder: {};
  wastageList = [];
  //orderType: number;

  loading: boolean = true;
  total: number;
  pageSize: number;

  pageIndex: number;

  new_txt: string;
  inOutbound_txt: string;
  filter_ordercd_txt: string;
  filter_operator_txt: string;
  filter_operdate_txt: string;
  filter_No_txt: string;
  filter_search_txt: string;
  filter_clear_txt: string;
  filter_actions_txt: string;
  filter_reason_txt: string;
  filter_reason_type_txt: string;
  btn_report_txt: string;

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
    this.validateForm = this.fb.group({
    });
    this.validateForm.addControl('outin_batch_cd', new FormControl());
    this.validateForm.addControl('oper_name', new FormControl());
    this.validateForm.addControl('created_dt', new FormControl());
    this.validateForm.addControl('reason_type', new FormControl());
    this.selectOrder = {
      'id': 0,
      'outin_batch_cd': '',
      'oper_id': 0,
      'oper_name': '',
      'created_dt': '',
      'type': 0,
      'warehouse_id': 0
    }
    this.total = 1;
    this.pageSize = 5;
    this.pageIndex = 1;

    this.getLanguage();
    this.getBaseData(1);
  }

  ngOnDestroy() {
  //this.subscript.unsubscribe();
  //this.orders = null;
    this.wastageList = null;
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  getBaseData(reset) {
    if (reset) {
      this.pageIndex = 1;
    }

    let getData = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'page': this.pageIndex,
      'limit': this.pageSize
    };
    this.loading = true;


    this.getWastageList(getData);
    
  }

  getWastageList(getData) {
    this.instockService.doGetWastageList(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.wastageList = rtnData.data;
          this.loading = false;
          this.total = rtnData.page.count;
          this.pageIndex = rtnData.page.page;
        }
      }
    );
  }

  new() {
    this.router.navigate(['/dashboard/wastageofcommodity']);
  }

  getLanguage() {
    this.inOutbound_txt = this.languageService.get('dbd_wastage_txt');

    this.new_txt = this.languageService.get('new_txt');
    this.filter_ordercd_txt = this.languageService.get('filter_ordercd_txt');
    this.filter_operator_txt = this.languageService.get('filter_operator_txt');
    this.filter_operdate_txt = this.languageService.get('filter_operdate_txt'); 
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.filter_search_txt = this.languageService.get('filter_search_txt'); 
    this.filter_clear_txt = this.languageService.get('filter_clear_txt'); 
    this.filter_actions_txt = this.languageService.get('filter_actions_txt'); 
    this.btn_report_txt = this.languageService.get('btn_report_txt'); 
    this.filter_reason_txt = this.languageService.get('filter_reason_txt');
    this.filter_reason_type_txt = this.languageService.get('filter_reason_type_txt');
  }
}
