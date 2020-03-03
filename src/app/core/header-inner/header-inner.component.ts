import { Component } from '@angular/core';
import { Person, User } from 'src/app/models/profile/profile';
import { BaseService } from 'src/app/services/base/base.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User as UserModel } from 'src/app/models/user/user';
import { Gender } from 'src/app/models/common/gender/gender';
import { LocatorsTypes } from 'src/app/models/common/locatorsTypes/locators-types';
import { InfoCurrentUser } from 'src/app/models/common/infoCurrentUser/info-current-user';
import { InfoCurrentPerson } from 'src/app/models/common/infoCurrentPerson/info-current-person';
import { InfoCurrentLocators } from 'src/app/models/common/infoCurrentLocators/info-current-locators';

import { FormControl, FormGroup, FormBuilder, Validators , FormArray} from '@angular/forms';
import { Response } from 'src/app/models/response/response';


@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})

export class HeaderInnerComponent {

  user = new User();
  person = new Person();
  userModel = new UserModel();
  gender = new Gender();
  locatorsTypes = new LocatorsTypes();
  infoCurrentUser = new InfoCurrentUser();
  infoCurrentPerson = new InfoCurrentPerson();
  infoCurrentLocators = new InfoCurrentLocators();

  userTab: boolean = false;
  personTab: boolean = false;
  locatorsTab: boolean = false;

  userForm: FormGroup;
  personForm: FormGroup;
  locatorsForm: FormGroup;

  profileImage: any = {image:''};

  //contructor
  constructor(
    private baseService: BaseService,
    private commonService: CommonService,
    private router :Router,
    private form: FormBuilder){

      this.user = baseService.getCurrentUser();
      this.person = baseService.getCurrentPerson();

      this.getInfoCurrentUser();
      this.getGenders();
      this.getInfoCurrentPerson();
      this.getLocatorsTypes();
      this.getInfoCurrentLocators();
    }


  ngOnInit() {
    this.userForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]]
    });

  }

  profile(){
    alert('perfil');
  }


  uploadImage(){
    console.log(this.profileImage.image);
  }
  

  signOut(){
    Swal.fire({
      title: 'Esta seguro que desea salir ?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir'
    }).then((result) => {
      this.router.navigate(['/login']);
      localStorage.clear();
    });

  }

  
  openTabs(evt, tabName){
    var i, tabcontent, tablinks;
    
    switch(tabName){
      case 'User':

        //Llenando los input del tab usuario
        this.userForm = this.form.group({
          userName: [`${this.infoCurrentUser.UserName}`, Validators.required],
          password: [`${this.infoCurrentUser.Password}`, [Validators.required, Validators.minLength(8)]],
          name: [`${this.infoCurrentUser.Name}`, Validators.required],
          surName: [`${this.infoCurrentUser.SurName}`, Validators.required],
          emailAddress: [`${this.infoCurrentUser.EmailAddress}`, [Validators.required, Validators.email]]
        });

      break;

      case 'Person':
      
      break;

      case 'Locators':

      break;

      default:''
      break;
    }

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  getGenders(){
    this.commonService.getGenders().subscribe((response: Gender) => {
      this.gender = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }

  getLocatorsTypes(){
    this.commonService.getLocatorsTypes().subscribe((response: LocatorsTypes) => {
      this.locatorsTypes = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }

  getInfoCurrentUser(){
    this.commonService.getInfoCurrentUser().subscribe((response: InfoCurrentUser) => {
      this.infoCurrentUser = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }

  getInfoCurrentPerson(){
    this.commonService.getInfoCurrentPerson().subscribe((response: InfoCurrentPerson) => {
      this.infoCurrentPerson = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }

  getInfoCurrentLocators(){
    this.commonService.getInfoCurrentLocators().subscribe((response: InfoCurrentLocators) => {
      this.infoCurrentLocators = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }



  currentUserOnSubmit(formValue: any){
    const infoCurrentUser = new InfoCurrentUser();
    infoCurrentUser.UserName = formValue.userName,
    infoCurrentUser.Password = formValue.password,
    infoCurrentUser.Name = formValue.name,
    infoCurrentUser.SurName = formValue.surName,
    infoCurrentUser.EmailAddress = formValue.emailAddress,

    this.commonService.updateInfoCurrentUser(infoCurrentUser).subscribe((response: Response) => {

      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 4000
        });
      }

    },
    error => { console.log(JSON.stringify(error));
    });
  }

}
