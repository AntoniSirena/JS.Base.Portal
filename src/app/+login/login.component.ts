import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {LoginService } from 'src/app/services/login/login.service';
import { Login } from 'src/app/models/login/login';
import { Response } from 'src/app/models/response/response';
import { FormControl, FormGroup, FormBuilder, Validators , FormArray} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService, private form: FormBuilder, private router :Router) { }

  ngOnInit() {

    this.loginForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(loginForm: any){

    const user = new Login();
    user.userName = loginForm.userName;
    user.password = loginForm.password;

    this.loginService.authenticate(user).subscribe((response: Response) => {
      console.log(response);
      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        }).then(() => {
          this.router.navigate(['']);
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 5000
        });
      }

    },
    error => { console.log(JSON.stringify(error));
    });

  }

}
