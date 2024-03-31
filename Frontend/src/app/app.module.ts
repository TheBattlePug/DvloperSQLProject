import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Router } from 'express';
import { TableBasicExample } from './student-table/table-basic-example';
import { CourseTableComponent } from './course-table/course-table.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { PatchStudentComponent } from './patch-student/patch-student.component';
import { PatchCourseComponent } from './patch-course/patch-course.component';

//auth-guard rubbish
import { SignupComponent } from './signup/signup.component';
import { LoginComponentComponent } from './login-component/login-component.component';


import { AuthGuard } from './keycloak/app.guard';
import { WriteGuard } from './keycloak/write.guard';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

//custom theme
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeKeycloak } from './keycloak/app.init';


@NgModule({
  declarations: [
    AppComponent,
    // AddStudentComponent,
    // AddCourseComponent,
    // PatchStudentComponent,
    // PatchCourseComponent,
    // LoginComponentComponent,
    // SignupComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'register', //registration
        component: SignupComponent
      },
      {
        path: 'login', // login
        component: LoginComponentComponent,
      },
      {
        path: 'students',
        component: TableBasicExample,
        canActivate: [AuthGuard]
      },
      {
        path: 'courses',
        component: CourseTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'addNewStudent',
        component: AddStudentComponent,
        canActivate: [AuthGuard, WriteGuard],
        data: { 'roles': ['Read-And-Write']}
      },
      {
        path: 'addNewCourse',
        component: AddCourseComponent,
        canActivate: [AuthGuard, WriteGuard],
        data: { 'roles': ['Read-And-Write']}
      },
      {
        path: 'patchCourse/:courseId', // Define courseId as a route parameter
        component: PatchCourseComponent,
        canActivate: [AuthGuard, WriteGuard],
        data: { 'roles': ['Read-And-Write']}
      },
      {
        path: 'patchStudent/:studentId', // Define studentId as a route parameter
        component: PatchStudentComponent,
        canActivate: [AuthGuard, WriteGuard],
        data: { 'roles': ['Read-And-Write']}
      }
    ]),
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {


 }
