import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { Configuration, Enterprise } from 'src/app/templates/configuration';
import { Profile, User, Person } from 'src/app/models/profile/profile';
import { Permission } from 'src/app/models/permission/permission';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  currentUser = new User();
  currentPerson = new Person();
  enterprise = new Enterprise();
  permission = new Permission();

  value: string;

  constructor() { }


  getEnterprise():Enterprise{ 
    this.value = localStorage.getItem("enterprise");
    this.enterprise = JSON.parse(this.value);
    return this.enterprise;
  }

  getCurrentUser():User{ 
    this.value = localStorage.getItem("currentUser");
    this.currentUser = JSON.parse(this.value);
    return this.currentUser;
  }

  getCurrentPerson():Person{ 
    this.value = localStorage.getItem("currentPerson");
    this.currentPerson = JSON.parse(this.value);
    return this.currentPerson;
  }

  getPermissions():Permission{
    this.value = localStorage.getItem("permissions");
    this.permission = JSON.parse(this.value);
    return this.permission;
  }

}
