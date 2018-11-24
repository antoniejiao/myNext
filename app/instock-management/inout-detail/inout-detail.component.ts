import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { ManagementOrder } from '../../entities/management-order';
import { InOutDetail } from '../../entities/in-out-detail';
import { InstockItem } from '../../entities/instock-item';

import { Dictionary } from '../../dictionary';

import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

@Component({
  selector: 'app-inout-detail',
  templateUrl: './inout-detail.component.html',
  styleUrls: ['./inout-detail.component.css']
})
export class InoutDetailComponent implements OnInit {
  details: InOutDetail[];
  type: number;
  code: string;

  curPage: number;
  nextPage: number;
  previousPage: number;
  pageCount: number;
  pageLimit: number;

  go_back_txt: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private instockService: InstockService
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.getBaseData();
  }

  getBaseData() {
    this.curPage = 1;
    this.nextPage = 0;
    this.previousPage = 0;
    this.pageCount = 0;
    this.pageLimit = 3;

    this.type = +this.route.snapshot.paramMap.get('type');
    this.code = this.route.snapshot.paramMap.get('code');

    let getData = {
      'warehouse_id': this.localStorage.getValue('warehouseid'),
      'bus_cd': this.code,
      'page': 1,
      'limit': 10
    };

    this.getDetails(getData);
  }

  getDetails(getData) {
    this.instockService.doGetOutInDetail(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          this.details = rtnData.data;
        }
      }
    );
  }

  goBack() {
    this.location.back();
  }

  getLanguage() {
    this.go_back_txt = this.languageService.get('go_back_txt');
  }
}
