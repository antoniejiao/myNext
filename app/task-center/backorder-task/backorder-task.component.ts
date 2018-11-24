import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';


@Component({
  selector: 'app-backorder-task',
  templateUrl: './backorder-task.component.html',
  styleUrls: ['./backorder-task.component.css']
})
export class BackorderTaskComponent implements OnInit {
  validateForm: FormGroup;
  orders = [];

  loading = true;
  total: number;
  pageSize: number;
  pageIndex: number;

  title_txt: string;
  filter_ordercd_txt: string;
  filter_customer_txt: string;
  filter_status_txt: string;
  filter_No_txt: string;
  filter_search_txt: string;
  filter_clear_txt: string;
  filter_actions_txt: string;
  btn_detail_txt: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService  
  ) { }

  ngOnInit() {
    this.init();
    this.getLanguage();
    this.getOrders(1);
  }

  init() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('customer_name', new FormControl());
    this.validateForm.addControl('order_cd', new FormControl());
    this.validateForm.addControl('order_status', new FormControl());
    this.total = 1;
    this.pageSize = 10;
    this.pageIndex = 1;
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  getOrders(reset) {
    if (reset) {
      this.pageIndex = 1;
    }

    this.orders = [
      {'order_cd':'10001', 'username':'jackson', 'status':'分单出货'}
    ];
    this.loading = false;
  }

  getLanguage() {
    this.title_txt = this.languageService.get('dbd_backorder_txt');
    this.filter_ordercd_txt = this.languageService.get('filter_ordercd_txt');
    this.filter_customer_txt = this.languageService.get('filter_customer_txt');
    this.filter_status_txt = this.languageService.get('filter_status_txt'); 
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.filter_search_txt = this.languageService.get('filter_search_txt'); 
    this.filter_clear_txt = this.languageService.get('filter_clear_txt'); 
    this.filter_actions_txt = this.languageService.get('filter_actions_txt'); 
    this.btn_detail_txt = this.languageService.get('btn_detail_txt'); 
  }
}
