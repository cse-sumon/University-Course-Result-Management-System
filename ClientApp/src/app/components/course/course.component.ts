import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CourseDataSource, CourseItem } from './course-datasource';
import { CourseService } from 'src/app/shared/course.service';
import { Course } from 'src/app/models/course.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddCourseComponent } from './add-course/add-course.component';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'] 
})

export class CourseComponent {
  ELEMENT_DATA: Course[]=[];
  displayedColumns: string[] = [ 'code', 'name', 'credit','departmentName','semesterName','createdAt','action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  constructor(private courseService : CourseService, 
    private toastr:ToastrService,
    private dialog: MatDialog,
    ) { }


  ngOnInit() {
    this.getCourses();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  getCourses(){
    this.courseService.getAllCourses().subscribe(
      res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      },
      error => {
        console.log(error);
      });
  }

  onCreate() {
    this.courseService.formTitle="Add New Course"
    this.courseService.buttonName="Save"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddCourseComponent, dialogConfig);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onDelete(id:number){
    this.courseService.deleteCourse(id).subscribe(
      res=>{
        this.toastr.warning("Delete Successfully");
        this.ngOnInit();
      },
      error=>{
        console.log(error);
      });
  }


  onEdit(id:number){
    this.courseService.getCourse(id).subscribe(
      res=>{
        console.log(res);
      },
      error=>{
        console.log(error);
      });
  }
 
 

}
