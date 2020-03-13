import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
Roles:string[]=['Admin','Teacher','Advisor','Student'];
  constructor(
    private service : UserService, 
    private toastr:ToastrService,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.service.formModel.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.service.formModel.reset();
  }


  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.service.initializeFormModel();
          this.toastr.success('New User Created!','Registration Successfull.');
        }
        else{
          res.errors.forEach(element => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('UserName is already taken.','Registration failed');
              break;
              default:
                  this.toastr.error(element.description,'Registration failed.');
              break;
            }
          });
          
        }
      },
      err=>{
        console.log(err);
      }
    )
  }













}
