import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { WorkingRoutingModule } from './working-routing.module';
import { WorkOnJobComponent } from './work-on-job/work-on-job.component';
import { StartWorkComponent } from './start-work/start-work.component';

import { ToTemplatePipe } from '../tools/to-template-pipe';
import { OrderOutBoundComponent } from './order-out-bound/order-out-bound.component';
import { OrderPackageComponent } from './order-package/order-package.component';
import { AgentLogisticsComponent } from './agent-logistics/agent-logistics.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PackageInShipAreaComponent } from './package-in-ship-area/package-in-ship-area.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkingRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [
    WorkOnJobComponent, 
    StartWorkComponent,
    ToTemplatePipe,
    OrderOutBoundComponent,
    OrderPackageComponent,
    AgentLogisticsComponent,
    ShippingComponent,
    PackageInShipAreaComponent
    
    ]
})
export class WorkingModule { }
