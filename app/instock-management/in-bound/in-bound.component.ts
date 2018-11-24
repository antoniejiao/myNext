import { Component, OnInit, ElementRef, Renderer, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { InstockItem } from '../../entities/instock-item';

import { InstockService } from '../instock.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

@Component({
  selector: 'app-in-bound',
  templateUrl: './in-bound.component.html',
  styleUrls: ['./in-bound.component.css']
})
export class InBoundComponent implements OnInit {
  @ViewChild('barcodeInput') barcodeinput;
  @ViewChild('wlCode') wlcodeinput; 
  inBoundItem: InstockItem;
  shelfLife: boolean;
  needBarcode: boolean;
  newBarcode: string;
  inBoundItems: InstockItem[];
  checkBarcodes: string[];
  locationEditFlg: boolean;

  new_title_txt: string;
  im_input_location_code_txt: string;
  im_input_barcode_txt: string;
  im_sku_txt: string;
  im_num_txt: string;
  im_production_date_txt: string;
  im_expiration_date_txt: string;
  im_shelf_life_txt: string;
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
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.locationEditFlg = false;
    this.baseInit();
    this.shelfLife = this.localStorage.getValue('shelfLife') == 1 ? true : false;
    this.needBarcode =this.localStorage.getValue('needBarcode') == 1 ? true : false;
    this.newBarcode = '';
    this.checkBarcodes = new Array();
    /*
    if (this.inBoundItem.wareLocation == '') {
      this.renderer.invokeElementMethod(this.wlcodeinput.nativeElement, 'focus');
    } else {
      this.locationEditFlg = true;
      this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
      }
      */
    this.renderer.invokeElementMethod(this.wlcodeinput.nativeElement, 'focus');
  }
  /* 
  ngAfterViewInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (this.inBoundItem.wareLocation == '') {
            this.locationEditFlg = false;
            this.renderer.invokeElementMethod(this.wlcodeinput.nativeElement, 'focus');
          } else {
            this.locationEditFlg = true;
            this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
          }
        }
      });
  }
  */
  baseInit() {
    this.inBoundItem = {
      sku: '',
      num: 0,
      wareLocation: '',
      memo: '',
      in_time: '',
      batch_cd: '',
      type: 1,
      production_date: '9999-12-31',
      expiration_date: '9999-12-31',
      shelf_life: 7300,
      log: []
    };
    this.inBoundItems = new Array();
  }

  cancel() {
    console.log("this is cancel!");
    this.closeAddSpace();
  }

  closeAddSpace() {
    this.location.back();
  }

  save() {
    var inData = {};
    inData['warehouse_id'] = this.localStorage.getValue('warehouseid');
    inData['warelocation_cd'] = this.inBoundItem.wareLocation;
    inData['content'] = this.inBoundItems;
    console.log(inData);
    if (this.inBoundItems.length > 0) {
      this.instockService.doSkuInBound(inData).subscribe(
        rtnData => {
          console.log(rtnData);
        }
      );
    }
  }

  finishLocation() {
    if (this.inBoundItem.wareLocation == '') {
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
    if (this.inBoundItem.sku == '') {
      this.inBoundItem.sku = temp[0];
      this.inBoundItem.num = 1;
      this.inBoundItem.batch_cd = temp[1];
    } else if (this.inBoundItem.sku == temp[0]) {
      this.inBoundItem.num += 1;  
      this.inBoundItem.batch_cd = temp[1];
    } else {
      this.messageService.setData('商品变化或条码错误，请检查！');
      this.router.navigate([{ outlets: { msg:['msg'] }}]);    
    }

    if (this.inBoundItems.length == 0) {
      var tempInBoundItem = new InstockItem();
      tempInBoundItem.sku = this.inBoundItem.sku;
      tempInBoundItem.num = 1;
      tempInBoundItem.type = this.inBoundItem.type;
      tempInBoundItem.wareLocation = this.inBoundItem.wareLocation;
      tempInBoundItem.batch_cd = this.inBoundItem.batch_cd;
      tempInBoundItem.memo = this.inBoundItem.memo;
      tempInBoundItem.production_date = this.inBoundItem.production_date;
      tempInBoundItem.expiration_date = this.inBoundItem.expiration_date;
      tempInBoundItem.shelf_life = this.inBoundItem.shelf_life;
      tempInBoundItem.log = new Array();
      tempInBoundItem.log.push(this.newBarcode);
      this.inBoundItems[0] = tempInBoundItem;
    } else {
    //this.inBoundItems[0].num = this.inBoundItem.num;
    //this.inBoundItems[0].log.push(this.newBarcode);
      var i = 0;
      for (i = 0; i < this.inBoundItems.length; i++) {
        if (this.inBoundItems[i].batch_cd == this.inBoundItem.batch_cd) {
          console.log("i=" + i + "#|#ibatch=" + this.inBoundItems[i].batch_cd + "#|#this.batch=" + this.inBoundItem.batch_cd);
          break;
        }
      }

      if (i == this.inBoundItems.length) {
        var tempInBoundItem = new InstockItem();
        tempInBoundItem.sku = this.inBoundItem.sku;
        tempInBoundItem.num = 1;
        tempInBoundItem.type = this.inBoundItem.type;
        tempInBoundItem.wareLocation = this.inBoundItem.wareLocation;
        tempInBoundItem.batch_cd = this.inBoundItem.batch_cd;
        tempInBoundItem.memo = this.inBoundItem.memo;
        tempInBoundItem.production_date = this.inBoundItem.production_date;
        tempInBoundItem.expiration_date = this.inBoundItem.expiration_date;
        tempInBoundItem.shelf_life = this.inBoundItem.shelf_life;
        tempInBoundItem.log = new Array();
        tempInBoundItem.log.push(this.newBarcode);
        this.inBoundItems.push(tempInBoundItem);       
      } else {
        this.inBoundItems[i].log.push(this.newBarcode);
        this.inBoundItems[i].num = this.inBoundItems[i].log.length;
      }
    }


    console.log(this.inBoundItems);
    this.checkBarcodes.push(this.newBarcode);
    this.newBarcode = '';
    
  }

  onKey(event: any) {
    console.log(event.target.value+'=x');
  }

  getLanguage() {
    this.new_title_txt = this.languageService.get('im_inbound_title_txt');
    this.im_input_location_code_txt = this.languageService.get('im_input_location_code_txt');
    this.im_input_barcode_txt = this.languageService.get('im_input_barcode_txt');
    this.im_sku_txt = this.languageService.get('im_sku_txt');
    this.im_num_txt = this.languageService.get('im_num_txt');
    this.im_production_date_txt = this.languageService.get('im_production_date_txt');
    this.im_expiration_date_txt = this.languageService.get('im_expiration_date_txt');
    this.im_shelf_life_txt = this.languageService.get('im_shelf_life_txt');
    this.im_memo_txt = this.languageService.get('im_memo_txt');
    this.save_txt = this.languageService.get('save_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');
  }
}
