import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Space } from '../space';
import { WarehouseInfo } from '../../entities/warehouse-info';

import { slideInDownAnimation } from '../../animations';

import { WarehouseService } from '../warehouse.service';
import { LanguageServiceService } from '../../language-service.service';

@Component({
  selector: 'app-modify-space',
  templateUrl: './modify-space.component.html',
  styleUrls: ['./modify-space.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ModifySpaceComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  type: number;
  currentId: number;
  warehouseInfo: WarehouseInfo;
  spaceInfo: Space;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private warehouseService: WarehouseService,
    private languageService: LanguageServiceService
  ) { }

  ngOnInit() {
    this.type = +this.route.snapshot.paramMap.get('type');
    this.currentId= +this.route.snapshot.paramMap.get('oid');
    this.getModifyData(this.currentId);
  }

  getModifyData(id: number) {
    if(this.type == 1) {
      this.warehouseService.getWarehouseInfoByOid(id).subscribe( data => this.warehouseInfo =data );
      } else {
        this.warehouseService.getSpaceInfoByOid(id).subscribe(
        data => {
          console.log(data);
          this.spaceInfo = data;
        }
      );
    }
  }

  save(): void {
    if (this.type == 1) {
      console.log(this.warehouseInfo);
    }
  }

  cancel(): void {
    this.location.back();
  }
}
