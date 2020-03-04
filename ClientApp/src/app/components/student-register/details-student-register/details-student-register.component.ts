import { Component, OnInit, Inject } from '@angular/core';
import { DetailsTeacherComponent } from '../../teacher/details-teacher/details-teacher.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentRegisterService } from 'src/app/shared/student-register.service';
import { StudentRegister } from 'src/app/models/student-register.model';

@Component({
  selector: 'app-details-student-register',
  templateUrl: './details-student-register.component.html',
  styleUrls: ['./details-student-register.component.css']
})
export class DetailsStudentRegisterComponent implements OnInit {
  details: StudentRegister;

  constructor(
    public dialogRef: MatDialogRef<DetailsTeacherComponent>,
    private studentRegisterService: StudentRegisterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.details = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
