import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { ManagementOrder } from '../../entities/management-order';
import { CheckData } from '../../entities/check-data';

import { Dictionary, CHECKSTATUSARRAYS } from '../../dictionary';

import { MessageService } from '../../system-message/message.service';
import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';

import { InstockService } from '../instock.service';

@Component({
  selector: 'app-instock-report',
  templateUrl: './instock-report.component.html',
  styleUrls: ['./instock-report.component.css']
})
export class InstockReportComponent implements OnInit {
  code: string;
  type: number;
  go_back_txt: string;

  inOutData;
  

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
    this.type = +this.route.snapshot.paramMap.get('type');
    this.code = this.route.snapshot.paramMap.get('code');
    let getData = {
      'bus_cd': this.code
    };

    this.inOutData = {
      'total': 0,
      'date': '',
      'content': []
    };

    this.getReport(getData);
  }

  getReport(getData) {
    this.instockService.doGetReport(getData).subscribe(
      rtnData => {
        console.log(rtnData);
        if (rtnData.code == 200) {
          if (this.type == 1 || this.type == 2) {
            this.inOutData = rtnData.data;
          }
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
