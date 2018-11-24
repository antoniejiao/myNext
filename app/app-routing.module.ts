import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SystemMessageComponent } from './system-message/system-message.component';
import { ShowDataMessageComponent } from './system-message/show-data-message/show-data-message.component';
//import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'msg', component: SystemMessageComponent, outlet: 'msg' },
  { path: 'datamsg', component: ShowDataMessageComponent, outlet: 'msg' }
  //{ path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
