import { Component, OnInit, ElementRef, Renderer, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { InstockItem } from '../../entities/instock-item';

import { InstockService } from '../instock.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

@Component({
  selector: 'app-out-bound',
  templateUrl: './out-bound.component.html',
  styleUrls: ['./out-bound.component.css']
})
export class OutBoundComponent implements OnInit {
  @ViewChild('barcodeInput') barcodeinput;
  @ViewChild('wlCode') wlcodeinput;

  outBoundItem: InstockItem;
  newBarcode: string;
  needBarcode: boolean;
  outBoundItems: InstockItem[];
  checkBarcodes: string[];
  locationEditFlg: boolean;

  new_title_txt: string;
  im_input_location_code_txt: string;
  im_input_barcode_txt: string;
  im_sku_txt: string;
  im_num_txt: string;
  im_memo_txt: string;
  save_txt: string;
  cancel_txt: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private instockService: InstockService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.locationEditFlg = false;
    this.getLanguage();
    this.baseInit();
    this.needBarcode = this.localStorage.getValue('needBarcode') == 1 ? true : false;
    this.newBarcode = '';
    this.checkBarcodes = new Array();
    this.outBoundItems = new Array();
    if (this.outBoundItem.wareLocation == '') {
      this.locationEditFlg = false;
      this.renderer.invokeElementMethod(this.wlcodeinput.nativeElement, 'focus');
    } else {
      this.locationEditFlg = true;
      this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (this.outBoundItem.wareLocation == '') {
            this.locationEditFlg = false;
            this.renderer.invokeElementMethod(this.wlcodeinput.nativeElement, 'focus');
          } else {
            this.locationEditFlg = true;
            this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
          }
        }
      });
  }

  cancel() {
    console.log("this is cancel!");
    this.closeAddSpace();
  }

  baseInit() {
    this.outBoundItem = {
      sku: '',
      num: 0,
      wareLocation: '',
      memo: '',
      in_time: '',
      batch_cd: '',
      type: 2,
      production_date: '',
      expiration_date: '',
      shelf_life: 0,
      log: []
    };
  }

  closeAddSpace() {
    this.location.back();
  }

  save() {
    var outData = {};
    outData['warehouse_id'] = this.localStorage.getValue('warehouseid');
    outData['warelocation_cd'] = this.outBoundItem.wareLocation;
    outData['content'] = this.outBoundItems;
    console.log(outData);
    if (this.outBoundItems.length > 0) {
      this.instockService.doSkuOutBound(outData).subscribe(
        rtnData => {
          console.log(rtnData);
        }
      );
    }
  }

  finishLocation() {
    if (this.outBoundItem.wareLocation == '') {
      return;
    }
    this.locationEditFlg = true;
    this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
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
    console.log(temp[0] + "-" + temp[1] + "-" + temp[2]);
    if (this.outBoundItem.sku == '') {
      this.outBoundItem.sku = temp[0];
      this.outBoundItem.num = 1;
      this.outBoundItem.batch_cd = temp[1];
    } else if (this.outBoundItem.sku == temp[0]) {
      this.outBoundItem.num += 1;
      this.outBoundItem.batch_cd = temp[1];
    } else {
      this.messageService.setData('商品变化或条形码错误，请检查！');
      this.router.navigate([{ outlets: { msg:['msg'] }}]);
    }

    if (this.outBoundItems.length == 0) {
      var tempOutBoundItem = new InstockItem();
      tempOutBoundItem.sku = this.outBoundItem.sku;
      tempOutBoundItem.num = 1;
      tempOutBoundItem.type = this.outBoundItem.type;
      tempOutBoundItem.wareLocation = this.outBoundItem.wareLocation;
      tempOutBoundItem.memo = this.outBoundItem.memo;
      tempOutBoundItem.batch_cd = this.outBoundItem.batch_cd;
      tempOutBoundItem.production_date = this.outBoundItem.production_date;
      tempOutBoundItem.expiration_date = this.outBoundItem.expiration_date;
      tempOutBoundItem.shelf_life = this.outBoundItem.shelf_life;
      tempOutBoundItem.log = new Array();

      console.log(this.newBarcode);
      tempOutBoundItem.log.push(this.newBarcode);
      this.outBoundItems[0] = tempOutBoundItem;
    } else {
      var i = 0;
      for (i = 0; i < this.outBoundItems.length; i++) {
        if (this.outBoundItems[i].batch_cd == this.outBoundItem.batch_cd) {
          break;
        }
      }

      if (i == this.outBoundItems.length) {
        var tempOutBoundItem = new InstockItem();
        tempOutBoundItem.sku = this.outBoundItem.sku;
        tempOutBoundItem.num = 1;
        tempOutBoundItem.type = this.outBoundItem.type;
        tempOutBoundItem.wareLocation = this.outBoundItem.wareLocation;
        tempOutBoundItem.batch_cd = this.outBoundItem.batch_cd;
        tempOutBoundItem.memo = this.outBoundItem.memo;
        tempOutBoundItem.production_date = this.outBoundItem.production_date;
        tempOutBoundItem.expiration_date = this.outBoundItem.expiration_date;
        tempOutBoundItem.shelf_life = this.outBoundItem.shelf_life;

        tempOutBoundItem.log = new Array();
        tempOutBoundItem.log.push(this.newBarcode);
        this.outBoundItems.push(tempOutBoundItem);
      } else {
        this.outBoundItems[i].log.push(this.newBarcode);
        this.outBoundItems[i].num = this.outBoundItems[i].log.length;
      }
    }

    console.log(this.outBoundItems);
    this.checkBarcodes.push(this.newBarcode);
    this.newBarcode = '';
  }

  getLanguage() {
    this.new_title_txt = this.languageService.get('im_outbound_title_txt');
    this.im_input_location_code_txt = this.languageService.get('im_input_location_code_txt');
    this.im_input_barcode_txt = this.languageService.get('im_input_barcode_txt');
    this.im_sku_txt = this.languageService.get('im_sku_txt');
    this.im_num_txt = this.languageService.get('im_num_txt');
    this.im_memo_txt = this.languageService.get('im_memo_txt');
    this.save_txt = this.languageService.get('save_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');
  }
}
