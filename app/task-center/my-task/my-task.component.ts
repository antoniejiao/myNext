import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';
import { LocalStorageService } from '../../local-storage.service';
import { MessageService } from '../../system-message/message.service';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  validateForm: FormGroup;
  orders = [];

  loading = true;

  title_txt: string;
  filter_ordercd_txt: string;
  filter_customer_txt: string;
  filter_status_txt: string;
  filter_No_txt: string;
  filter_search_txt: string;
  filter_clear_txt: string;
  filter_actions_txt: string;
  btn_go_txt: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private languageService: LanguageServiceService,
    private localStorage: LocalStorageService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.init();
    this.getLanguage();
    this.getOrders();
  }

  init() {
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('customer_name', new FormControl());
    this.validateForm.addControl('order_cd', new FormControl());
    this.validateForm.addControl('order_status', new FormControl());
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  getOrders() {
    let getData = {
      'warehouse_id': this.localStorage.getValue('warehouseid')
    };

    this.taskService.doGetMyTask(getData).subscribe(
      rtnData => {
        if (rtnData.code == 200) {
          this.orders = rtnData.data.taskList;

        }
      }
    );
    this.loading = false;
  }

  getLanguage() {
    this.title_txt = this.languageService.get('dbd_do_task_txt');
    this.filter_ordercd_txt = this.languageService.get('filter_ordercd_txt');
    this.filter_customer_txt = this.languageService.get('filter_customer_txt');
    this.filter_status_txt = this.languageService.get('filter_status_txt'); 
    this.filter_No_txt = this.languageService.get('filter_No_txt');
    this.filter_search_txt = this.languageService.get('filter_search_txt'); 
    this.filter_clear_txt = this.languageService.get('filter_clear_txt'); 
    this.filter_actions_txt = this.languageService.get('filter_actions_txt'); 
    this.btn_go_txt = this.languageService.get('btn_go_txt'); 
  }
}
