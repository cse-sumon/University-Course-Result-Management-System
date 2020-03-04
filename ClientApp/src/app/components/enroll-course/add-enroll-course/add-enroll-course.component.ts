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
    private enrollCourseService: EnrollCourseService,
    private studentRegisterService: StudentRegisterService,
    private courseAssignService: CourseAssignToTeacherService,
    private dialogRef: MatDialogRef<AddEnrollCourseComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllRegisterStudent();

     //show course list & selected course with updated form
     var id = this.enrollCourseService.enrollCourseForm.get('studentRegId').value;
     if (id > 0) {
      this.onChangeStudentRegNo(id)
     }
  }

  onNoClick(): void {
    this.enrollCourseService.enrollCourseForm.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.enrollCourseService.enrollCourseForm.reset();
    this.enrollCourseService.initializeEnrollCourseForm();
  }

  getAllRegisterStudent() {
    this.studentRegisterService.getAllStudentRegister().subscribe(
      res => {
        this.studentRegNoList = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  onChangeStudentRegNo(id) {
    this.studentRegisterService.getStudentRegister(id).subscribe(
      res => {
        this.enrollCourseService.enrollCourseForm.patchValue({
          name: res["name"],
          email: res["email"],
          departmentCode: res["departmentName"]
        });
        var departmentId = res["departmentId"];
        this.getCourseByDepartmentId(departmentId);
      },
      error => {
        console.log(error);
      }
    )
  }

  getCourseByDepartmentId(id) {
    this.courseAssignService.getCourseByDepartmentId(id).subscribe(
      res => {
        this.courseList = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(enrollCourseForm) {
    if (this.enrollCourseService.enrollCourseForm.valid) {
      let enrollCourse = {
        studentRegId: enrollCourseForm.get('studentRegId').value,
        courseId: enrollCourseForm.get('courseId').value,
        createdAt: enrollCourseForm.get('createdAt').value,
      };
      if (enrollCourseForm.get('id').value == null) {
        this.insertEnrollCourse(enrollCourse);
      }
      else {
        let id = enrollCourseForm.get('id').value;
        let enrollCourse = {
          id: enrollCourseForm.get('id').value,
          studentRegId: enrollCourseForm.get('studentRegId').value,
          courseId: enrollCourseForm.get('courseId').value,
          createdAt: enrollCourseForm.get('createdAt').value,
        };
        this.updateEnrollCourse(id, enrollCourse);
      }
    }
    else {
      console.log("Please send valid data", this.enrollCourseService.enrollCourseForm.value);
    }
  }


  insertEnrollCourse(enrollCourse) {
    return this.enrollCourseService.postAllEnrollCourses(enrollCourse).subscribe(
      res => {
        this.toastr.success("Added Successfully!");
        console.log("Added");
        this.onClear();
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateEnrollCourse(id, enrollCourse) {
    return this.enrollCourseService.putAllEnrollCourses(id, enrollCourse).subscribe(
      res => {
        this.toastr.info("Updated Successfully!");
        console.log("Updated");
        this.onClear();
        this.onNoClick();
      },
      error => {
        console.log(error);
      }
    );
  }



}
