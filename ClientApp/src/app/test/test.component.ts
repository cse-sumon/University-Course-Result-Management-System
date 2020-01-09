import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  data:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://localhost:44327/weatherforecast').subscribe(
      res=>{console.log(res);},
      err=>{console.log(err);}
    );
  }

}
