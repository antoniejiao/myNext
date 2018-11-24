import { Component, OnInit, ElementRef, Renderer, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { WastageItem } from '../../entities/wastage-item';
import { Dictionary, WASTAGETYPES } from '../../dictionary';

import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-wastage-of-commodity',
  templateUrl: './wastage-of-commodity.component.html',
  styleUrls: ['./wastage-of-commodity.component.css']
})
export class WastageOfCommodityComponent implements OnInit {
  
  checkBarcodes: string[];
  wastageItem: WastageItem;
  wastageItems: WastageItem[];
  wastageTypes: Dictionary[];

  newBarcode: string;

  new_title_txt: string;
  im_input_barcode_txt: string;
  im_sku_txt: string;
  im_num_txt: string;
  filter_reason_type_txt: string;
  filter_reason_txt: string;
  im_memo_txt: string;
  save_txt: string;
  cancel_txt: string;
  
  constructor(
    private location: Location,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private instockService: InstockService,
    private renderer: Renderer 
  ) { }

  ngOnInit() {
    this.baseInit();
    this.getLanguage();
  }

  baseInit() {
    this.wastageTypes = WASTAGETYPES;
    this.newBarcode = '';
    this.wastageItem = {
      'sku': '',
      'batch_cd': '',
      'num': 0,
      'wastage_type': 0,
      'reason': '',
      'memo': '',
      'log': []
    };
    this.checkBarcodes = new Array();
    this.wastageItems = new Array();
  }

  finishBarcode() {
    if (this.newBarcode == '') {
      return;
    }

    if (this.checkBarcodes.length > 0 && this.checkBarcodes.indexOf(this.newBarcode) > -1) {
      this.messageService.setData('此商品已经扫过了');
      this.router.navigate([{ outlets: { msg: ['msg'] } }]);
      this.newBarcode = '';
      return;
    }

    var temp = this.newBarcode.split("|");
    if (temp.length != 3 || temp[0] == '' || temp[1] == '' || temp[2] == '') {
      this.messageService.setData('barcode error! 请和系统人员确认');
      this.router.navigate([{ outlets: { msg: ['msg'] } }]);
      this.newBarcode = '';
      return;
    }

    if (this.wastageItem.sku == '') {
      this.wastageItem.sku = temp[0];
      this.wastageItem.batch_cd = temp[1];
    } else if (this.wastageItem.sku == temp[0]) {
      this.wastageItem.batch_cd = temp[1];
    } else {
      this.wastageItem.sku = temp[0];
      this.wastageItem.batch_cd = temp[1];
    }

    if (this.wastageItems.length == 0) {
      var tempItem = new WastageItem();
      tempItem.sku = this.wastageItem.sku;
      tempItem.batch_cd = this.wastageItem.batch_cd;
      tempItem.num = 1;
      tempItem.log = new Array();
      tempItem.log.push(this.newBarcode);
      this.wastageItems.push(tempItem);
      this.wastageItem.num = 1;
    } else {
      var i = 0;
      for (i = 0; i < this.wastageItems.length; i ++) {
        if (this.wastageItems[i].sku == this.wastageItem.sku && this.wastageItems[i].batch_cd == this.wastageItem.batch_cd) {
          break;
        }
      }

      if (i == this.wastageItems.length) {
        var tempItem = new WastageItem();
        tempItem.sku = this.wastageItem.sku;
        tempItem.batch_cd = this.wastageItem.batch_cd;
        tempItem.num = 1;
        tempItem.log = new Array();
        tempItem.log.push(this.newBarcode);
        this.wastageItems.push(tempItem);
        this.wastageItem.num = 1;
      } else {
        this.wastageItems[i].log.push(this.newBarcode);
        this.wastageItems[i].num = this.wastageItems[i].log.length;
        this.wastageItem.num = this.wastageItems[i].num;
      }
    }

    this.checkBarcodes.push(this.newBarcode);
    this.newBarcode = '';
  }

  save() {
  //console.log(this.wastageItems);
    let saveData = {};
    saveData['content'] = this.wastageItems;
    saveData['wastage_type'] = this.wastageItem.wastage_type;
    saveData['reason'] = this.wastageItem.reason;
    saveData['memo'] = this.wastageItem.memo;
    saveData['warehouse_id'] = this.localStorage.getValue('warehouseid');
    console.log(saveData);
    this.instockService.doSaveProductWastage(saveData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200 ) {
          this.router.navigate(['/instockcenter']);
        }
      }
    );
  }

  cancel() {
    console.log("this is cancel!");
    this.closeAddSpace();
  }

  closeAddSpace() {
    this.location.back();
  }

  getLanguage() {
    this.save_txt = this.languageService.get('save_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');
    this.new_title_txt = this.languageService.get('im_wastage_title_txt');

    this.im_input_barcode_txt = this.languageService.get('im_input_barcode_txt');
    this.im_sku_txt = this.languageService.get('im_sku_txt');
    this.im_num_txt = this.languageService.get('im_num_txt');
    this.filter_reason_type_txt = this.languageService.get('filter_reason_type_txt');
    this.filter_reason_txt = this.languageService.get('filter_reason_txt');
    this.im_memo_txt = this.languageService.get('im_memo_txt');
  }
}
