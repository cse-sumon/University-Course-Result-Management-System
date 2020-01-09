import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails:any='';
  constructor(private service:UserService, private router:Router) { }

  ngOnInit() {

    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails=res;
      },
      err=>{
        console.log(err);
      }
    )
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);

  }

}
