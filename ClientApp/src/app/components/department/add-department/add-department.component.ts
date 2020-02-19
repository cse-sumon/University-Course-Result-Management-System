import { Component, OnInit, Inject } from '@angular/core';
import { DepartmentService } from 'src/app/shared/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
 
  constructor(private departmentServie : DepartmentService,
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr:ToastrService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.departmentServie.departmentForm.reset();
    this.departmentServie.initializeDepartmentForm();
    this.dialogRef.close();
  }
  onClear(){
    this.departmentServie.departmentForm.reset();
    this.departmentServie.initializeDepartmentForm();
  }

  onSubmit(departmentForm){
    if (this.departmentServie.departmentForm.valid) {
      let department = {
        code: departmentForm.get('code').value,
        name: departmentForm.get('name').value,
      };
      if (this.departmentServie.departmentForm.get('id').value=="") {
        this.insertDepartment(department);
      }
      else {
       let id = departmentForm.get('id').value;
        let department = {
          id : departmentForm.get('id').value,
          code: departmentForm.get('code').value,
          name: departmentForm.get('name').value,
        };
        this.updateDepartment(id, department);
      }
      
    }
    else {
      console.log("Please send valid data", this.departmentServie.departmentForm.value);
    }
  }


  insertDepartment(department) {
    return this.departmentServie.postDepartment(department).subscribe(
      res => {
        this.toastr.success("Added Successfully!");
        console.log("Added");
        this.onClear();
        this.departmentServie.getAllDepartments();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateDepartment(id,department) {
    return this.departmentServie.putDepartment(id,department).subscribe(
      res => {
        this.toastr.info("Updated Successfully!");
        console.log("Updated");
        this.onClear();
        this.departmentServie.getAllDepartments();
      },
      error => {
        console.log(error);
      }
    );
  }

}
