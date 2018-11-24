import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskRoutingModule } from './task-routing.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { HistoryTaskComponent } from './history-task/history-task.component';
import { AllTaskComponent } from './all-task/all-task.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BackorderTaskComponent } from './backorder-task/backorder-task.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [NewTaskComponent, MyTaskComponent, HistoryTaskComponent, AllTaskComponent, BackorderTaskComponent]
})
export class TaskModule { }
