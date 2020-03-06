import { Component, OnInit } from '@angular/core';
import { UnassingAndUnallocateService } from 'src/app/shared/unassing-and-unallocate.service';
import { ToastrService } from 'ngx-toastr';
import { AllocateClassRoomService } from 'src/app/shared/allocate-class-room.service';
import { CourseAssignToTeacherService } from 'src/app/shared/course-assign-to-teacher.service';

@Component({
  selector: 'app-unassign-and-unallocate',
  templateUrl: './unassign-and-unallocate.component.html',
  styleUrls: ['./unassign-and-unallocate.component.css']
})
export class UnassignAndUnallocateComponent implements OnInit {

  constructor(
    private allocateClassRoomService: AllocateClassRoomService,
    private courseAssignService:CourseAssignToTeacherService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }


  unAllocateAllClassRooms(){
    let con = confirm('Are you sure to remove all AllocatedClassRooms?')
    if(con){
      this.allocateClassRoomService.unAllocateAllClassRooms().subscribe(
        res=>{
          this.toastr.success('All Class Room UnAllocated Successfully!');
        },
        error=>{
          console.log(error);
        }
      )
    }
  }

  
  unAssignAllCourses(){
    let con = confirm('Are you sure to remove all Assigned Courses?')
    if(con){
      this.courseAssignService.unAssignAllCourses().subscribe(
        res=>{
          this.toastr.success('All Courses UnAssigned Successfully!');
        },
        error=>{
          console.log(error);
        }
      )
    }
   
  }

}
