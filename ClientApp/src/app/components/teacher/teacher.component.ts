import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from 'src/app/shared/teacher.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Teacher } from 'src/app/models/Teacher.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  ELEMENT_DATA: Teacher[];
  displayedColumns: string[] = ['id', 'code', 'name', 'createdAt', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private teacherService: TeacherService,
    private departmentServie: DepartmentService,
    private toastr : ToastrService,
    private dialog : MatDialog
    ) { }

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
