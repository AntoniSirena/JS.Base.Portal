import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {ExternalService } from 'src/app/services/external/external.service';
import { User } from 'src/app/models/user/user';
import { Response } from 'src/app/models/response/response';
import { FormControl, FormGroup, FormBuilder, Validators , FormArray} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  constructor(private externalService: ExternalService, private form: FormBuilder, private router :Router) { }

  ngOnInit() {

    this.myForm = this.form.group({
      userName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surName: ['', Validators.required]
    });

  }

  onSubmit(formValue: any){

    const user = new User();
    user.id = 0,
    user.userName = formValue.userName,
    user.emailAddress = formValue.emailAddress,
    user.password = formValue.password,
    user.name = formValue.name,
    user.surName = formValue.surName,
    user.statusId = 0,
    user.personId = null,
    user.image = null,
    user.isActive = true,
    user.isDeleted = false,
    user.creatorUserId = null,
    user.creationTime = null,
    user.lastModifierUserId = null,
    user.lastModifierUserId = null,
    user.deleterUserId = null,
    user.deletionTime = null

    this.externalService.createUser(user).subscribe((response: Response) => {

      if(response.Code !== '000'){
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }
      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        }).then(() => {
          this.router.navigate(['/login']);
        });

      }

    },
    error => { console.log(JSON.stringify(error));
    });
  }

}
