import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Teacher } from '../models/Teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  baseUrl = environment.baseUrl;
  buttonName;
  formTitle;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder

  ) { }

  teacherForm = this.fb.group({
    id: [''],
    name: [''],
    email: [''],
    mobile: [''],
    address: [''],
    TeacherId: [''],
    TeacherName: [''],
    designationId: [''],
    designationName: [''],
    createdAt: [''],
    modifiedAt: ['']
  });

  initializeTeacherForm() {
    this.teacherForm.setValue({
      id: [''],
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      TeacherId: [''],
      TeacherName: [''],
      designationId: [''],
      designationName: [''],
      createdAt: [''],
      modifiedAt: ['']
    })
  }

  getDesignation() {
    return this.http.get(this.baseUrl + '/designation');
  }

  getAllTeachers(){
    return this.http.get<Teacher>(this.baseUrl+'/teacher');
  }

  getTeacher(id: number) {
    return this.http.get<Teacher[]>(this.baseUrl + '/teacher/' + id);
  }

  postTeacher(teacher) {
    return this.http.post(this.baseUrl + '/teacher', teacher);
  }

  putTeacher(id, teacher) {
    return this.http.put(this.baseUrl + '/teacher/' +id, teacher);
  }

  deleteTeacher(id) {
    return this.http.delete(this.baseUrl + '/teacher/' + id);
  }

  populateForm(teacher) {
    this.teacherForm.setValue(teacher);
  }

}
