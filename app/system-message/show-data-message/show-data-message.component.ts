import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { DataMessageService } from '../data-message.service';
import { InstockService } from '../../instock-management/instock.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-show-data-message',
  templateUrl: './show-data-message.component.html',
  styleUrls: ['./show-data-message.component.css']
})
export class ShowDataMessageComponent implements OnInit {

  constructor(
    private location: Location,
    private dataMessageService: DataMessageService,
    private instockService: InstockService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  closeMsg(): void {
    this.location.back();
  }

  save() {
    let checkData = {
      'check_batch_cd': this.dataMessageService.checkingItems.check_batch_cd,
      'warehouse_id': this.dataMessageService.checkingItems.warehouse_id,
      'content': this.dataMessageService.checkingItems.content,
      'ignore_error': 1
    };
    console.log(checkData);
    this.instockService.doFinishChecking(checkData).subscribe(
      rtnData => {
        if (rtnData.code == 200) {
          this.router.navigate(['/instockcenter']);
        } else {

        }
      }
    );
  }
}
