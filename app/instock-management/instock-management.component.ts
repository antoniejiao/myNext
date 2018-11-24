import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ManagementOrder } from '../entities/management-order';
import { CheckData } from '../entities/check-data';
import { Item } from '../entities/item';

import { Dictionary, CHECKSTATUSARRAYS } from '../dictionary';

import { MessageService } from '../system-message/message.service';
import { LanguageServiceService } from '../language-service.service';
import { LocalStorageService } from '../local-storage.service';

import { InstockService } from './instock.service';

@Component({
  selector: 'app-instock-management',
  templateUrl: './instock-management.component.html',
  styleUrls: ['./instock-management.component.css']
})
export class InstockManagementComponent implements OnInit {
  inOrders: ManagementOrder[];
  outOrders: ManagementOrder[];
  checkOrders: CheckData[];
  checkStatusArrays = CHECKSTATUSARRAYS;
  items: Item[];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private messageService: MessageService,
      private languageService: LanguageServiceService,
      private localStorage: LocalStorageService,
      private instockService: InstockService
  ) { }

  ngOnInit() {
    this.getBaseData();
  }

  getBaseData() {

    let getData = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'page': 1,
      'limit': 5,
      'type': 1
    };
    this.getInOutStockData(getData, 1);
    getData.type = 2;
    this.getInOutStockData(getData, 2);

    let checkGetData = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'page': 1,
      'limit': 5
    };

    this.getCheckData(checkGetData);
    this.getRealTimeStockList(getData);
  }

  getInOutStockData(getData, type: number) {
    this.instockService.doGetGoodsOutinList(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          if (type == 1) {
            this.inOrders = rtnData.data;
          } else if (type == 2) {
            this.outOrders = rtnData.data;
          }
        }
      }
    );
  }

  getCheckData(getData) {
    this.instockService.doGetCheckList(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.checkOrders = rtnData.data;
        }
      }
    );
  }

  getRealTimeStockList(getData) {
    this.instockService.doGetRealTimeStockList(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.items = rtnData.data;
        }
      }
    );
  }

}
