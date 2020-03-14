import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    user:any='';

  constructor(private breakpointObserver: BreakpointObserver,
    private service: UserService,
    private router: Router) { }

    ngOnInit() {
      this.getUserName();
    }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  viewProfile() {
    this.router.navigate(['dashboard/viewProfile']);
  }


  getUserName(){
    this.service.getUserProfile().subscribe(
      res=>{
        this.user=res;
      },
      error=>{
        console.log(error);
      }
    )
  }


}
