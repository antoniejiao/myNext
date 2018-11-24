import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

@Component({
  selector: 'app-work-on-job',
  templateUrl: './work-on-job.component.html',
  styleUrls: ['./work-on-job.component.css']
})
export class WorkOnJobComponent implements OnInit {
  @ViewChild('packageTitle') packagett: TemplateRef<any>;
  @ViewChild('startTitle') starttt: TemplateRef<any>;
  @ViewChild('outboundTitle') outboundtt: TemplateRef<any>;
  @ViewChild('agentLogisticTitle') agentLogistictt: TemplateRef<any>;
  @ViewChild('shippingTitle') shippingtt: TemplateRef<any>;

  current: number;
  steps = [];

  startTitle_txt: string;
  outboundTitle_txt: string;
  packageTitle_txt: string;
  agentLogisticTitle_txt: string;
  shipping_txt: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService 
  ) { }

  ngOnInit() {
    this.init();
    this.getLanguage();
    this.getData();
  }

  init() {
    this.current = 0;
    this.steps = [
      {'stepcd': 'startTitle', 'current': 200},
      {'stepcd': 'outboundTitle', 'current': 100},
      {'stepcd': 'packageTitle', 'current': 0},
      {'stepcd': 'agentLogisticTitle', 'current': 0},
      {'stepcd': 'shippingTitle', 'current': 0}
    ];
  }
  
  getData() {
    let i = 0
    for (let step of this.steps) {
      this.steps[i]['stepname'] = this.getTitleTemplate(step.stepcd);

      if (step.current == 100) {
        this.current = i;
      }
      if (this.current == 0 && step.curret == 200) {
        this.current = 200;
      }
      i++;
    }

  }

  /*
  * 取得步骤对应的TemplateRef，使程序获得正确的链接
  */
  getTitleTemplate(stepcd: string): string | TemplateRef<any> {
    if (stepcd == 'startTitle') {
      return this.starttt;
    } else if (stepcd == 'outboundTitle') {
      return this.outboundtt;
    } else if (stepcd == 'packageTitle') {
      return this.packagett;
    } else if (stepcd == 'agentLogisticTitle') {
      return this.agentLogistictt;
    } else if (stepcd == 'shippingTitle') {
      return this.shippingtt;
    } else {
      return this.languageService.get(stepcd);
    }
  }

  getLanguage() {
    this.startTitle_txt = this.languageService.get('startTitle_txt');
    this.outboundTitle_txt = this.languageService.get('outboundTitle_txt');
    this.packageTitle_txt = this.languageService.get('packageTitle_txt');
    this.agentLogisticTitle_txt = this.languageService.get('agentLogisticTitle_txt');
    this.shipping_txt = this.languageService.get('shipping_txt');
  }
}
