import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from 'src/environments/environment';
import { BaseService } from 'src/app/services/base/base.service';


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

}
