import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { DashboardComponent } from './dashboard.component';
import { BaseManagementComponent } from './base-management/base-management.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddSpaceComponent } from './add-space/add-space.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { ModifySpaceComponent } from './modify-space/modify-space.component';

//import { InstockManagementComponent } from '../instock-management/instock-management.component';
//import { InstockModule } from '../instock-management/instock.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgZorroAntdModule
    //    InstockModule
  ],
  declarations: [
  //    DashboardComponent,
    BaseManagementComponent,
    AddSpaceComponent,
    AddLocationComponent,
    ShelfDetailComponent,
    ModifySpaceComponent,
    //InstockManagementComponent
  ],
  providers:[]
})

export class DashboardCenterModule {}
