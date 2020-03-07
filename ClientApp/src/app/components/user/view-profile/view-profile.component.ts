import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userProfile:any="";
  constructor(
    private userService:UserService,
    ) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile(){
    this.userService.getUserProfile().subscribe(
      res=>{
        this.userProfile=res;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
