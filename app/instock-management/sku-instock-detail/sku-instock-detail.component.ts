import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dictionary } from '../../dictionary';

import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

@Component({
  selector: 'app-sku-instock-detail',
  templateUrl: './sku-instock-detail.component.html',
  styleUrls: ['./sku-instock-detail.component.css']
})
export class SkuInstockDetailComponent implements OnInit {
  sku: string;
  items;

  curPage: number;
  nextPage: number;
  previousPage: number;
  pageCount: number;
  pageLimit: number;

  go_back_txt: string;
  new_title_txt: string;
  //go_back_txt: string;
  im_item_name_txt: string;
  im_sku_txt: string;
  im_input_barcode_txt: string;
  im_location_txt: string;
  //filter_clear_txt: string;
  im_num_txt: string;
  filter_No_txt: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private instockService: InstockService 
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.baseInfo();
  }

  baseInfo() {
    this.sku = this.route.snapshot.paramMap.get('sku');
    this.getProductInstockInfo();
  }

  getProductInstockInfo() {
    let getData = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'sku': this.sku
    };

    this.instockService.doGetSkuInStockInfo(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.items = rtnData.data;
        }
      }
    );
  }

  goBack() {
    this.location.back();
  }

  getLanguage() {
    this.go_back_txt = this.languageService.get('go_back_txt');
    this.new_title_txt = this.languageService.get('im_item_instock_detail');
    this.im_item_name_txt = this.languageService.get('im_item_name_txt');
    this.im_sku_txt = this.languageService.get('im_sku_txt');
    this.im_input_barcode_txt = this.languageService.get('im_input_barcode_txt');
    this.im_location_txt = this.languageService.get('im_location_txt');
    //this.filter_clear_txt = this.languageService.get('filter_clear_txt');
    this.im_num_txt = this.languageService.get('im_num_txt');
    this.filter_No_txt = this.languageService.get('filter_No_txt');
  }
}
