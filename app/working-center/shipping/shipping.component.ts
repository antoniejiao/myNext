import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

import { ShipPackage } from '../../entities/ship-package';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  @ViewChild('trailNumberInput') trailnumberinput;

  trackNumber: string;
  overflg: boolean = false;

  packages: ShipPackage[];
  ordercd: string;

  filter_No_txt: string;
  filter_package_txt: string;
  filter_trackNumber_txt: string;
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
    this.getLanguage();
  }

  init() {
    this.renderer.invokeElementMethod(this.trailnumberinput.nativeElement, 'focus');
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
        'bin': 'A0001',
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
        'bin': 'A0002',
        'images': [],
        'barcodes': []
      }
    ];
  }

  setTrail() {
    if (this.trackNumber == '') {
      return;
    }

    for (let i = 0; i < this.packages.length; i ++) {
      this.packages[i]['trail'] = this.trackNumber;
    }

    this.overflg = true;
  }

  doShipping() {
    console.log("gogogogo!!!!!");
  }

  getLanguage() {
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.filter_package_txt = this.languageService.get('filter_package_txt'); 
    this.filter_trackNumber_txt = this.languageService.get('filter_trackNumber_txt'); 
    this.btn_confirm_txt = this.languageService.get('btn_confirm_txt'); 
  }
}
