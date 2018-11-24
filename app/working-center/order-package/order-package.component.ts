import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

import { ShipPackage } from '../../entities/ship-package';

@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.css']
})
export class OrderPackageComponent implements OnInit {
  @ViewChild('barcodeInput') barcodeinput;
  ordercd: string = '100001';
  isAssemble: boolean = false;

  orderItems = [];
  packages: ShipPackage[];
  pallets = [];

  checkBarcodes: string[];

  currentPackage: number;
  currentPalletType: number;
  currentLength: number;
  currentWidth: number;
  currentHeight: number;
  currentLimitHeight: number;
  currentWeight: number;
  isSetHeight: boolean = false;
  isSetCurPallet: boolean = false;
  isSetCurWeight: boolean = false;
  isPalletInput: boolean = false;
  editRow: number = 0;

  newBarcode: string;
  total: number = 0;
  overflg: boolean = false;

  title_txt: string;
  filter_itemname_txt: string;
  filter_sku_txt: string;
  filter_status_txt: string;
  filter_No_txt: string;
  filter_num_txt: string;
  filter_approved_txt: string;
  filter_arithmetic_txt: string;
  filter_actions_txt: string;
  filter_package_txt: string;
  filter_pallet_txt: string;
  filter_height_txt: string;
  filter_weight_txt: string;

  btn_toShipArea_txt: string;
  btn_photo_txt: string;
  btn_print_txt: string;

  ttl_setSize_txt: string;

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
    this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
    this.checkBarcodes = new Array();
    this.packages = new Array();
    this.currentPackage = 1;
    this.currentPalletType = 1;
    this.currentLength = 0;
    this.currentWidth = 0;
    this.currentHeight = 0;
    this.currentLimitHeight = 0;
    this.currentWeight = 0;

    let package1 = new ShipPackage();
    package1 = {
      'pno': this.currentPackage,
      'name': 'P' + this.currentPackage,
      'code': this.ordercd + '-' + this.currentPackage,
      'ordercd': '',
      'palletType': 1,
      'showType': '',
      'length': 0,
      'width': 0,
      'height': 0,
      'weight': 0,
      'bin': '',
      'images': [],
      'barcodes': []

    }
    this.packages.push(package1);

    this.orderItems = [
      {
        'name': '可口可乐',
        'status': '1',
        'sku': 'tp00101',
        'weight': 13,
        'num': 1
      }
      /*    ,
      {
        'name': '百事可乐',
        'status': '0',
        'sku': 'tp00102',
        'weight': 12,
        'num': 3
        } */
    ];

