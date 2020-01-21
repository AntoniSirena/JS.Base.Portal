import { Component } from '@angular/core';
import { Person, User } from 'src/app/models/profile/profile';
import { BaseService } from 'src/app/services/base/base.service';


@Component({
  selector: 'app-sidebar-left-inner',
  templateUrl: './sidebar-left-inner.component.html'
})
export class SidebarLeftInnerComponent {

  user = new User();
  person = new Person();

  constructor(
    private baseService: BaseService){
      this.user = baseService.getCurrentUser();
      this.person = baseService.getCurrentPerson();
  }

}
