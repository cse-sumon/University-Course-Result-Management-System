import { Component, OnInit, Inject } from '@angular/core';
import { CourseService } from 'src/app/shared/course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SemesterService } from 'src/app/shared/semester.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { Course } from 'src/app/models/course.model';
import { ToastrService } from 'ngx-toastr';
import { Semester } from 'src/app/models/semester.model';
import { Department } from 'src/app/models/department.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  semesterList: Semester[];
  departmentList: Department[];

  constructor(private courseService: CourseService, private fb: FormBuilder,
    private semesterService: SemesterService, private departmentService: DepartmentService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    this.getSemester();
    this.getDepartment();

  }

  onNoClick(): void {
    this.courseService.courseForm.reset();
    this.courseService.initializeCourseForm();
    this.dialogRef.close();
  }


  clearForm() {
    this.courseService.courseForm.reset();
    this.courseService.initializeCourseForm();
  }

  getSemester() {
    this.semesterService.getAllSemesters().subscribe(
      res => {
        this.semesterList = <any>res;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDepartment() {
    this.departmentService.getAllDepartments().subscribe(
      res => {
        this.departmentList =<any> res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(courseForm) {
    if (this.courseService.courseForm.valid) {
      let course = {
        code: courseForm.get('code').value,
        name: courseForm.get('name').value,
        credit: courseForm.get('credit').value,
        description: courseForm.get('description').value,
        departmentId:Number( courseForm.get('departmentId').value),
        semesterId: Number(courseForm.get('semesterId').value)
      };
      if (!this.courseService.courseForm.get('id').value) {
        this.insertCourse(course);
      }
      else {
       let id = courseForm.get('id').value;
        let course = {
          id : courseForm.get('id').value,
          code: courseForm.get('code').value,
          name: courseForm.get('name').value,
          credit: courseForm.get('credit').value,
          description: courseForm.get('description').value,
          departmentId: courseForm.get('departmentId').value,
          semesterId: courseForm.get('semesterId').value
        };
        this.updateCourse(id, course);
      }
      
    }
    else {
      console.log("Please send valid data", this.courseService.courseForm.value);
    }
  }


  insertCourse(course) {
    return this.courseService.postCourse(course).subscribe(
      res => {
        this.toastr.success("Added Successfully!");
        console.log("Added");
        this.clearForm();
        this.courseService.getAllCourses();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCourse(id,course) {
    return this.courseService.putCourse(id,course).subscribe(
      res => {
        this.toastr.info("Updated Successfully!");
        console.log("Updated");
        this.clearForm();
        this.courseService.getAllCourses();
      },
      error => {
        console.log(error);
      }
    );
  }



}



