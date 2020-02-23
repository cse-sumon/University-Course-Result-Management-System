import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from 'src/app/shared/teacher.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Teacher } from 'src/app/models/Teacher.model';
import { DetailsTeacherComponent } from './details-teacher/details-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  ELEMENT_DATA: Teacher[];
  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'designationName', 'departmentCode', 'totalCredit', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private teacherService: TeacherService,
    private departmentServie: DepartmentService,
    private toastr: ToastrService,
    private dialog: MatDialog
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
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onViewDetails(row:any) {
     this.teacherService.populateForm(row);
    const dialogRef = this.dialog.open(DetailsTeacherComponent, {
      width: '50%',
      data: { title: "Teacher Details", rowData:row}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  onCreate(): void {
    this.teacherService.teacherForm.reset();
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '50%',
      data: {formTitle: "Add New Teacher", buttonName: "Submit"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onEdit(row:Teacher){
    this.teacherService.populateForm(row);
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '50%',
      data: {formTitle: "Update Teacher", buttonName: "Update"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onDelete(id:number){
    var result = confirm('Are you want to remove this ?')
    if (result) {
      this.teacherService.deleteTeacher(id).subscribe(
        res => {
          this.toastr.warning("Deleted Successfully");
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
    }
  }





}


