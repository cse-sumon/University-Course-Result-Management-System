import { Component, OnInit, Inject } from '@angular/core';
import { TeacherService } from 'src/app/shared/teacher.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { inject } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { Teacher } from 'src/app/models/Teacher.model';
import { DepartmentService } from 'src/app/shared/department.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  designationList: any;
  departmentList: any;
  constructor(
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<AddTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getDepartment();
    this.getDesignation();
  }

  onNoClick(): void {
    this.teacherService.teacherForm.reset();
    this.teacherService.initializeTeacherForm();
    this.dialogRef.close();
  }

  onClear() {
    this.teacherService.teacherForm.reset();
    this.teacherService.initializeTeacherForm();
  }

  getDesignation() {
    this.teacherService.getAllDesignations().subscribe(
      res => {
        this.designationList = <any>res;
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
    )
  }

  onSubmit(teacherForm) {
    if (this.teacherService.teacherForm.valid) {
      let teacher = {
        name: teacherForm.get('name').value,
        email: teacherForm.get('email').value,
        mobile: teacherForm.get('mobile').value,
        address: teacherForm.get('address').value,
        departmentId: teacherForm.get('departmentId').value,
        designationId: teacherForm.get('designationId').value,
        totalCredit: teacherForm.get('totalCredit').value,
        createdAt: teacherForm.get('createdAt').value,
      };
      if (teacherForm.get('id').value == "") {
        this.insertTeacher(teacher);
      }
      else {
        let id = teacherForm.get('id').value;
        let teacher = {
          id : teacherForm.get('id').value,
          name: teacherForm.get('name').value,
          email: teacherForm.get('email').value,
          mobile: teacherForm.get('mobile').value,
          address: teacherForm.get('address').value,
          departmentId: teacherForm.get('departmentId').value,
          designationId: teacherForm.get('designationId').value,
          totalCredit: teacherForm.get('totalCredit').value,
          createdAt: teacherForm.get('createdAt').value,
        };
        this.updateTeacher(id, teacher);
      }
    }
    else {
      console.log("Please send valid data", this.teacherService.teacherForm.value);
    }
  }


  insertTeacher(teacher){
    return this.teacherService.postTeacher(teacher).subscribe(
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

  updateTeacher(id,teacher) {
    return this.teacherService.putTeacher(id,teacher).subscribe(
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
