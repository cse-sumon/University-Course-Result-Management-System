import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/shared/department.service';
import { ClassScheduleService } from 'src/app/shared/class-schedule.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent implements OnInit {
  departmentList:any='';
  scheduleInfo:any='';
  constructor(
    private departmentService:DepartmentService,
    private classScheduleService:ClassScheduleService
  ) { }

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments(){
    this.departmentService.getAllDepartments().subscribe(
      res=>{
        this.departmentList=res;
      },
      error=>{
        console.log(error);
      }
    )
  }

  getClassScheduleByDeptId(id) {
    this.classScheduleService.getClassScheduleByDeptId(id).subscribe(
      res => {
        this.scheduleInfo=res;
      },
      error => {
        console.log(error);
      }
    )
  }

}
