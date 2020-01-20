import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseService } from 'src/app/services/base/base.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public customLayout: boolean;

  public rutaActual: string = "";
  cargaInicial: boolean = false;

  constructor( 
    private layoutService: LayoutService, 
    private router: Router, 
    private location: Location,
    private baseService: BaseService ) {}

  ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });
    if(window.location.hash == "/#")
    {
     this.router.navigate(['/login']);
    }
    else{
     this.rutaActual = window.location.href;
    }

  }


}
