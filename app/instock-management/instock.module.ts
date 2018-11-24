import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InstockManagementComponent } from './instock-management.component';
import { InstockComponent } from '../instock-management/instock/instock.component';
import { InBoundComponent } from './in-bound/in-bound.component';
import { OutBoundComponent } from './out-bound/out-bound.component';
import { CheckingComponent } from './checking/checking.component';
import { InstockRoutingModule } from './instock-routing/instock-routing.module';
import { MoreOrderComponent } from './more-order/more-order.component';
import { CheckOrdersComponent } from './check-orders/check-orders.component';
import { InstockItemsComponent } from './instock-items/instock-items.component';
import { InoutDetailComponent } from './inout-detail/inout-detail.component';
import { WastageOfCommodityComponent } from './wastage-of-commodity/wastage-of-commodity.component';
import { InstockReportComponent } from './instock-report/instock-report.component';
import { SkuInstockDetailComponent } from './sku-instock-detail/sku-instock-detail.component';
//import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { WastageListComponent } from './wastage-list/wastage-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InstockRoutingModule,
    NgZorroAntdModule 
  ],
  declarations: [
    InstockManagementComponent,
    InstockComponent,
    InBoundComponent,
    OutBoundComponent,
    CheckingComponent,
    MoreOrderComponent,
    CheckOrdersComponent,
    InstockItemsComponent,
    InoutDetailComponent,
    WastageOfCommodityComponent,
    InstockReportComponent,
    SkuInstockDetailComponent,
    WastageListComponent
  ],
  providers: []
})
export class InstockModule{}
