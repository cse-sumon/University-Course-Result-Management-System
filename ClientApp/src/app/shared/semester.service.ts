import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SemesterService {
   baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllSemesters(){
    return this.http.get(this.baseUrl+'/semester');
  }
}