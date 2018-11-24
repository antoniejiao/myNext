import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LanguageServiceService } from '../../language-service.service';

import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.css']
})
export class ShelfDetailComponent implements OnInit {
  shelfId: number;
  shelfDetail: any;
  shelf_name: string;


  cancel_txt: string;

  constructor(
    private location: Location,
    private languageService: LanguageServiceService,
    private warehouseService: WarehouseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getGrids();
    this.getLanguage();
  }

  getGrids(): void {
  //const id = +this.route.snapshot.paramMap.get('shelfid');
  //this.currentId = id;
  console.log('shelf ID:' + this.shelfId);
    if (this.shelfId == 0) {
      return;
    }
    this.warehouseService.getShelfDetailById(this.shelfId).subscribe(
      shelf => {
        if (shelf.code == 200) {
          this.shelfDetail = shelf.data.grids;
          this.shelf_name = shelf.space_name;
        }
        
      }
    ); 
  }

  cancel(): void {
    this.location.back();  
  }

  getLanguage(): void {
    this.cancel_txt = this.languageService.get("cancel_txt");
  }
}
