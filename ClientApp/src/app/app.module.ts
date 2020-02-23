import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MaterialsModule} from './materials/materials.module';
import { CourseComponent } from './components/course/course.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SemesterService } from './shared/semester.service';
import { DepartmentService } from './shared/department.service';
import { DepartmentComponent } from './components/department/department.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AddTeacherComponent } from './components/teacher/add-teacher/add-teacher.component';
import { DetailsTeacherComponent } from './components/teacher/details-teacher/details-teacher.component';
import { CourseAssignToTeacherComponent } from './components/course-assign-to-teacher/course-assign-to-teacher.component';
import { AddCourseAssignToTeacherComponent } from './components/course-assign-to-teacher/add-course-assign-to-teacher/add-course-assign-to-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    TestComponent,
    DashboardComponent,
    ForbiddenComponent,
    CourseComponent,
    AddCourseComponent,
    PageNotFoundComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    TeacherComponent,
    AddTeacherComponent,
    DetailsTeacherComponent,
    CourseAssignToTeacherComponent,
    AddCourseAssignToTeacherComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
     {
       timeOut:2500,
      progressBar: true
     }
    ),
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    UserService,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  SemesterService,
  DepartmentService,
],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCourseComponent,
    AddDepartmentComponent,
    DetailsTeacherComponent,
    AddTeacherComponent,
    AddCourseAssignToTeacherComponent,
  ]
})
export class AppModule { }
