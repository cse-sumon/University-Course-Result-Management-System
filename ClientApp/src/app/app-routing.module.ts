import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { TestComponent } from './components/test/test.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children:[
      {path:'login', component:LoginComponent},
      {path:'registration', component:RegistrationComponent}
    ]
  },
  {
    path: 'sf', component: DashboardComponent,
    children:[
      {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
      {path:'registration', component:RegistrationComponent},

    ]
  },
 
  {path:'forbidden',component:ForbiddenComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
