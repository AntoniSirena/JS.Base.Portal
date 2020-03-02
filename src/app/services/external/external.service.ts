import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from 'src/environments/environment';
import { User } from 'src/app/models/user/user';
import { Enterprise } from 'src/app/templates/configuration';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {
 
  apiURL;

  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.urlEndPoint;
  }

  createUser(user: User){
    const data = new User();
    data.id = user.id,
    data.userName = user.userName,
    data.password = user.password,
    data.name = user.name,
    data.surName = user.surName,
    data.emailAddress = user.emailAddress,
    data.statusId = user.statusId,
    data.personId = user.personId,
    data.image = user.image,
    data.isActive = user.isActive,
    data.isDeleted = user.isDeleted,
    data.creationTime = user.creationTime,
    data.creatorUserId = user.creatorUserId,
    data.lastModificationTime = user.lastModificationTime,
    data.lastModifierUserId = user.lastModifierUserId,
    data.deletionTime = user.deletionTime,
    data.deleterUserId = user.deleterUserId

    let Json = JSON.stringify(data);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(this.apiURL + 'api/external/CreateUser', Json, {headers: headers});
  }

  getEnterpriseInfo():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/external/GetEnterpriseInfo');
  }

}
