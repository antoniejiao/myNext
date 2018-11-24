import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd';

import { Space } from '../space';

import { slideInDownAnimation } from '../../animations';
import { Dictionary, YESORNO, SPACETYPES, STATUSARRAYS, TEMPERATURETYPES, SHELFLOCATIONTYPES } from '../../dictionary';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-add-space',
  templateUrl: './add-space.component.html',
  styleUrls: ['./add-space.component.css'],
  animations: [ slideInDownAnimation ]
})
export class AddSpaceComponent implements OnInit {
  //@HostBinding('@routeAnimation') routeAnimation = true;
  //@HostBinding('style.display') display = 'block';
  //@HostBinding('style.position') position = 'absolute';
  @Input() type: number;
  @Input() fatherId: number;

  types = SPACETYPES;
  temperatureTypes = TEMPERATURETYPES;
  statusArrays = STATUSARRAYS;
  yesOrNo = YESORNO;
  createShelfLocationType = SHELFLOCATIONTYPES;

  space: Space;
  //type: number;
  //fatherId: number;

  defaultLocationType: number;

  new_title_txt: string;
  new_code_txt: string;
  new_name_txt: string;
  new_type_txt: string;
  new_temperature_txt: string;
  new_status_txt: string;
  new_row_txt: string;
  new_column_txt: string;
  set_default_location_txt: string;

  save_txt: string;
  cancel_txt: string;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private location: Location,
    private languageService: LanguageServiceService,
    private warehouseService: WarehouseService,
    private localStorageService: LocalStorageService,
    private modal: NzModalRef
    ) { }

  ngOnInit() {
    //this.type = +this.route.snapshot.paramMap.get('type');
    //this.fatherId = +this.route.snapshot.paramMap.get('fatherid');
    console.log("addddddd........"+this.type + "..."+this.fatherId);
    this.getLanguage();
    this.getBaseInfo();
  }

  getBaseInfo() {

    this.space =  { 
      id: 0, 
      space_name: '', 
      space_code: '', 
      barcode: '', 
      data_type: '', 
      spaces_type: '',
      spaces_type_value: '',
      temperature_type: '', 
      space_status: '', 
      belongtospace: 0, 
      belongtolocation: 0, 
      warehouse_id: this.localStorageService.getValue('warehouseid'),
      shelf_row: 0,
      shelf_column: 0,
      creator_name: 'joe', 
      create_time: '2018-08-18 12:00:08' };

    this.defaultLocationType = 1;

  }


  cancel() {
    console.log("this is cancel!");
    this.closeAddSpace();
  }

  closeAddSpace() {
  //this.router.navigate(['../', { outlets: { new_space: null }}]);
  //this.router.navigate(['/dashboard/base-management']);
  //this.location.back();
    this.modal.destroy({ data: '' });
  }

  save() {
    if ( this.type == 1 ) {
      this.space.data_type = '1';
      this.space.warehouse_id = this.fatherId;
    } else if ( this.type == 2 ) {
      this.space.data_type = '2';
      this.space.belongtospace = this.fatherId;
    } else if ( this.type == 3 ) {
      this.space.data_type = '3';
      this.space.belongtolocation = this.fatherId;
      this.space['defaultLocationType'] = this.defaultLocationType;
    }

    if (this.space.space_name != '') {
      this.warehouseService.addSpace(this.space).subscribe(
        
          rtnData => {
            if (rtnData.code == 200) {
              this.space = rtnData.data;
              this.modal.destroy();
            }

          });
    }

    //console.log(this.space.spaceName+'|||'+this.space.spaceStatus);
    console.log(this.space + '|||');
  }

  getLanguage() {
    if (this.type == 1) {
      this.new_title_txt = this.languageService.get('space_title_txt');
      this.new_code_txt = this.languageService.get('space_code_txt');
      this.new_name_txt = this.languageService.get('space_name_txt');
      this.new_type_txt = this.languageService.get('space_type_txt');
      this.new_temperature_txt = this.languageService.get('space_temperature_txt');
      this.new_status_txt = this.languageService.get('space_status_txt');
    } else if (this.type == 2) {
      this.new_title_txt = this.languageService.get('position_title_txt');
      this.new_code_txt = this.languageService.get('position_code_txt');
      this.new_name_txt = this.languageService.get('position_name_txt');
      this.new_status_txt = this.languageService.get('position_status_txt');
    } else if (this.type == 3) {
      this.new_title_txt = this.languageService.get('shelf_title_txt');
      this.new_code_txt = this.languageService.get('shelf_code_txt');
      this.new_name_txt = this.languageService.get('shelf_name_txt');
      this.new_status_txt = this.languageService.get('shelf_status_txt');
      this.new_row_txt = this.languageService.get('shelf_row_txt');
      this.new_column_txt = this.languageService.get('shelf_column_txt');
      this.set_default_location_txt = this.languageService.get('set_default_location_txt');
    }
    this.save_txt = this.languageService.get('save_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');
  }

}
