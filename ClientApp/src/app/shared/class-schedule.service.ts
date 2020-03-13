import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassScheduleService {
  baseUrl= environment.baseUrl;
  constructor(
    private http:HttpClient
  ) { }

  getClassScheduleByDeptId(id){
    return this.http.get(this.baseUrl+'/AllocateClassRoom/GetClassScheduleByDepartmentId/'+id);
  }
}
