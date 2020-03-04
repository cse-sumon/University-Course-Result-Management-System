import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentRegister } from '../models/student-register.model';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService {
  baseUrl = environment.baseUrl;
  btnName;
  formTitle;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  studentRegisterForm = this.fb.group({
    id: [null],
    regNo: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    address: ['', Validators.required],
    departmentId: [null, Validators.required],
    departmentName: [''],
    createdAt: [null],
    modifiedAt: [null],
  })


  initializeRegisterForm() {
    this.studentRegisterForm.setValue({
      id: [null],
      regNo: [null],
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      departmentId: [null],
      departmentName: [''],
      createdAt: new Date,
      modifiedAt: [''],
    })
  }


  getAllStudentRegister() {
    return this.http.get<StudentRegister>(this.baseUrl + '/studentRegister');
  }

  getStudentRegister(id) {
    return this.http.get<StudentRegister>(this.baseUrl + '/studentRegister/' + id);
  }

  postStudentRegister(studentRegisterForm) {
    return this.http.post(this.baseUrl + '/studentRegister', studentRegisterForm);
  }

  putStudentRegister(id, studentRegisterForm) {
    return this.http.put(this.baseUrl + '/studentRegister/' + id, studentRegisterForm);
  }

  deleteStudentRegister(id) {
    return this.http.delete(this.baseUrl + '/studentRegister/' + id);
  }

  populateForm(studentRegisterForm) {
    this.studentRegisterForm.setValue(studentRegisterForm);
  }

}
