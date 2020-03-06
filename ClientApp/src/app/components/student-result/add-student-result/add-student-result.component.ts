import { Component, OnInit, Inject } from '@angular/core';
import { StudentRegisterService } from 'src/app/shared/student-register.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { StudentResultService } from 'src/app/shared/student-result.service';
import { CourseAssignToTeacherService } from 'src/app/shared/course-assign-to-teacher.service';
import { EnrollCourseComponent } from '../../enroll-course/enroll-course.component';
import { EnrollCourseService } from 'src/app/shared/enroll-course.service';

@Component({
  selector: 'app-add-student-result',
  templateUrl: './add-student-result.component.html',
  styleUrls: ['./add-student-result.component.css']
})
export class AddStudentResultComponent implements OnInit {
  studentRegNoList;
  courseList;
  gradeList: string[] = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];
  constructor(
    private studentResultService: StudentResultService,
    private studentRegisterService: StudentRegisterService,
    private enrollCourseService: EnrollCourseService,
    private dialogRef: MatDialogRef<AddStudentResultComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllRegisterStudent();

    //show course list & selected course with updated form
    var id = this.studentResultService.studentResultForm.get('studentRegId').value;
    if (id > 0) {
      this.onChangeStudentRegNo(id)
    }
  }

  onNoClick(): void {
    this.studentResultService.studentResultForm.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.studentResultService.studentResultForm.reset();
    this.studentResultService.initializeStudentResultForm();
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
        this.studentResultService.studentResultForm.patchValue({
          name: res["name"],
          email: res["email"],
          departmentCode: res["departmentName"]
        });
        this.getEnrollCoursesByRegId(id);
      },
      error => {
        console.log(error);
      }
    )
  }

  getEnrollCoursesByRegId(id) {
    this.enrollCourseService.getEnrollCourseByRegId(id).subscribe(
      res => {
        this.courseList = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(studentResultForm) {
    if (this.studentResultService.studentResultForm.valid) {
      let studentResult = {
        studentRegId: studentResultForm.get('studentRegId').value,
        courseId: studentResultForm.get('courseId').value,
        grade: studentResultForm.get('grade').value,
      };
      if (studentResultForm.get('id').value == null) {
        this.insertStudentResult(studentResult);
      }
      else {
        let id = studentResultForm.get('id').value;
        let studentResult = {
          id: studentResultForm.get('id').value,
          studentRegId: studentResultForm.get('studentRegId').value,
          courseId: studentResultForm.get('courseId').value,
          grade: studentResultForm.get('grade').value,
        };
        this.updateStudentResult(id, studentResult);
      }
    }
    else {
      console.log("Please send valid data", this.studentResultService.studentResultForm.value);
    }
  }


  insertStudentResult(studentResult) {
    return this.studentResultService.postStudentResult(studentResult).subscribe(
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

  updateStudentResult(id, studentResult) {
    return this.studentResultService.putStudentResult(id, studentResult).subscribe(
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
