import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {ExternalService } from 'src/app/services/external/external.service';
import { User } from 'src/app/models/user/user';
import { Response } from 'src/app/models/response/response';
import { FormControl, FormGroup, FormBuilder, Validators , FormArray} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  response: Response;

  constructor(private externalService: ExternalService, private form: FormBuilder) { }

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

    this.externalService.createUser(user).subscribe(response => {
    console.log(response);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: true,
      timer: 4000
    })
    },
    error => { console.log(JSON.stringify(error));
    });
  }

}
