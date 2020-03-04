import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AllocateClassRoom } from '../models/allocate-class-room.model';

@Injectable({
  providedIn: 'root'
})
export class AllocateClassRoomService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }
  // , Validators.required

  allocateClassRoomForm = this.fb.group({
    id: [null],
    departmentId: [null],
    departmentName: [''],
    courseId: [null],
    courseCode: [''],
    courseName: [''],
    roomId: [null],
    roomNumber: [''],
    day: [''],
    from: [''],
    to: ['']
  });

  initializeAllocateClassRoomForm() {
    this.allocateClassRoomForm.setValue({
      id: [null],
      departmentId: [null],
      departmentName: [''],
      courseId: [null],
      courseCode: [''],
      courseName: [''],
      roomId: [null],
      roomNumber: [''],
      day: [''],
      from: [''],
      to: ['']
    })
  }

  getAllRoom(){
   return this.http.get(this.baseUrl+'/room');
  }

  getAllAllocateClassRoom() {
    return this.http.get<AllocateClassRoom>(this.baseUrl + '/allocateClassRoom');
  }

  getAllocateClassRoom(id) {
    return this.http.get<AllocateClassRoom>(this.baseUrl + '/allocateClassRoom/' + id);
  }

  postAllocateClassRoom(allocateClassRoomForm) {
    return this.http.post(this.baseUrl + '/allocateClassRoom', allocateClassRoomForm);
  }

  putAllocateClassRoom(id, allocateClassRoomForm) {
    return this.http.put(this.baseUrl + '/allocateClassRoom/' + id, allocateClassRoomForm);
  }

  deleteAllocateClassRoom(id) {
    return this.http.delete(this.baseUrl + '/allocateClassRoom/' + id);
  }


  populateForm(allocateClassRoomForm) {
    this.allocateClassRoomForm.setValue(allocateClassRoomForm);
  }



}
