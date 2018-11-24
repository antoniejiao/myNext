import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StartWorkComponent } from './start-work/start-work.component';
import { OrderOutBoundComponent } from './order-out-bound/order-out-bound.component';
import { OrderPackageComponent } from './order-package/order-package.component';
import { AgentLogisticsComponent } from './agent-logistics/agent-logistics.component';
import { ShippingComponent } from './shipping/shipping.component';
import { WorkOnJobComponent } from './work-on-job/work-on-job.component';
import { PackageInShipAreaComponent } from './package-in-ship-area/package-in-ship-area.component';

const workRoutes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    {
      path: 'workonajob',
      component: WorkOnJobComponent,
      children: [
        {
          path: 'startwork',
          component: StartWorkComponent
        },
        {
          path: 'orderoutbound',
          component: OrderOutBoundComponent
        },
        {
          path: 'agentlogistics',
          component: AgentLogisticsComponent
        },
        {
          path: 'orderpackage',
          component: OrderPackageComponent
        },
        {
          path: 'shipping',
          component: ShippingComponent
        },
        {
          path: 'orderinshiparea',
          component: PackageInShipAreaComponent
        }
      ]
    }
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(workRoutes)],
  exports: [RouterModule]
})
export class WorkingRoutingModule { }
