import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { adminLteConf } from './admin-lte.conf';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from 'angular-admin-lte';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptors/interceptor.service';
import { PortadaComponent } from './portada/portada.component';
import { UserComponent } from './maintenances/administration/user/user/user.component';
import { JsFilterPipe } from './pipes/jsFilter/js-filter.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({ /* options */ }),
    Ng2SearchPipeModule
  ],

  providers:[
      {
       provide: HTTP_INTERCEPTORS,
       useClass: InterceptorService,
       multi: true
      },
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    PortadaComponent,
    UserComponent,
    JsFilterPipe
    ],

  bootstrap: [
    AppComponent
  ]
  
})
export class AppModule {}
