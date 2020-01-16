import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { min } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.baseUrl;
  formTitle;
  buttonName;
  constructor(private http: HttpClient, private fb:FormBuilder) { }
  courseForm=this.fb.group({
    id: [''],
    code: ['', Validators.required, Validators.minLength(5)],
    name: ['',Validators.required],
    credit: ['',Validators.required],
    description: [''],
    departmentId: ['',Validators.required],
    departmentName: [''],
    semesterId: ['', Validators.required],
    semesterName: [''],
    createdAt: [''],

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
    });
  }

  

  


  getAllCourses(){
    return this.http.get<Course[]>(this.baseUrl+'/course');
  }


  deleteCourse(id:number){
    return this.http.delete(this.baseUrl+'/course/'+id);
  }

  getCourse(id:number){
    return this.http.get<Course[]>(this.baseUrl+'/course/'+id);
  }
}
