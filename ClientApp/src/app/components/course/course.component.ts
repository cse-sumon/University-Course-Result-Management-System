import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CourseDataSource, CourseItem } from './course-datasource';
import { CourseService } from 'src/app/shared/course.service';
import { Course } from 'src/app/models/course.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { AddCourseComponent } from './add-course/add-course.component';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent {
  ELEMENT_DATA:Course[];
  displayedColumns: string[] = ['code', 'name', 'credit', 'departmentName', 'semesterName', 'createdAt', 'action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource;

  constructor(private courseService: CourseService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
      });
     
  }

  onCreate(): void {
    this.courseService.courseForm.reset();
    this.courseService.formTitle = "Add New Course"
    this.courseService.buttonName = "Save"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    const dialogRef = this.dialog.open(AddCourseComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  };




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onDelete(id: number) {
    var result = confirm("Are you want to remove this?");
    if (result) {
      this.courseService.deleteCourse(id).subscribe(
        res => {
          this.toastr.warning("Deleted Successfully");
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
    }
  }


  onEdit(id: number) {
    this.courseService.getCourse(id).subscribe(
      res => {
        this.courseService.populateForm(res);
        this.courseService.formTitle = "Update Course"
        this.courseService.buttonName = "Update"
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "50%";
        this.dialog.open(AddCourseComponent, dialogConfig);
      },
      error => {
        console.log(error);
      });
  }



}
