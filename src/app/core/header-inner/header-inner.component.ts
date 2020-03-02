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

  constructor(
    private baseService: BaseService,
    private commonService: CommonService,
    private router :Router){
      this.user = baseService.getCurrentUser();
      this.person = baseService.getCurrentPerson();
    }

  
  profile(){
    alert('perfil');
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
      if (result.value) {
        Swal.fire(
          'Has finalizado seccion.',
          '',
          'success'       
        ).then(() => {
          this.router.navigate(['/login']);
          localStorage.clear();
        });
        
      }
    });

  }

  
  openTabs(evt, tabName){
    var i, tabcontent, tablinks;
    
    switch(tabName){
      case 'User':
        console.log(this.userTab);
        if(this.userTab === false){
          this.getInfoCurrentUser();

          this.userTab = true;
        }     
      break;

      case 'Person':
        if(this.personTab === false){
          this.getInfoCurrentPerson();
          this.getGenders();

          this.personTab = true;
        }       
      break;

      case 'Locators':
        if(this.locatorsTab === false){
          this.getInfoCurrentLocators();
          this.getLocatorsTypes();

          this.locatorsTab = true;
        }
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

}
