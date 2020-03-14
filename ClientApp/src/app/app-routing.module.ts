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
import { CourseAssignToTeacherComponent } from './components/course-assign-to-teacher/course-assign-to-teacher.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { AllocateClassRoomComponent } from './components/allocate-class-room/allocate-class-room.component';
import { ClassScheduleComponent } from './components/class-schedule/class-schedule.component';
import { EnrollCourseComponent } from './components/enroll-course/enroll-course.component';
import { StudentResultComponent } from './components/student-result/student-result.component';
import { ViewResultComponent } from './components/student-result/view-result/view-result.component';
import { UnassignAndUnallocateComponent } from './components/unassign-and-unallocate/unassign-and-unallocate.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { ViewProfileComponent } from './components/user/view-profile/view-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children:[
      {path:'login', component:LoginComponent},
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard],
    children:[
      {path:'',component:HomeComponent},
      {path:'course', component:CourseComponent,canActivate:[AuthGuard]},
      {path:'department', component:DepartmentComponent,canActivate:[AuthGuard]},
      {path:'teacher', component:TeacherComponent,canActivate:[AuthGuard]},
      {path:'courseAssign', component:CourseAssignToTeacherComponent,canActivate:[AuthGuard]},
      {path:'studentRegister', component:StudentRegisterComponent,canActivate:[AuthGuard]},
      {path:'allocateClassRoom', component:AllocateClassRoomComponent,canActivate:[AuthGuard]},
      {path:'viewClassSchedule', component:ClassScheduleComponent,canActivate:[AuthGuard]},
      {path:'enrollCourse', component:EnrollCourseComponent,canActivate:[AuthGuard]},
      {path:'studentResult', component:StudentResultComponent,canActivate:[AuthGuard]},
      {path:'viewResult', component:ViewResultComponent,canActivate:[AuthGuard]},
      {path:'unAssign&unAllocate', component:UnassignAndUnallocateComponent,canActivate: [AuthGuard],data:{permittedRoles:['Admin']}},
      { path: 'userList', component: UserListComponent, canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},
      { path: 'viewProfile', component: ViewProfileComponent, canActivate:[AuthGuard]},
      {path:'forbidden',component:ForbiddenComponent},


    ]
  },

  // ,canActivate: [AuthGuard]
  {path:'**',component:PageNotFoundComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
