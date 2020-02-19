import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';
import { MatDialog } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = environment.baseUrl;
  buttonName;
  formTitle;

  constructor(private http:HttpClient,
    public dialog: MatDialog,
    private fb: FormBuilder
    ) { }

    departmentForm = this.fb.group({
      id: [''],
      code: ['',Validators.required],
      name: ['',Validators.required],
      createdAt: [null],
      modifiedAt: [null]
    })

    initializeDepartmentForm(){
      this.departmentForm.setValue({
        id: [''],
        code: [''],
        name: [''],
        createdAt: [null],
        modifiedAt: [null]
      })
    }

  getAllDepartments(){
    return this.http.get<Department[]>(this.baseUrl+'/department');
  }

  getDepartment(id: number) {
    return this.http.get<Department>(this.baseUrl + '/department/' + id);
  }
 
  postDepartment(department) {
    return this.http.post(this.baseUrl + '/department', department);
  }

  putDepartment(id, department) {
    return this.http.put(this.baseUrl + '/department/' +id, department);
  }

  deleteDepartment(id) {
    return this.http.delete(this.baseUrl + '/department/' + id);
  }

  populateForm(department) {
    this.departmentForm.setValue(department);
  }


}