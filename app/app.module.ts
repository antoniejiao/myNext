import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';

import { DashboardCenterModule } from './dashboard/dashboard-center.module';
import { InstockModule } from './instock-management/instock.module';

import { httpInterceptorProviders } from './http-interceptors/interceptor-index';
import { SystemMessageComponent } from './system-message/system-message.component';
import { ShowDataMessageComponent } from './system-message/show-data-message/show-data-message.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { TaskModule } from './task-center/task.module';
import { WorkingModule } from './working-center/working.module';
import { ToTemplatePipe } from './tools/to-template-pipe';


registerLocaleData(zh);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SystemMessageComponent,
    ShowDataMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DashboardCenterModule,
    InstockModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    TaskModule,
    WorkingModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
