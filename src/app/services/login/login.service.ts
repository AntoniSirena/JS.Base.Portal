import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from 'src/environments/environment';
import { Login } from 'src/app/models/login/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiURL

  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.urlEndPoint;
  }

  authenticate(user: Login){
   let Json = JSON.stringify(user);
   let headers = new HttpHeaders().set('Content-Type', 'application/json');

   return this.httpClient.post(this.apiURL + 'api/login/authenticate', Json, {headers: headers});
  }

}
