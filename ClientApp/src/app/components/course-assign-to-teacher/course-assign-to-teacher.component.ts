import { Component, OnInit, ViewChild } from '@angular/core';
import { AddCourseAssignToTeacherComponent } from './add-course-assign-to-teacher/add-course-assign-to-teacher.component';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CourseAssignToTeacherService } from 'src/app/shared/course-assign-to-teacher.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { Department } from 'src/app/models/department.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-assign-to-teacher',
  templateUrl: './course-assign-to-teacher.component.html',
  styleUrls: ['./course-assign-to-teacher.component.css']
})
export class CourseAssignToTeacherComponent implements OnInit {
  departmentList: Department[];
  ELEMENT_DATA: any;
  displayedColumns: string[] = ['courseCode', 'courseName', 'semester', 'teacherName', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private courseAssignService: CourseAssignToTeacherService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getDepartment();
    this.getAllCourseAssign();
  }

  getAllCourseAssign() {
    this.courseAssignService.getAllCourseAssign().subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    )
  }

  getDepartment() {
    this.departmentService.getAllDepartments().subscribe(
      res => {
        this.departmentList = <any>res;
      },
      error => {
        console.log(error);
      }
    );
  }


  getCourseAssign(id: number) {
    this.courseAssignService.getCourseAssignByDepartmentId(id).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByDepartment(id) {
    if (id == 0) {
      this.getAllCourseAssign();
      return;
    }
    this.courseAssignService.getCourseAssignByDepartmentId(id).subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    )
  }


  onCreate(): void {
    // this.teacherService.teacherForm.reset();
    const dialogRef = this.dialog.open(AddCourseAssignToTeacherComponent, {
      width: '50%',
      data: { formTitle: "Course Assign to Teacher", buttonName: "Submit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  onEdit(row) {
    // let id = row["id"];
    // let departmentId = row["departmentId"];
    // let teacherId = row["courseId"];
    // let courseId = row["courseId"];
    // this.courseAssignService.populateForm(row);
    // const dialogRef = this.dialog.open(AddCourseAssignToTeacherComponent, {
    //   width: '50%',
    //   data: { formTitle: "Update Course Assign to Teacher", buttonName: "Update" }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });

    alert("You can't able to edit this");

  }

  onDelete(id) {
    var con = confirm('Are you want to remove this?')
    if (con) {
      this.courseAssignService.deleteCourseAssign(id).subscribe(
        res => {
          this.toastr.warning('Deleted Successfully');
          this.ngOnInit();
          console.log('Deleted');
        },
        error => {
          console.log(error);
        }
      )
    }
  }









}
