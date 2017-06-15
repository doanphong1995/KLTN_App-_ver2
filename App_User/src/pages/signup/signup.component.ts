import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { UserDetailsComponent } from '../userdetails/userdetails.component';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'signup.component.html'
})
export class SignUpComponent implements OnInit {

  constructor(
    private nav: NavController
  ) { }

  AccountInfo() {
    this.nav.push(UserDetailsComponent);
  }


  ngOnInit(): void {

  }

  goBack() {
    this.nav.pop();
  }
}
