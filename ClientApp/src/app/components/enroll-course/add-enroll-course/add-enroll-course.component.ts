import { Component, OnInit, Inject } from '@angular/core';
import { EnrollCourseService } from 'src/app/shared/enroll-course.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { StudentRegisterService } from 'src/app/shared/student-register.service';
import { CourseService } from 'src/app/shared/course.service';
import { CourseAssignToTeacherService } from 'src/app/shared/course-assign-to-teacher.service';

@Component({
  selector: 'app-add-enroll-course',
  templateUrl: './add-enroll-course.component.html',
  styleUrls: ['./add-enroll-course.component.css']
})
export class AddEnrollCourseComponent implements OnInit {
  studentRegNoList;
  courseList;
  constructor(
    private enrollCourseService : EnrollCourseService,
    private studentRegisterService : StudentRegisterService,
    private courseAssignService : CourseAssignToTeacherService,
    private dialogRef: MatDialogRef<AddEnrollCourseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllRegisterStudent();
  }

  onNoClick(): void {
    this.enrollCourseService.enrollCourseForm.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.enrollCourseService.enrollCourseForm.reset();
    this.enrollCourseService.initializeEnrollCourseForm();
  }

getAllRegisterStudent(){
  this.studentRegisterService.getAllStudentRegister().subscribe(
    res =>{
      this.studentRegNoList = res;
    },
    error=>{
      console.log(error);
    }
  )
}

onChangeStudentRegNo(id){
  this.studentRegisterService.getStudentRegister(id).subscribe(
    res=>{
      this.enrollCourseService.enrollCourseForm.patchValue({
        name: res["name"],
        email: res["email"],
        departmentCode: res["departmentName"]
      });
      var departmentId = res["departmentId"];
      this.getCourseByDepartmentId(departmentId);
    },
    error=>{
      console.log(error);
    }
  )
}

getCourseByDepartmentId(id){
  this.courseAssignService.getCourseByDepartmentId(id).subscribe(
    res =>{
      this.courseList = res;
    },
    error=>{
      console.log(error);
    }
  )
}





}
