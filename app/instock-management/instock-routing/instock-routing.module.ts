import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InstockManagementComponent } from '../instock-management.component';
import { InBoundComponent } from '../in-bound/in-bound.component';
import { OutBoundComponent } from '../out-bound/out-bound.component';
import { CheckingComponent } from '../checking/checking.component';
import { MoreOrderComponent } from '../more-order/more-order.component';
import { CheckOrdersComponent } from '../check-orders/check-orders.component';
import { InstockItemsComponent } from '../instock-items/instock-items.component';
import { InoutDetailComponent } from '../inout-detail/inout-detail.component';
import { WastageOfCommodityComponent } from '../wastage-of-commodity/wastage-of-commodity.component';
import { InstockReportComponent } from '../instock-report/instock-report.component';
import { SkuInstockDetailComponent } from '../sku-instock-detail/sku-instock-detail.component';
import { WastageListComponent } from '../wastage-list/wastage-list.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';
//import { NgZorroAntdModule } from 'ng-zorro-antd';

const instockcenterRoutes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    {
    path: 'instockcenter',
    component: InstockManagementComponent,
    children: [
      {
        path: 'inbound',
        component: InBoundComponent,
        //outlet: 'popup'
      },
      {
        path: 'outbound',
        component: OutBoundComponent,
        //outlet: 'popup'
      },
      {
        path: 'checking/:type',
        component: CheckingComponent,
        outlet: 'popup'
      },
    ]
  },
  {
    path: 'inbound',
    component: InBoundComponent
  }, 
  {
    path: 'outbound',
    component: OutBoundComponent
  },
  {
    path: 'checking/:type',
    component: CheckingComponent
  },
  {
    path: 'checkingplace/:type/:code',
    component: CheckingComponent
  },
  {
    path: 'continuecheck/:type/:batch_cd',
    component: CheckingComponent
  },
  {
    path: 'moreorders/:type',
    component: MoreOrderComponent
  },
  {
    path: 'checkorderlist',
    component: CheckOrdersComponent
  },
  {
    path: 'instockitemlist',
    component: InstockItemsComponent
  },
  {
    path: 'inoutdetail/:type/:code',
    component: InoutDetailComponent
  },
  {
    path: 'instockreport/:type/:code',
    component: InstockReportComponent
  },
  {
    path: 'wastageofcommodity',
    component: WastageOfCommodityComponent
  },
  {
    path: 'wastagelist',
    component: WastageListComponent
  },
  {
    path: 'skuinstockdetail/:sku',
    component: SkuInstockDetailComponent
  }
  ]
  }  
];

@NgModule({
  imports: [
    RouterModule.forChild(instockcenterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InstockRoutingModule { }
