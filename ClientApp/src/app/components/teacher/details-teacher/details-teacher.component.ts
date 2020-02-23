import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeacherService } from 'src/app/shared/teacher.service';
import { Teacher } from 'src/app/models/Teacher.model';

@Component({
  selector: 'app-details-teacher',
  templateUrl: './details-teacher.component.html',
  styleUrls: ['./details-teacher.component.css']
})
export class DetailsTeacherComponent implements OnInit {
 details:Teacher;
  constructor(
    public dialogRef: MatDialogRef<DetailsTeacherComponent>,
    private teacherService : TeacherService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    this.details=this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
