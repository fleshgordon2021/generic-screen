import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListSurveysComponent } from './components/list-surveys/list-surveys.component';
import { TaskScreenMatirialComponent } from './components/task-screen-matirial/task-screen-matirial.component';

const routes: Routes = [
  {path:'list-surveys', component: ListSurveysComponent},
  { path: 'generic-task/:taskId', component: TaskScreenMatirialComponent },
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
