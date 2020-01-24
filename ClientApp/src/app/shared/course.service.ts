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
  formTitle='';
  buttonName='';

  constructor(private http: HttpClient) { }

 

  

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
