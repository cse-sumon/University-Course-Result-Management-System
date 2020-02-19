import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseComponent } from './components/course/course.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DepartmentComponent } from './components/department/department.component';
import { TeacherComponent } from './components/teacher/teacher.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children:[
      {path:'login', component:LoginComponent},
      { path: 'registration', component: RegistrationComponent},
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'course', component:CourseComponent},
      {path:'department', component:DepartmentComponent},
      {path:'teacher', component:TeacherComponent},

    ]
  },

  // ,canActivate: [AuthGuard]
  {path:'**',component:PageNotFoundComponent},
  {path:'forbidden',component:ForbiddenComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
