import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) { }


  login(){
    localStorage.clear();
    this.router.navigate(['login']).then(() =>{
      Swal.fire({
        icon: 'warning',
        title: 'Su sección ha expirado',
        showConfirmButton: false,
        timer: 3000
      }).then(() =>{
        window.location.reload();
      });
    });
  }

}