    this.pallets = [
      {'key': 0, 'name': 'others', 'length': 0, 'width': 0, 'height1': 0, 'height2': 0},
      {'key': 1, 'name': 'small', 'length': 48, 'width':42, 'height1': 74, 'height2': 81},
      {'key': 2, 'name': 'smaller', 'length': 94, 'width': 42, 'height1': 54, 'height2': 81},
      {'key': 3, 'name': 'middle', 'length': 102, 'width': 42, 'height1': 54, 'height2': 81},
      {'key': 4, 'name': 'big', 'length': 102, 'width': 52, 'height1': 54, 'height2': 81}
    ];
  }

  getData() {
    for (let i = 0; i < this.orderItems.length; i ++) {
      this.total += this.orderItems[i]['num'];
      this.orderItems[i]['approved'] = 0;
      this.orderItems[i]['logs'] = new Array();
      //this.orderItems[i]['logs'].push(this.currentPackage);
    }
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
          this.messageService.setData('This SKU is enough, please not pack it!!!');
          this.router.navigate([{ outlets: { msg: ['msg'] } }]);
          this.newBarcode = '';
          return;
        }
        this.orderItems[i]['approved'] += 1;
        //this.orderItems[i]['minus'] = this.orderItems[i]['num'] - this.orderItems[i]['approved'];
        this.total -= 1;

        // to do 做出库数组
        this.setPackageBarcode(this.newBarcode);
        //this.currentWeight += this.orderItems[i]['weight']; 此数据是称重的，不需计算

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

    this.checkBarcodes.push(this.newBarcode);
    this.newBarcode = '';
  }

  setPackageBarcode(barcode: string): void {
    let i = 0;
    for (i = 0; i < this.packages.length; i ++) {
      if (this.packages[i].pno == this.currentPackage) {
        this.packages[i]['barcodes'].push(barcode);
        break;
      }
    }
  }

  modifyPalletType(ikey) {
    this.packages[ikey]['palletType'] = this.currentPalletType;
    this.packages[ikey]['showType'] = this.getPalletValueByKey(this.currentPalletType, 'name');
    this.packages[ikey]['length'] = this.getPalletValueByKey(this.currentPalletType, 'length');
    this.packages[ikey]['width'] = this.getPalletValueByKey(this.currentPalletType, 'width');
    this.currentLimitHeight = this.isAssemble? this.getPalletValueByKey(this.currentPalletType, 'height1') : this.getPalletValueByKey(this.currentPalletType, 'height2');

    this.isSetCurPallet = true;
    if (this.currentPalletType == 0) {
      this.isPalletInput = true;
      this.editRow = ikey;
    }
  }

  handleOk() {
    let ikey = this.editRow;
    this.editRow = 0;
    this.packages[ikey]['length'] = this.currentLength;
    this.packages[ikey]['width'] = this.currentWidth;
    this.isPalletInput = false;
  }

  palletChanged(ikey) {
    this.packages[ikey]['palletType'] = this.currentPalletType;
    if (this.currentPalletType != 0) {
      this.packages[ikey]['showType'] = this.getPalletValueByKey(this.currentPalletType, 'name');
      this.packages[ikey]['length'] = this.getPalletValueByKey(this.currentPalletType, 'length');
      this.packages[ikey]['width'] = this.getPalletValueByKey(this.currentPalletType, 'width');
      this.currentLimitHeight = this.isAssemble? this.getPalletValueByKey(this.currentPalletType, 'height1') : this.getPalletValueByKey(this.currentPalletType, 'height2');
    }
    this.isSetCurPallet = true;
  }

  getPalletValueByKey(key: number, value: string) {
    for (let i = 0; i < this.pallets.length; i ++) {
      if (this.pallets[i].key == key) {
        return this.pallets[i][value];
      }
    }
    return 0;
  }

  setCurrentHeight(ikey) {
    this.palletChanged(ikey);
    this.packages[ikey]['height'] = this.currentHeight;
    this.isSetHeight = true;

  }

  setCurrentWeight(ikey) {
    this.packages[ikey]['weight'] = this.currentWeight;
    this.isSetCurWeight = true;
  }

  addPackage() {
    this.currentPackage = this.packages.length + 1;
    this.currentPalletType = 1;
    this.currentLength = 0;
    this.currentWidth = 0;
    this.currentHeight = 0;
    this.currentLimitHeight = 0;
    this.currentWeight = 0;
    this.isSetHeight = false;
    this.isSetCurPallet = false;
    this.isSetCurWeight = false;

    let tp = new ShipPackage();
    tp = {
      'pno': this.currentPackage,
      'name': 'P' + this.currentPackage,
      'code': this.ordercd + '-' + this.currentPackage,
      'ordercd': '',
      'palletType': 0,
      'showType': '',
      'length': 0,
      'width': 0,
      'height': 0,
      'weight': 0,
      'bin': '',
      'images': [],
      'barcodes': []

    }
    this.packages.push(tp);
    //console.log(this.packages);
   
  }

  editPackageType(ikey) {
    this.currentPackage = this.packages[ikey].pno;
    this.isSetCurPallet = false;

    this.currentPalletType = this.packages[ikey].palletType;
    this.currentLength = this.packages[ikey].length;
    this.currentWidth = this.packages[ikey].width;
    this.currentHeight = this.packages[ikey].height;

    this.currentWeight = this.packages[ikey].weight;

    this.isSetHeight = true;
    this.isSetCurWeight = true;
  }

  editPackageHeight(ikey) {
    this.currentPackage = this.packages[ikey].pno;
    this.currentPalletType = this.packages[ikey].palletType;
    this.currentLength = this.packages[ikey].length;
    this.currentWidth = this.packages[ikey].width;
    this.currentHeight = this.packages[ikey].height;

    this.currentWeight = this.packages[ikey].weight;
    this.isSetHeight = false;
    this.isSetCurWeight = true;
    this.isSetCurPallet = true;
  }

  editPackageWeight(ikey) {
    this.currentPackage = this.packages[ikey].pno;
    this.currentPalletType = this.packages[ikey].palletType;
    this.currentLength = this.packages[ikey].length;
    this.currentWidth = this.packages[ikey].width;
    this.currentHeight = this.packages[ikey].height;

    this.currentWeight = this.packages[ikey].weight;
    this.isSetCurWeight = false;
    this.isSetHeight = true;
    this.isSetCurPallet = true;
  }

  toWaitShip() {
    console.log(this.packages);
    this.router.navigate(['/dashboard/workonajob/orderinshiparea']);
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
    this.filter_actions_txt = this.languageService.get('filter_actions_txt');
    this.filter_package_txt = this.languageService.get('filter_package_txt'); 
    this.filter_pallet_txt = this.languageService.get('filter_pallet_txt'); 
    this.filter_height_txt = this.languageService.get('filter_height_txt'); 
    this.filter_weight_txt = this.languageService.get('filter_weight_txt'); 
    this.btn_toShipArea_txt =  this.languageService.get('btn_toShipArea_txt'); 
    this.btn_photo_txt = this.languageService.get('btn_photo_txt'); 
    this.btn_print_txt = this.languageService.get('btn_print_txt');  
    this.ttl_setSize_txt = this.languageService.get('ttl_setSize_txt'); 
  }
}
