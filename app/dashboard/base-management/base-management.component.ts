import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, of, Subscription } from 'rxjs';

import { Space } from '../space';
import { WareLocation } from '../ware-location';

import { AddSpaceComponent } from '../add-space/add-space.component';
import { ShelfDetailComponent } from '../shelf-detail/shelf-detail.component';
import { AddLocationComponent } from '../add-location/add-location.component';

import { WarehouseService } from '../warehouse.service';
import { LocalStorageService } from '../../local-storage.service';
import { LanguageServiceService } from '../../language-service.service';

@Component({
  selector: 'app-base-management',
  templateUrl: './base-management.component.html',
  styleUrls: ['./base-management.component.css']
})
export class BaseManagementComponent implements OnInit {
  subscript: Subscription;  


  warehouse_id: number;
  warehouse_name: string;
  warehouse_status: string;
  space_name: string;
  space_status: string;
  spaces: any;
  positions: Space[];

  position_name: string;
  position_status: string;
  shelves: Space[];
  wareLocations: WareLocation[];

  type: number;
  currentId: number; //当前展示区域的id

  assemblySpace: Space;
  stockUpSpace: Space;
  packSpace: Space;
  deliverySpace: Space;
  partSpace: Space; 
  shippingSpace: Space;
  allocationSpace: Space;


  //以下定义页面文本
  save_txt: string;
  cancel_txt: string;
  go_back_txt: string;
  detail_txt: string;
  start_txt: string;
  stop_txt: string;
  space_title_txt: string;
  position_title_txt: string;
  shelf_title_txt: string;
  location_title_txt: string;
  set_default_location_txt: string;

  bm_assembly_space_txt: string;
  bm_stockup_space_txt: string;
  bm_packs_space_txt: string;
  bm_delivery_space_txt: string;
  bm_parts_space_txt: string;
  bm_shipping_space_txt: string;
  bm_transfer_space_txt: string;

  constructor(
      private warehouseService: WarehouseService,
      private localStorage: LocalStorageService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private languageService: LanguageServiceService,
      private modalService: NzModalService
  ) {   }

