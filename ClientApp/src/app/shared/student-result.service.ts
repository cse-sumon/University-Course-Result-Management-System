import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { StudentResult } from '../models/student-result.models';

@Injectable({
  providedIn: 'root'
})
export class StudentResultService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  studentResultForm = this.fb.group({
    id: [null],
    studentRegId: [null,Validators.required],
    studentRegNo: [''],
    name: [''],
    email: [''],
    departmentCode: [''],
    courseId: ['',Validators.required],
    courseCode: [''],
    courseName: [''],
    grade: ['',Validators.required],
  });

initializeStudentResultForm(){
  this.studentResultForm.setValue({
    id: [null],
    studentRegId: [null],
    studentRegNo: [''],
    name: [''],
    email: [''],
    departmentCode: [''],
    courseId: [null],
    courseCode: [''],
    courseName: [''],
    grade: [''],
  })
}


getAllStudentResults() {
  return this.http.get<StudentResult>(this.baseUrl + '/studentResult');
}

getAllRegNo() {
  return this.http.get(this.baseUrl + '/studentResult/GetAllRegNo');
}

getAllStudentResultByRegNo(id) {
  return this.http.get<StudentResult>(this.baseUrl + '/studentResult/GetStudentResultByRegId/'+id);
}

getStudentResult(id) {
  return this.http.get<StudentResult>(this.baseUrl + '/studentResult/' + id);
}

postStudentResult(studentResult) {
  return this.http.post(this.baseUrl + '/studentResult', studentResult);
}

putStudentResult(id, studentResult) {
  return this.http.put(this.baseUrl + '/studentResult/' + id, studentResult);
}

deleteStudentResult(id) {
  return this.http.delete(this.baseUrl + '/studentResult/' + id);
}

populateForm(row) {
  this.studentResultForm.patchValue({
    id:row['id'],
    studentRegId:row['studentRegId'],
    studentRegNo:row['studentRegNo'],
    name:row['studentName'],
    email:row['studentEmail'],
    departmentId:row["departmentId"],
    departmentCode:row["departmentCode"],
    courseId:row["courseId"],
    courseCode:row["courseCode"],
    grade:row["grade"]
  });
}



}
