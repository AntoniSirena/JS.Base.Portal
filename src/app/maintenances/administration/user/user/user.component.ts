import { Component, OnInit } from '@angular/core';
import {UserService } from 'src/app/services/user/user.service';
import { Response } from 'src/app/models/response/response';
import { JsFilterPipe } from 'src/app/pipes/jsFilter/js-filter.pipe';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: any;

  //constructor
  constructor( private userService: UserService) {

   }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((response: Response) => {
     this.users = response;
    },
    error => { console.log(JSON.stringify(error));
    });

  }

}
