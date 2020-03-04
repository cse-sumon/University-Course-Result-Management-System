import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, throwToolbarMixedModesError, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { TeacherService } from 'src/app/shared/teacher.service';
import { CourseService } from 'src/app/shared/course.service';
import { CourseAssignToTeacherService } from 'src/app/shared/course-assign-to-teacher.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/shared/department.service';
import { Teacher } from 'src/app/models/Teacher.model';
import { Course } from 'src/app/models/course.model';
import { TeacherComponent } from '../../teacher/teacher.component';
import { Department } from 'src/app/models/department.model';


@Component({
  selector: 'app-add-course-assign-to-teacher',
  templateUrl: './add-course-assign-to-teacher.component.html',
  styleUrls: ['./add-course-assign-to-teacher.component.css']
})
export class AddCourseAssignToTeacherComponent implements OnInit {

  departmentList: Department[];
  teacherList: Teacher[];
  courseList: Course[];
  takenCredit: any;


  constructor(
    private dialogRef: MatDialogRef<AddCourseAssignToTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private courseAssignService: CourseAssignToTeacherService,
    private toastr: ToastrService,
    private departmentService: DepartmentService,
  ) { }

  ngOnInit() {
    this.getDepartment();
  }

  clearValue() {
    this.courseAssignService.courseAssignForm.patchValue({
      totalCredit: [''],
      remainingCredit: [''],
      courseName: [''],
      credit: [''],
      createdAt: ['']
    })
  }



  onNoClick(): void {
    this.courseService.courseForm.reset();
    this.clearValue();
    this.dialogRef.close();
  }



  onClear() {
    this.courseAssignService.courseAssignForm.reset();
    this.courseAssignService.initializeCourseAssignForm();
    this.clearValue();
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

  onChangeDepartment(id) {
    this.clearValue();
    this.courseAssignService.getTeacherByDepartmentId(id).subscribe(
      res => {
        this.teacherList = <any>res;
      },
      error => {
        console.log(error);
      }
    );
    this.courseAssignService.getCourseByDepartmentId(id).subscribe(
      res => {
        this.courseList = <any>res;
      },
      error => {
        console.log(error);
      }
    )
  }

  onChangeTeacher(id) {
    this.getTakenCredit(id);
    this.teacherService.getTeacher(id).subscribe(
      res => {
        this.courseAssignService.courseAssignForm.patchValue({
          totalCredit: res["totalCredit"],
          remainingCredit: (res["totalCredit"]) - (this.takenCredit)
        });
      },
      error => {
        console.log(error);
      }
    );
  }


  getTakenCredit(id) {
    this.courseAssignService.getCreditByTeacherId(id).subscribe(
      res => {
        this.takenCredit = res;
      },
      error => {
        console.log(error);
      });
  }


  onChangeCourse(id) {
    this.courseService.getCourse(id).subscribe(
      res => {
        // this.credit = res["credit"];
        this.courseAssignService.courseAssignForm.patchValue({
          courseName: res["name"],
          credit: res["credit"],
          createdAt: new Date,
        });
      },
      error => {
        console.log(error);
      }
    )
  }



  onSubmit(courseAssignForm) {
    let credit:Boolean = this.checkRemainingCredit();
    if(!credit){
      return;
    }
    
    if (this.courseAssignService.courseAssignForm.valid) {
      let courseAssign = {
        departmentId: courseAssignForm.get('departmentId').value,
        teacherId: courseAssignForm.get('teacherId').value,
        courseId: courseAssignForm.get('courseId').value,
        createdAt: courseAssignForm.get('createdAt').value,
      };
      if (courseAssignForm.get('id').value == null) {
        this.insertCourseAssign(courseAssign);
      }
      else {
        let id = courseAssignForm.get('id').value;
        let courseAssign = {
          id : id,
          departmentId: courseAssignForm.get('departmentId').value,
          teacherId: courseAssignForm.get('teacherId').value,
          courseId: courseAssignForm.get('courseId').value,
          createdAt: courseAssignForm.get('createdAt').value,
        };
        this.updateCourseAssign(id, courseAssign);
      }
    }
    else {
      console.log("Please send valid data", this.courseAssignService.courseAssignForm.value);
    }
  }


  insertCourseAssign(courseAssign) {
    return this.courseAssignService.postCourseAssign(courseAssign).subscribe(
      res => {
        this.toastr.success("Added Successfully!");
        console.log("Added");
        this.onClear();
        this.ngOnInit();
      },
      error => {
        if(error.error=="Duplicate"){
          this.toastr.warning("This Course already taken by another teacher!")
        }
        
        console.log(error);
      }
    );
  }

  updateCourseAssign(id, courseAssign) {
    return this.courseAssignService.putCourseAssign(id, courseAssign).subscribe(
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

  checkRemainingCredit():boolean{
    var totalCredit = this.courseAssignService.courseAssignForm.get('totalCredit').value;
    var remainingCredit = this.courseAssignService.courseAssignForm.get('remainingCredit').value;
    var credit = this.courseAssignService.courseAssignForm.get('credit').value;
    if((remainingCredit-credit) <= totalCredit){
      return true;
    }
    else{
      alert("You may take maximum " +totalCredit+ " credit");
      return false;
    }
  }













}
