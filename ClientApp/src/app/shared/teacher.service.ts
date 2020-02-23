import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
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
    name: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    mobile: ['',Validators.required],
    address: ['',[Validators.required]],
    departmentId: ['',Validators.required],
    departmentCode: [''],
    designationId: ['',Validators.required],
    designationName: [''],
    totalCredit: ['',Validators.required],
    createdAt: [null],
    modifiedAt: [null]
  });



  initializeTeacherForm() {
    this.teacherForm.setValue({
      id: [''],
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      departmentId: [''],
      departmentCode: [''],
      designationId: [''],
      designationName: [''],
      totalCredit: [''],
      createdAt: [null],
      modifiedAt: [null]
    })
  }

  getAllDesignations() {
    return this.http.get(this.baseUrl + '/designation');
  }

  getAllTeachers() {
    return this.http.get<Teacher>(this.baseUrl + '/teacher');
  }

  getTeacher(id: number) {
    return this.http.get<Teacher[]>(this.baseUrl + '/teacher/' + id);
  }

  postTeacher(teacher) {
    return this.http.post(this.baseUrl + '/teacher', teacher);
  }

  putTeacher(id, teacher) {
    return this.http.put(this.baseUrl + '/teacher/' + id, teacher);
  }

  deleteTeacher(id) {
    return this.http.delete(this.baseUrl + '/teacher/' + id);
  }

  populateForm(teacher) {
    this.teacherForm.setValue(teacher);
  }

}
