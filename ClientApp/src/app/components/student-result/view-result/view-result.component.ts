import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentResultService } from 'src/app/shared/student-result.service';
import { StudentResult } from 'src/app/models/student-result.models';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StudentRegisterService } from 'src/app/shared/student-register.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  studentRegNoList:any;
  ELEMENT_DATA: StudentResult[];
  studentDetails:any="";
  displayedColumns: string[] = [ 'courseCode','courseName','grade'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private studentResultService: StudentResultService,
    private studentRegisterService: StudentRegisterService,
  ) { }

  ngOnInit() {
    this.getAllRegNo();
  }

  
  getAllRegNo(){
    this.studentResultService.getAllRegNo().subscribe(
      res => {
        this.studentRegNoList=res;
      },
      error => {
        console.log(error);
      }
    );
  }


  filterByRegNo(id) {
    this.studentResultService.getAllStudentResultByRegNo(id).subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );

    this.studentRegisterService.getStudentRegister(id).subscribe(
      res => {
        this.studentDetails=res;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }


}
