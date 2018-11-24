import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

import { InstockItem } from '../../entities/instock-item';

@Component({
  selector: 'app-order-out-bound',
  templateUrl: './order-out-bound.component.html',
  styleUrls: ['./order-out-bound.component.css']
})
export class OrderOutBoundComponent implements OnInit {
  @ViewChild('barcodeInput') barcodeinput;
  @ViewChild('locationInput') locationinput;
  orderItems = [];

  checkBarcodes: string[];
  outBoundItems: InstockItem[];

  total: number = 0;

  newLocation: string;
  newBarcode: string;
  overflg: boolean = false;
  isBackorder: boolean = false; //backorder
  isSameBO: boolean = false;


  title_txt: string;
  filter_itemname_txt: string;
  filter_sku_txt: string;
  filter_status_txt: string;
  filter_No_txt: string;
  filter_num_txt: string;
  filter_approved_txt: string;
  filter_arithmetic_txt: string;

  btn_sendtoCSStaff_txt: string;
  btn_createbackorder_txt: string;
  btn_outbound_txt: string;
  //btn_go_txt: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.init();
    this.getLanguage();
    this.getData();
  }

  init() {
    this.renderer.invokeElementMethod(this.locationinput.nativeElement, 'focus');
    this.checkBarcodes = new Array();
    this.outBoundItems = new Array();
    
    this.orderItems = [
      {
        'name': '可口可乐',
        'status': '1',
        'sku': 'tp00101',
        'weight': 13,
        'num': 5
      },
      {
        'name': '百事可乐',
        'status': '0',
        'sku': 'tp00102',
        'weight': 12,
        'num': 3
      }
    ];
  }

  getData() {
    for (let i=0; i < this.orderItems.length; i ++) {
      this.orderItems[i]['approved'] = 0;
      this.orderItems[i]['minus'] = this.orderItems[i]['num'];
      this.orderItems[i]['log'] = new Array();
      this.total += this.orderItems[i]['num'];
      if (!this.isBackorder && this.orderItems[i]['status'] == 0) {
        this.isBackorder = true;
      }
    }
    console.log(this.orderItems);
  }

  resetLocation() {
    this.newLocation = '';
  }

  finishLocation() {
    if (this.newLocation == '') {
      return;
    }
  
    //this.newChecking.wareLocation = this.newLocation;
    
    this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
    //this.newLocation = '';

  }

  finishBarcode() {
    if (this.newBarcode == '') {
      return;
    }
  
    if (this.checkBarcodes.length > 0 && this.checkBarcodes.indexOf(this.newBarcode) > -1) {
      this.messageService.setData('此商品已经扫过，请不要重复！');
      this.router.navigate([{ outlets: { msg: ['msg'] } }]);
      this.newBarcode = '';
      return;
    }

    var temp = this.newBarcode.split("|");
    var i = 0;
    for (i = 0; i < this.orderItems.length; i ++) {
      if (temp[0] == this.orderItems[i]['sku']) {  // find right SKU
        if (this.orderItems[i]['minus'] == 0) {
          this.messageService.setData('This SKU is enough, please not out-bound');
          this.router.navigate([{ outlets: { msg: ['msg'] } }]);
          this.newBarcode = '';
          return;
        }
        this.orderItems[i]['approved'] += 1;
        this.orderItems[i]['minus'] = this.orderItems[i]['num'] - this.orderItems[i]['approved'];
        this.total -= 1;

        // to do 做出库数组
        this.setOutBoundData(temp[0], temp[1], this.newBarcode);
        if (this.total == 0) {
          this.overflg = true;
        }
        break;
      }
    }

    if (i == this.orderItems.length) {
      this.messageService.setData('Error Product!');
      this.router.navigate([{ outlets: { msg: ['msg'] } }]);
      this.newBarcode = '';
      return;
    }
    
    this.isSameBO = this.setIsSameBO();

    console.log(this.isSameBO);
    this.checkBarcodes.push(this.newBarcode);
    this.newBarcode = '';
  }

  setOutBoundData(sku: string, batch_cd: string, barcode: string) {
    if (this.outBoundItems.length == 0) {
      var tempOutBoundItem = new InstockItem();
      tempOutBoundItem.sku = sku;
      tempOutBoundItem.num = 1;
      tempOutBoundItem.type = 2;
      tempOutBoundItem.wareLocation = this.newLocation;
      tempOutBoundItem.memo = 'ordercd';
      tempOutBoundItem.batch_cd = batch_cd;
      tempOutBoundItem.production_date = '';
      tempOutBoundItem.expiration_date = '';
      tempOutBoundItem.shelf_life = 0;
      tempOutBoundItem.log = new Array();

      tempOutBoundItem.log.push(barcode);
      this.outBoundItems[0] = tempOutBoundItem;
    } else {
      var i = 0;
      for (i = 0; i < this.outBoundItems.length; i++) {
      if (this.outBoundItems[i].sku == sku 
           && this.outBoundItems[i].batch_cd == batch_cd 
            && this.outBoundItems[i].wareLocation == this.newLocation
          ) {
          break;
        }
      }

      if (i == this.outBoundItems.length) {
        var tempOutBoundItem = new InstockItem();
        tempOutBoundItem.sku = sku;
        tempOutBoundItem.num = 1;
        tempOutBoundItem.type = 2;
        tempOutBoundItem.wareLocation = this.newLocation;
        tempOutBoundItem.batch_cd = batch_cd;
        tempOutBoundItem.memo = 'ordercd';
        tempOutBoundItem.production_date = '';
        tempOutBoundItem.expiration_date = '';
        tempOutBoundItem.shelf_life = 0;

        tempOutBoundItem.log = new Array();
        tempOutBoundItem.log.push(barcode);
        this.outBoundItems.push(tempOutBoundItem);
      } else {
        this.outBoundItems[i].log.push(barcode);
        this.outBoundItems[i].num = this.outBoundItems[i].log.length;
      }
    }
    console.log(this.outBoundItems);
  }

  setIsSameBO() {
    for (let i = 0; i < this.orderItems.length; i++) {
        console.log(this.orderItems[i]['status']);
        console.log(this.orderItems[i]['minus']);
      if (this.orderItems[i]['status'] == 1 && this.orderItems[i]['minus'] > 0) {
        return false;
      }
    }

    return true;
  }

  sendToCSStaff() {

  }

  createBackorder() {

  }

  outBound() {

  }

  getLanguage() {
    this.title_txt = this.languageService.get('dbd_do_task_txt');
    this.filter_itemname_txt = this.languageService.get('filter_itemname_txt');
    this.filter_sku_txt = this.languageService.get('filter_sku_txt');
    this.filter_status_txt = this.languageService.get('filter_status_txt'); 
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.filter_num_txt = this.languageService.get('filter_num_txt'); 
    this.filter_approved_txt = this.languageService.get('filter_approved_txt'); 
    this.filter_arithmetic_txt = this.languageService.get('filter_arithmetic_txt'); 
    this.btn_sendtoCSStaff_txt =  this.languageService.get('btn_senttoCSStaff_txt'); 
    this.btn_createbackorder_txt = this.languageService.get('btn_createbackorder_txt'); 
    this.btn_outbound_txt = this.languageService.get('btn_outbound_txt');  
    //this.btn_go_txt = this.languageService.get('btn_go_txt'); 
  }
}
