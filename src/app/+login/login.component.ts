import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators , FormArray} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {LoginService } from 'src/app/services/login/login.service';
import { Login } from 'src/app/models/login/login';
import { BaseService } from 'src/app/services/base/base.service';
import { ExternalService } from 'src/app/services/external/external.service';

import { Response } from 'src/app/models/response/response';
import { Configuration, Enterprise } from 'src/app/templates/configuration';
import { Profile, User } from 'src/app/models/profile/profile';
import { Permission } from 'src/app/models/permission/permission';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  enterpriseConfig = new Configuration();
  profile = new Profile();
  user = new User();
  permission = new Permission();
  enterpriseInfo = new Enterprise();

  //constructor
  constructor(
    private loginService: LoginService, 
    private baseService: BaseService, 
    private externalService: ExternalService,
    private form: FormBuilder, 
    private router :Router){ 

    }

  ngOnInit() {

    this.loginForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.getEnterpriseInfo();
  }

  onSubmit(loginForm: any){

    const user = new Login();
    user.userName = loginForm.userName;
    user.password = loginForm.password;

    this.loginService.authenticate(user).subscribe((response: Response) => {

      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.router.navigate(['portada']).then(() =>{
            window.location.reload();
          });
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        });
      }

      //Cache Storega
      this.enterpriseConfig = response.Data;
      //console.log( JSON.stringify(this.enterpriseConfig.Configuration.Data.Enterprise));
      localStorage.setItem("enterprise", `${ JSON.stringify(this.enterpriseConfig.Configuration.Data.Enterprise) }`)

      this.profile = response.Data;
      //console.log(this.profile.Profile.Person);
      //console.log(this.profile.Profile.User);
      localStorage.setItem("currentPerson", `${ JSON.stringify(this.profile.Profile.Person) }`);
      localStorage.setItem("currentUser", `${ JSON.stringify(this.profile.Profile.User) }`);

      localStorage.setItem("rolShortName", `${ JSON.stringify(this.profile.Profile.User.RolShortName) }`);
      localStorage.setItem("currentMenuTemplate", `${ JSON.stringify(this.profile.Profile.User.MenuTemplate) }`);

      this.permission = response.Data;
      //console.log(this.permission.Permissions);
      localStorage.setItem("permissions", `${ JSON.stringify(this.permission.Permissions) }`);

      localStorage.setItem("isSectionActive", `${ JSON.stringify(1)}`);

      //Token
      localStorage.setItem("token", `${ JSON.stringify(this.profile.Profile.User.Token)}`);

    },
    error => { console.log(JSON.stringify(error));
    });

  }


  getEnterpriseInfo(){
    this.externalService.getEnterpriseInfo().subscribe((response: Response) => {
     this.enterpriseInfo = response.Data;
    },
    error => { console.log(JSON.stringify(error));
    });

  }

}
