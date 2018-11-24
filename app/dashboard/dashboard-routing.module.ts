import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseManagementComponent } from './base-management/base-management.component';
import { AddSpaceComponent } from './add-space/add-space.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { ModifySpaceComponent } from './modify-space/modify-space.component';

import { DashboardComponent } from './dashboard.component';


const dashboardRoutes: Routes = [
{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        {
            path: 'base-management/:type/:id',
            component: BaseManagementComponent,
            
            children: [
            
              {
                path: 'addspace/:type/:fatherid',
                component: AddSpaceComponent,
                // outlet: 'new_space'
              },
              {
                path: 'addlocation/:fatherid',
                component: AddLocationComponent,
                //outlet: 'new_space'
              },
              {
                path: 'shelfdetail/:shelfId',
                component: ShelfDetailComponent,
                //outlet: 'new_space'
              },
              {
                path: 'modifyspace/:type/:oid',
                component: ModifySpaceComponent,
                //outlet: 'new_space'
              }

            ]
            
        }
    ]
  }
];

@NgModule({
imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule{}
