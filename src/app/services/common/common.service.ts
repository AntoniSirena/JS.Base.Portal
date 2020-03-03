import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from 'src/environments/environment';
import { BaseService } from 'src/app/services/base/base.service';
import { InfoCurrentUser } from 'src/app/models/common/infoCurrentUser/info-current-user';
import { InfoCurrentPerson } from 'src/app/models/common/infoCurrentPerson/info-current-person';
import { InfoCurrentLocators } from 'src/app/models/common/infoCurrentLocators/info-current-locators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiURL;

  constructor(private httpClient: HttpClient, private baseService: BaseService ) { 
    this.apiURL = environment.urlEndPoint;
  }

  getGenders():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetGenders');
  }

  getLocatorsTypes():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetLocatorsTypes');
  }

  getInfoCurrentUser():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetInfoCurrentUser');
  }

  getInfoCurrentPerson():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetInfoCurrentPerson');
  }

  getInfoCurrentLocators():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetInfoCurrentLocators');
  }

  updateInfoCurrentUser(infoCurrentUser: InfoCurrentUser){
    const data = new InfoCurrentUser();
    data.UserName = infoCurrentUser.UserName,
    data.Password = infoCurrentUser.Password,
    data.Name = infoCurrentUser.Name,
    data.SurName = infoCurrentUser.SurName,
    data.EmailAddress = infoCurrentUser.EmailAddress

    let Json = JSON.stringify(data);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.put(this.apiURL + 'api/common/UpdateInfoCurrentUser', Json, {headers: headers});
  }

  updateInfoCurrentPerson(infoCurrentPerson: InfoCurrentPerson){
    const data = new InfoCurrentPerson();
    data.FirstName = infoCurrentPerson.FirstName,
    data.SecondName = infoCurrentPerson.SecondName,
    data.SurName = infoCurrentPerson.SurName,
    data.SecondSurname = infoCurrentPerson.SecondSurname,
    data.FullName = infoCurrentPerson.FullName,
    data.BirthDate = infoCurrentPerson.BirthDate,
    data.GenderId = infoCurrentPerson.GenderId

    let Json = JSON.stringify(data);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.put(this.apiURL + 'api/common/UpdateInfoCurrentPerson', Json, {headers: headers});
  }

}
