import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { min } from 'rxjs/operators';
import { getLocaleDateTimeFormat, DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.baseUrl;
  formTitle = '';
  buttonName = '';

  constructor(private http: HttpClient, private fb : FormBuilder) { }
  courseForm = this.fb.group({
    id: [null],
    code: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', Validators.required],
    credit: [null, Validators.required],
    description: [''],
    departmentId: [null, Validators.required],
    departmentName: [''],
    semesterId: [null, Validators.required],
    semesterName: [''],
    createdAt: [null],
    modifiedAt:[null],
    
  });

  initializeCourseForm() {
    this.courseForm.setValue({
      id: null,
      code: '',
      name: '',
      credit: null,
      description: '',
      departmentId: null,
      departmentName: '',
      semesterId: null,
      semesterName: '',
      createdAt: null,
      modifiedAt: null
    });
  }

  getAllCourses() {
    return this.http.get<Course[]>(this.baseUrl + '/course');
  }

  getCourse(id: number) {
    return this.http.get<Course>(this.baseUrl + '/course/' + id);
  }

  postCourse(course) {
    return this.http.post(this.baseUrl + '/course', course);
  }

  putCourse(id, course) {
    return this.http.put(this.baseUrl + '/course/' +id, course);
  }

  deleteCourse(id) {
    return this.http.delete(this.baseUrl + '/course/' + id);
  }

  populateForm(course) {
    this.courseForm.setValue(course);
  }

}
