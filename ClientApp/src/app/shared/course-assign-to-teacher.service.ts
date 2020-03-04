import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseAssignToTeacherService {

  baseUrl = environment.baseUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  courseAssignForm = this.fb.group({
    id: [null],
    departmentId: [null, Validators.required],
    departmentName: [''],
    teacherId: ['', Validators.required],
    teacherName: [''],
    totalCredit: [''],
    remainingCredit: [''],
    courseId: [null, Validators.required],
    courseCode: [''],
    courseName: [''],
    credit: [''],
    createdAt: ['']

  })

  initializeCourseAssignForm() {
    this.courseAssignForm.setValue({
      id: [null],
      departmentId: [''],
      departmentName: [''],
      teacherId: [null],
      teacherName: [''],
      totalCredit: [''],
      remainingCredit: [''],
      courseId: [null],
      courseCode: [''],
      courseName: [''],
      credit: [''],
      createdAt: ['']
    })
  }





  getTeacherByDepartmentId(id: number) {
    return this.http.get(this.baseUrl + '/teacher/GetTeacherByDepartmentId/' + id);
  }

  getCourseByDepartmentId(id: number) {
    return this.http.get(this.baseUrl + '/course/GetCourseByDepartmentId/' + id);
  }

  getCreditByTeacherId(id: number) {
    return this.http.get(this.baseUrl + '/CourseAssignToTeacher/GetAssignCreditByTeacherId/' + id);
  }


  getAllCourseAssign() {
    return this.http.get(this.baseUrl + '/CourseAssignToTeacher');
  }

  getCourseAssignByDepartmentId(id: number) {
    return this.http.get(this.baseUrl + '/CourseAssignToTeacher/GetAllCourseAssignByDepartmentId/' + id);
  }

  postCourseAssign(courseAssign) {
    return this.http.post(this.baseUrl + '/CourseAssignToTeacher', courseAssign);
  }

  putCourseAssign(id, courseAssign) {
    return this.http.put(this.baseUrl + '/CourseAssignToTeacher/' + id, courseAssign);
  }

  deleteCourseAssign(id) {
    return this.http.delete(this.baseUrl + '/CourseAssignToTeacher/' + id);
  }

  populateForm(row) {
    this.courseAssignForm.patchValue({
      id:row['id'],
      departmentId:row["departmentId"],
      departmentName:row["departmentName"],
      teacherId:row['teacherId'],
      teacherName:row['teacherName'],
      courseId:row["courseId"],
      courseName:row["courseName"],
    });
  }




}
