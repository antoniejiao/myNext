import { Component, OnInit, ElementRef, Renderer, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { InstockItem } from '../../entities/instock-item';
import { CheckData } from '../../entities/check-data';
import { Item } from '../../entities/item';

import { DataMessageService } from '../../system-message/data-message.service';
import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {
  @ViewChild('barcodeInput') barcodeinput;
  @ViewChild('locationInput') locationinput;
  checkData: CheckData;
  checkingItems: InstockItem[];
  newChecking: InstockItem;
  checkBarcodes: string[];
  loseData;


  newBarcode: string;
  newLocation: string;

  singleItemFlg: boolean;
  
  new_title_txt: string;
  im_input_location_code_txt: string;
  im_input_barcode_txt: string;
  im_sku_txt: string;
  im_num_txt: string;
  im_location_txt: string;
  im_batch_txt: string;
  filter_No_txt: string;
  //im_shelf_life_txt: string;
  btn_pause_txt: string;
  save_txt: string;
  cancel_txt: string;

  constructor(
    private location: Location,
    private dataMessageService: DataMessageService,
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
    //this.startChecking();    
    if (this.newChecking.wareLocation == '') {
      this.renderer.invokeElementMethod(this.locationinput.nativeElement, 'focus');
    } else {
      this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
    }
  }
  
  ngOnDestroy() {
    this.checkingItems = null;
    console.log("this is checking-noDestroy");
  }

  ngAfterViewInit() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          console.log("checking-viewinit");
          if (this.newChecking.wareLocation == '') {
            this.renderer.invokeElementMethod(this.locationinput.nativeElement, 'focus');
          } else {
            this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
          }
        }
      }
    );
  }

  baseInit() {
    const type = +this.route.snapshot.paramMap.get('type');
    this.newChecking = {
      'sku': '',
      'num': 0,
      'wareLocation': '',
      'memo': '',
      'in_time': '',
      'batch_cd': '',
      'type': 0,
      'production_date': '',
      'expiration_date': '',
      'shelf_life': 0,
      'log': []
    };
    
    this.checkData = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'check_batch_cd': '',
      'check_location_cd': '',
      'created_dt': '',
      'start_time': '',
      'end_time': '',
      'id': 0,
      'oper_id': 0,
      'oper_name': '',
      'status': 0,
      'type': type,
      'updated_dt': '',
      'content': []
    }

    this.checkingItems = [];
    this.newLocation = '';
    this.newBarcode = '';
    this.checkBarcodes = new Array();
    if (type == 1) {
      this.singleItemFlg = true;
      this.startChecking();
    } else if (type == 10) {
      this.continueCheck();  
    } else {
      this.singleItemFlg = false;
      this.checkData.check_location_cd = this.route.snapshot.paramMap.get('code');
      this.startChecking();
    }
  }

  startChecking() {
    this.instockService.doStartChecking(this.checkData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.checkData.check_batch_cd = rtnData.data;
        }
      }
    );
  }

  cancel() {
    this.instockService.doCancelChecking(this.checkData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.checkData = null;
          this.location.back();
        } else {
          console.log("eeeeeeeerrorrrr!!!");
        }
      }
    );
  }

  pause() {
    if (this.checkingItems.length == 0) {
      return;
    }
    this.checkData.content = this.checkingItems;
    this.instockService.doPauseChecking(this.checkData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.location.back();
        } else {
          console.log("eeeeeeerrorrr!!!");
        }
      }
    );
  }

  continueCheck() {
    const check_cd = this.route.snapshot.paramMap.get('batch_cd');
    this.checkData.check_batch_cd = check_cd;
    this.instockService.doContinueChecking(this.checkData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.checkingItems = rtnData.data;
          this.singleItemFlg = rtnData.data.type == 1 ? true : false;
        }
      }
    );
  }

  save() {
    console.log(this.checkingItems);
    if (this.checkingItems.length == 0) {
      return;
    }
    this.checkData.content = this.checkingItems;
    this.instockService.doFinishChecking(this.checkData).subscribe(
      rtnData => {
        if (rtnData.code == 200) {
          this.location.back();
        } else if (rtnData.code == 400) {
          if (rtnData.errCode == 'stock_diff') {
            console.log(rtnData.data);
            this.dataMessageService.setData('please check the following data!', rtnData.data, this.checkData);
            this.router.navigate([{ outlets: { msg: ['datamsg'] } }]);
            /*********
            for (var key in rtnData.data) {
              console.log(key);
              for (var subkey in rtnData.data[key]) {
                console.log(subkey);
                console.log(rtnData.data[key][subkey]);
              }
            }
            *********/
          }
          
        } else {
          console.log("eeeeeeerrorrr!!!");
        }
      }
    );

  }

  finishLocation() {
    if (this.newLocation == '') {
      return;
    }
  
    this.newChecking.wareLocation = this.newLocation;
    if (!this.singleItemFlg) {
      this.newChecking.sku = '';
    }
    this.newChecking.num = 0;
    this.newChecking.batch_cd = '';
    this.renderer.invokeElementMethod(this.barcodeinput.nativeElement, 'focus');
    this.newLocation = '';

  }

  finishBarcode() {
    if (this.newChecking.wareLocation == '') {
      this.messageService.setData('未扫库位码，请先扫库位码！');
      this.router.navigate([{ outlets: { msg: ['msg'] } }]);
      this.newBarcode = '';
      this.newLocation = '';
      this.renderer.invokeElementMethod(this.locationinput.nativeElement, 'focus');
      return;
    }
    if (this.newBarcode == '' || this.newChecking.wareLocation == '') {
      return;
    }

    if (this.checkBarcodes.length > 0 && this.checkBarcodes.indexOf(this.newBarcode) > -1) {
      this.messageService.setData('此商品已经扫码过了');
      this.router.navigate([{ outlets: { msg: ['msg'] } }]);
      this.newBarcode = '';
      return;
    }

    var temp = this.newBarcode.split("|");
    if (temp.length != 3 || temp[0]=='' || temp[1]=='' || temp[2]=='') {
      this.messageService.setData('barcode error! 请和系统人员确认');
      this.router.navigate([{ outlets: { msg: ['msg'] } }]);
      this.newBarcode = '';
      return;
    }

    if (this.newChecking.sku == '') {
      this.newChecking.sku = temp[0];
      this.newChecking.num = 1;
      this.newChecking.batch_cd = temp[1];
    } else if (this.newChecking.sku == temp[0]) {
      this.newChecking.num += 1;
      this.newChecking.batch_cd = temp[1];
    } else { 
      if (this.singleItemFlg) {
        this.messageService.setData('商品错误！请检查或结束单品盘点！');
        this.router.navigate([{ outlets: { msg: ['msg'] } }]);
        this.newBarcode = '';
        return;
      } else {
        this.newChecking.sku = temp[0];
        this.newChecking.num = 1;
        this.newChecking.batch_cd = temp[1];
      }
    }

    if (this.checkingItems.length == 0) {
      var tempItem = new InstockItem();
      tempItem.sku = this.newChecking.sku;
      tempItem.num = 1;
      tempItem.type = this.newChecking.type;
      tempItem.wareLocation = this.newChecking.wareLocation;
      tempItem.batch_cd = this.newChecking.batch_cd;
      tempItem.log = new Array();
      tempItem.log.push(this.newBarcode);
      this.checkingItems.push(tempItem);
    } else {
      var i = 0;
      for (i = 0; i < this.checkingItems.length; i++) {
        if (this.checkingItems[i].wareLocation == this.newChecking.wareLocation &&
              this.checkingItems[i].sku == this.newChecking.sku &&
                this.checkingItems[i].batch_cd == this.newChecking.batch_cd) {
              break;
        }
      }

      if (i == this.checkingItems.length) {
        var tempItem = new InstockItem();
        tempItem.sku = this.newChecking.sku;
        tempItem.num = 1;
        tempItem.type = this.newChecking.type;
        tempItem.wareLocation = this.newChecking.wareLocation;
        tempItem.batch_cd = this.newChecking.batch_cd;
        tempItem.log = new Array();
        tempItem.log.push(this.newBarcode);
        this.checkingItems.push(tempItem);   
        console.log("here = " + i);
      } else {
        this.checkingItems[i].log.push(this.newBarcode);
        this.checkingItems[i].num = this.checkingItems[i].log.length;
        console.log("there = " + i);
      }

    }
    console.log(this.checkingItems);
    this.checkBarcodes.push(this.newBarcode);
    this.newBarcode = ''

  }

  getLanguage() {
    this.new_title_txt = this.languageService.get('im_inbound_title_txt');
    this.im_input_location_code_txt = this.languageService.get('im_input_location_code_txt');
    this.im_input_barcode_txt = this.languageService.get('im_input_barcode_txt');
    this.im_sku_txt = this.languageService.get('im_sku_txt');
    this.im_num_txt = this.languageService.get('im_num_txt');
    this.im_location_txt = this.languageService.get('im_location_txt');
    this.im_batch_txt = this.languageService.get('im_batch_txt');
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.btn_pause_txt = this.languageService.get('btn_pause_txt');
    this.save_txt = this.languageService.get('btn_checking_completed_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');

  }

}
