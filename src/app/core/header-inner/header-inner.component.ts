import { Component } from '@angular/core';
import { Person, User } from 'src/app/models/profile/profile';
import { BaseService } from 'src/app/services/base/base.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})

export class HeaderInnerComponent {

  user = new User();
  person = new Person();

  constructor(
    private baseService: BaseService,
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

}
