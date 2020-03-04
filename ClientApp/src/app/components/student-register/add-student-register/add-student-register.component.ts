import { Component, OnInit, Inject } from '@angular/core';
import { StudentRegisterService } from 'src/app/shared/student-register.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student-register',
  templateUrl: './add-student-register.component.html',
  styleUrls: ['./add-student-register.component.css']
})
export class AddStudentRegisterComponent implements OnInit {

  departmentList: any;

  constructor(
    private studentRegisterService: StudentRegisterService,
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<AddStudentRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getDepartment();
  }

  onNoClick(): void {
    this.studentRegisterService.studentRegisterForm.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.studentRegisterService.studentRegisterForm.reset();
    this.studentRegisterService.initializeRegisterForm();
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

  onSubmit(studentRegisterForm) {
    if (this.studentRegisterService.studentRegisterForm.valid) {
      let student = {
        regNo: studentRegisterForm.get('regNo').value,
        name: studentRegisterForm.get('name').value,
        email: studentRegisterForm.get('email').value,
        mobile: studentRegisterForm.get('mobile').value,
        address: studentRegisterForm.get('address').value,
        departmentId: studentRegisterForm.get('departmentId').value,
        createdAt: studentRegisterForm.get('createdAt').value,
      };
      if (studentRegisterForm.get('id').value == null) {
        this.insertStudent(student);
      }
      else {
        let id = studentRegisterForm.get('id').value;
        let student = {
          id: studentRegisterForm.get('id').value,
          regNo: studentRegisterForm.get('regNo').value,
          name: studentRegisterForm.get('name').value,
          email: studentRegisterForm.get('email').value,
          mobile: studentRegisterForm.get('mobile').value,
          address: studentRegisterForm.get('address').value,
          departmentId: studentRegisterForm.get('departmentId').value,
          createdAt: studentRegisterForm.get('createdAt').value,
        };
        this.updateStudent(id, student);
      }
    }
    else {
      console.log("Please send valid data", this.studentRegisterService.studentRegisterForm.value);
    }
  }


  insertStudent(student) {
    return this.studentRegisterService.postStudentRegister(student).subscribe(
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

  updateStudent(id, student) {
    return this.studentRegisterService.putStudentRegister(id, student).subscribe(
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
