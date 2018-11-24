import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

import { ShipPackage } from '../../entities/ship-package';

@Component({
  selector: 'app-package-in-ship-area',
  templateUrl: './package-in-ship-area.component.html',
  styleUrls: ['./package-in-ship-area.component.css']
})
export class PackageInShipAreaComponent implements OnInit {
  @ViewChild('barcodeInput') packageinput;
  @ViewChild('locationInput') locationinput;

  total: number = 0;

  newLocation: string = '';
  newBarcode: string = '';
  overflg: boolean = false;

  packages: ShipPackage[];
  ordercd: string;


  im_input_location_code_txt: string;
  filter_package_txt: string;
  filter_No_txt: string;
  filter_location_txt: string;
  btn_confirm_txt: string;

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
    this.getData();
    this.getLanguage();
  }

  init() {
    this.renderer.invokeElementMethod(this.locationinput.nativeElement, 'focus');
    this.ordercd = 'SO100001';
    this.packages = [
      {
        'pno': 1,
        'name': 'P1',
        'code': 'SO100001-1',
        'ordercd': this.ordercd,
        'palletType': 1,
        'showType': 'small',
        'length': 48,
        'width': 42,
        'height': 40,
        'weight': 80,
        'bin': '',
        'images': [],
        'barcodes': []
      },
      {
        'pno': 2,
        'name': 'P2',
        'code': 'SO100001-2',
        'ordercd': this.ordercd,
        'palletType': 2,
        'showType': 'smaller',
        'length': 94,
        'width': 42,
        'height': 50,
        'weight': 180,
        'bin': '',
        'images': [],
        'barcodes': []
      }
    ];
  }

  getData() {
    for (let i = 0; i < this.packages.length; i ++) {
      this.packages[i]['bin'] = '';
      this.total += 1;
    }
  }

  completeIn() {
    console.log(this.packages);
  }

  resetLocation() {
    this.newLocation = '';
  }

  finishLocation() {
    if (this.newLocation == '') {
      return;
    }

    this.renderer.invokeElementMethod(this.packageinput.nativeElement, 'focus');
  }

  finishBarcode() {
    if (this.newLocation == '') {
      this.renderer.invokeElementMethod(this.locationinput.nativeElement, 'focus');
      this.newBarcode = '';
    }

    if (this.newBarcode == '') {
      return;
    }

    for (let i = 0; i < this.packages.length; i ++) {
      if (this.newBarcode == this.packages[i]['code']) {
        this.packages[i]['bin'] = this.newLocation;
        this.total -= 1;
        break;
      }
    }
    
    if (this.total == 0) {
      this.overflg = true;
    }

    this.newBarcode = '';
  }

  getLanguage() {
    this.filter_package_txt = this.languageService.get('filter_package_txt'); 
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.im_input_location_code_txt = this.languageService.get('im_input_location_code_txt'); 
    this.filter_location_txt = this.languageService.get('filter_location_txt'); 
    this.btn_confirm_txt = this.languageService.get('btn_confirm_txt'); 
  }
}