  ngOnInit() {
    //this.warehouse_name = this.localStorage.get('warehousename');
    //this.localStorage.remove('user');
    console.log("bm-ngoninit!");

    this.subscript = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      //console.log("event = " + event);
        this.spaces = null;
        this.positions = null;
        this.shelves = null;
        this.wareLocations = null;
        this.getSpaces();
      }
      //console.log(event);
    });
    this.getSpaces();
    this.getLanguage();
  }

  ngOnDestroy() {
  //this.router.events.unsubscribe();
    console.log("bm-ngOnDestroy");
    this.subscript.unsubscribe();
  }

  getSpaces(): void {
    const type = +this.route.snapshot.paramMap.get('type');
    const id = +this.route.snapshot.paramMap.get('id');
    this.currentId = id;
    this.type = type;
    if (type == 1 ) {
      this.warehouseService.getSpaces(id).subscribe(
      warehouseInfo => {
          if (warehouseInfo.code == 200) {
            this.warehouse_name = warehouseInfo.data.warehouseName;
            this.warehouse_status = warehouseInfo.data.warehouseStatus;
            this.spaces = warehouseInfo.data;
            this.assemblySpace = warehouseInfo.data.assemblySpace ? warehouseInfo.data.assemblySpace : null;
            this.stockUpSpace = warehouseInfo.data.stockUpSpace ? warehouseInfo.data.stockUpSpace: null;
            this.packSpace = warehouseInfo.data.packSpace ? warehouseInfo.data.packSpace: null;
            this.deliverySpace = warehouseInfo.data.deliverySpace ? warehouseInfo.data.deliverySpace: null;
            this.partSpace = warehouseInfo.data.partSpace ? warehouseInfo.data.partSpace: null;
            this.shippingSpace = warehouseInfo.data.shippingSpace ? warehouseInfo.data.shippingSpace: null;
            this.allocationSpace = warehouseInfo.data.allocationSpace ? warehouseInfo.data.allocationSpace: null;

            //console.log(this.deliverySpace);
          } else {

          }
        });
    } else if (type == 2) {
      this.warehouseService.getSpaceDetailById(id).subscribe(
        spaceInfo => { 
          if (spaceInfo.code == 200) {
            this.space_name = spaceInfo.data.space_name;
            this.space_status = spaceInfo.data.space_status;
            this.positions = spaceInfo.data.positions;
          }
        }
      );
    } else if (type == 3) {
      this.warehouseService.getPositionDetailById(id).subscribe(
        positionInfo => {
          if ( positionInfo.code == 200 ) {
            this.position_name = positionInfo.data.space_name;
            this.position_status = positionInfo.data.space_status;
            this.shelves = positionInfo.data.shelves;
            this.wareLocations = positionInfo.data.warelocations;
            console.log(this.wareLocations);
            
          }
        }
      );
    }
  }

  spaceDetails(spaceId): void {
    this.router.navigate(['/dashboard/base-management',2,spaceId ]);
  }

  positionDetails(positionId): void {
    this.router.navigate(['/dashboard/base-management', 3, positionId]);
  }

  goBack() {
    this.location.back();
  }

  createComponentModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'New',
      nzContent: AddSpaceComponent,
      nzComponentParams: {
        type: this.type,
        fatherId: this.currentId
      },
      nzFooter: [{
          label: this.save_txt,
          type: 'primary',
          onClick: (componentInstance) => {
            componentInstance.save();
          }
        }
      ]
    });

    modal.afterOpen.subscribe(() => {
      console.log('[afterOpen] emitted!');

      const componentInstance = modal.getContentComponent();
      //componentInstance.type = this.type;
      //componentInstance.fatherId = this.currentId;
      componentInstance.getLanguage();
      componentInstance.getBaseInfo();
    });

    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));

  }

  createLocationComponentModal(): void {
    const locationModal = this.modalService.create({
      nzTitle: 'New Location',
      nzContent: AddLocationComponent,
      nzComponentParams: {
        fatherId: this.currentId
      },
      nzFooter: [{
          label: this.save_txt,
          type: 'primary',
          onClick: (componentInstance) => {
            componentInstance.save();
          }
        }
      ]
    });

    locationModal.afterOpen.subscribe(() => {
      console.log('[afterOpen] emitted!');

      const componentInstance = locationModal.getContentComponent();
      componentInstance.fatherId = this.currentId;
      componentInstance.getLanguage();
      componentInstance.baseInit();
    });

    // Return a result when closed
    locationModal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));

  }

  createShelfComponentModal(shelfId): void {
    const shelfModal = this.modalService.create({
      nzTitle: 'Detail',
      nzWidth: 960,
      nzContent: ShelfDetailComponent,
      nzComponentParams: {
        shelfId: shelfId
      },
      nzFooter: [{
          label: this.cancel_txt,
          type: 'primary',
          disabled: true,
          show: false,
          onClick: (componentInstance) => {
            componentInstance.cancel();
          }
        }
      ]
    });

    shelfModal.afterOpen.subscribe(() => {
      console.log('[afterOpen] emitted!' + shelfId);

      const componentInstance = shelfModal.getContentComponent();
      componentInstance.shelfId = shelfId;
      componentInstance.getLanguage();
      componentInstance.getGrids();
    });

    // Return a result when closed
    shelfModal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));

  }
  
  getLanguage() {
    this.save_txt = this.languageService.get('save_txt');
    this.cancel_txt = this.languageService.get('cancel_txt');
    this.go_back_txt = this.languageService.get('go_back_txt');
    this.detail_txt = this.languageService.get('detail_txt');
    this.start_txt = this.languageService.get('start_txt');
    this.stop_txt = this.languageService.get('stop_txt');
    this.space_title_txt = this.languageService.get('space_title_txt');
    this.position_title_txt = this.languageService.get('position_title_txt');
    this.shelf_title_txt = this.languageService.get('shelf_title_txt');
    this.location_title_txt = this.languageService.get('location_title_txt');
    this.set_default_location_txt = this.languageService.get('set_default_location_txt');
    this.bm_assembly_space_txt = this.languageService.get('bm_assembly_space_txt');
    this.bm_stockup_space_txt = this.languageService.get('bm_stockup_space_txt');
    this.bm_packs_space_txt = this.languageService.get('bm_packs_space_txt');
    this.bm_delivery_space_txt = this.languageService.get('bm_delivery_space_txt');
    this.bm_parts_space_txt = this.languageService.get('bm_parts_space_txt');
    this.bm_shipping_space_txt = this.languageService.get('bm_shipping_space_txt');
    this.bm_transfer_space_txt = this.languageService.get('bm_transfer_space_txt');
  }
}

