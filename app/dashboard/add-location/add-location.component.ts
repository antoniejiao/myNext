import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WareLocation } from '../ware-location';

import { slideInDownAnimation } from  '../../animations';

import { Dictionary, STATUSARRAYS } from '../../dictionary';

import { WarehouseService } from '../warehouse.service';
import { LanguageServiceService } from '../../language-service.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
  animations: [ slideInDownAnimation ]
})
export class AddLocationComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  wareLocation: WareLocation;
  fatherId: number;

  statusArrays = STATUSARRAYS;

  new_title_txt: string;
  new_code_txt: string;
  new_status_txt: string;
  save_txt: string;
  cancel_txt: string;

  constructor(
    private languageService: LanguageServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.fatherId = +this.route.snapshot.paramMap.get('fatherid');
    this.baseInit();
    this.getLanguage();
  }
  
  baseInit() {
    this.wareLocation = {
      location_id : 0,
      location_code : '',
      shelf_id : 0,
      position_id : this.fatherId,
      barcode : '',
      status : '',
      items : []
    };
    
  }

  cancel() {
    this.location.back();
  }

  save() {
    if (this.wareLocation.location_code != '') {
      this.warehouseService.addPositionLocation(this.wareLocation).subscribe(
        rtnData => {
          if (rtnData.code == 200) {
            this.wareLocation = rtnData.data;
          }
        }
      );
    }
    console.log(this.location);
  } 

  getLanguage() {
    this.new_title_txt = this.languageService.get('location_title_txt');
    this.new_code_txt = this.languageService.get('location_code_txt');
    this.new_status_txt = this.languageService.get('location_status_txt');
    this.save_txt = this.languageService.get('save_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');
  }
}
