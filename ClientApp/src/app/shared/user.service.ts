import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BaseURI = environment.baseUrl;

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  formModel = this.fb.group({
    id:[null],
    UserName: ['', Validators.required],
    Email: ['', [Validators.required,Validators.email]],
    FullName: ['',Validators.required],
    PhoneNumber: [''],
    Role: ['',Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register(){
    var body={
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName : this.formModel.value.FullName,
      Password : this.formModel.value.Passwords.Password
    };

    return this.http.post(this.BaseURI+'/ApplicationUser/Register',body);
  }

  login(formData){
    return this.http.post(this.BaseURI+'/ApplicationUser/Login',formData);
  }
  
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }


  getUserProfile(){
    return this.http.get(this.BaseURI +'/ApplicationUser/GetUserProfile');
  }

  
 
}
