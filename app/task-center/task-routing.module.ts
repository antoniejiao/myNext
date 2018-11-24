import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { HistoryTaskComponent } from './history-task/history-task.component';
import { AllTaskComponent } from './all-task/all-task.component';
import { BackorderTaskComponent } from './backorder-task/backorder-task.component';

const taskcenterRoutes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    {
      path: 'newtask',
      component: NewTaskComponent
    },
    {
      path: 'mytask',
      component: MyTaskComponent
    },
    {
      path: 'historytask',
      component: HistoryTaskComponent
    },
    {
      path: 'alltask',
      component: AllTaskComponent
    },
    {
      path: 'backordertask',
      component: BackorderTaskComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(taskcenterRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
