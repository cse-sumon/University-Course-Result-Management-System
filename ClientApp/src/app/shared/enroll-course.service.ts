import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EnrollCourse } from '../models/enroll-course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollCourseService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  enrollCourseForm = this.fb.group({
    id: [null],
    studentRegId: [null, Validators.required],
    studentRegNo: [''],
    name: [''],
    email: [''],
    departmentCode: [''],
    courseId: [null, Validators.required],
    courseCode: [''],
    courseName: [''],
    createdAt: [null]
  });

  initializeEnrollCourseForm() {
    this.enrollCourseForm.setValue({
      id: [null],
      studentRegId: [null],
      studentRegNo: [''],
      name: [''],
      email: [''],
      departmentCode: [''],
      courseId: [null],
      courseCode: [''],
      courseName: [''],
      createdAt: new Date,
    });
  }


  getAllEnrollCourses() {
    return this.http.get<EnrollCourse>(this.baseUrl + '/enrollCourse');
  }

  getEnrollCourse(id) {
    return this.http.get<EnrollCourse>(this.baseUrl + '/enrollCourse/' + id);
  }

  postAllEnrollCourses(enrollCourse) {
    return this.http.post(this.baseUrl + '/enrollCourse', enrollCourse);
  }

  putAllEnrollCourses(id, enrollCourse) {
    return this.http.put(this.baseUrl + '/enrollCourse/' + id, enrollCourse);
  }

  deleteEnrollCourse(id) {
    return this.http.delete(this.baseUrl + '/enrollCourse/' + id);
  }

  populateForm(row) {
    this.enrollCourseForm.patchValue({
      id:row['id'],
      studentRegId:row['studentRegId'],
      studentRegNo:row['studentRegNo'],
      name:row['studentName'],
      email:row['studentEmail'],
      departmentId:row["departmentId"],
      departmentCode:row["departmentCode"],
      courseId:row["courseId"],
      courseCode:row["courseCode"],
      createdAt:row["createdAt"]
    });
  }


}
