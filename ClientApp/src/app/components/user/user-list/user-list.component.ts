import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  ELEMENT_DATA;
  displayedColumns: string[] = ['id', 'fullName', 'userName','email', 'phoneNumber', 'createdBy', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
 
  }



  onCreate(): void {
    this.userService.formModel.reset();
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '50%',
      data: {formTitle: "Add New User", buttonName: "Submit"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
