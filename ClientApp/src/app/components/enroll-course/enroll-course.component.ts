import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollCourse } from 'src/app/models/enroll-course.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { EnrollCourseService } from 'src/app/shared/enroll-course.service';
import { ToastrService } from 'ngx-toastr';
import { AddEnrollCourseComponent } from './add-enroll-course/add-enroll-course.component';

@Component({
  selector: 'app-enroll-course',
  templateUrl: './enroll-course.component.html',
  styleUrls: ['./enroll-course.component.css']
})
export class EnrollCourseComponent implements OnInit {

  ELEMENT_DATA: EnrollCourse[];
  displayedColumns: string[] = ['id', 'studentRegNo', 'studentName', 'studentEmail', 'departmentCode', 'courseCode', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private enrollCourseService: EnrollCourseService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getEnrollCourse()
  }

  getEnrollCourse() {
    this.enrollCourseService.getAllEnrollCourses().subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // onViewDetails(row: any) {
  //   this.studentRegisterService.populateForm(row);
  //   const dialogRef = this.dialog.open(DetailsStudentRegisterComponent, {
  //     width: '50%',
  //     height: '300px',
  //     data: { title: "Registered Student Details", rowData: row }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }


  onCreate(): void {
    this.enrollCourseService.enrollCourseForm.reset();
    this.enrollCourseService.enrollCourseForm.patchValue({
      createdAt: new Date
    })
    const dialogRef = this.dialog.open(AddEnrollCourseComponent, {
      width: '50%',
      data: { formTitle: "Add Enroll Course", buttonName: "Submit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onEdit(row) {
    this.enrollCourseService.populateForm(row);
    const dialogRef = this.dialog.open(AddEnrollCourseComponent, {
      width: '50%',
      data: { formTitle: "Update Enroll Course", buttonName: "Update" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onDelete(id: number) {
    var result = confirm('Are you want to remove this ?')
    if (result) {
      this.enrollCourseService.deleteEnrollCourse(id).subscribe(
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
