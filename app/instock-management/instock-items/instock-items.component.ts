import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { ManagementOrder } from '../../entities/management-order';
import { CheckData } from '../../entities/check-data';
import { Item } from '../../entities/item';

import { Dictionary } from '../../dictionary';

import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

@Component({
  selector: 'app-instock-items',
  templateUrl: './instock-items.component.html',
  styleUrls: ['./instock-items.component.css']
})
export class InstockItemsComponent implements OnInit {
  selectItem: Item;
  items: Item[] = [];
  
  validateForm: FormGroup;

  loading: boolean = true;
  total: number;
  pageSize: number;
  pageIndex: number;

  new_title_txt: string;
  go_back_txt: string;
  im_item_name_txt: string;
  im_sku_txt: string;
  im_input_barcode_txt: string;
  filter_search_txt: string;
  filter_clear_txt: string;
  im_num_txt: string;
  btn_detail_txt: string;

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
    this.total = 1;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.getLanguage();
    this.init();
    this.getBaseData(1);
  }

  init() {
    this.validateForm = this.fb.group({});

    this.validateForm.addControl('item_name', new FormControl());
    this.validateForm.addControl('sku', new FormControl());
    this.validateForm.addControl('barcode', new FormControl());

    this.selectItem = {
      'item_id': 0,
      'item_cd': '',
      'sku': '',
      'barcode': '',
      'item_name': '',
      'num': 0
    };

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
    this.getRealTimeStockList(getData);
  }

  getRealTimeStockList(getData) {
    this.instockService.doGetRealTimeStockList(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.items = rtnData.data;
          this.loading = false;
          this.total = rtnData.page.count;
          this.pageIndex = rtnData.page.page;
        }
      }
    );
  }

  getProductInstockInfo(sku: string) {
    this.router.navigate(['/dashboard/skuinstockdetail', sku]);
  }

  goBack() {
    this.location.back();
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  getLanguage() {
    this.go_back_txt = this.languageService.get('go_back_txt');
    this.new_title_txt = this.languageService.get('dbd_instock_info_txt');
    this.im_item_name_txt = this.languageService.get('im_item_name_txt');
    this.im_sku_txt = this.languageService.get('im_sku_txt');
    this.im_input_barcode_txt = this.languageService.get('im_input_barcode_txt');
    this.filter_search_txt = this.languageService.get('filter_search_txt');
    this.filter_clear_txt = this.languageService.get('filter_clear_txt');
    this.im_num_txt = this.languageService.get('im_num_txt');
    this.btn_detail_txt = this.languageService.get('btn_detail_txt');
  }
}
