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

  authenticate(user: Login):Observable<object>{
   return this.httpClient.get(this.apiURL + `api/login/authenticate?UserName=${user.userName}&Password=${user.password}`);
  }

}
