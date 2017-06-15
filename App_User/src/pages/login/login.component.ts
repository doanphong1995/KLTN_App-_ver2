import { Component } from '@angular/core';
import { SignUpComponent } from '../signup/signup.component';
import { PasswordComponent } from '../password/password.component';
import { JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";
import { AuthService } from "../../providers/auth.service";
import { UserService } from "../../providers/user.service";

import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { OrderComponent } from '../order/order.component';
import { AppComponent } from '../../app/app.component';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  private pages = {};
  private isError = false;
  private userLogin: any[] = [];
  public callback: any;

  constructor(
    private nav: NavController,
    private authService: AuthService,
    private userService: UserService,
    private storage: Storage,
    public events: Events,
    private navParams: NavParams
  ) {
    this.pages = {
      'OrderPage': OrderComponent,
      'homePage': AppComponent
    };
    console.log("====================GET LOGIN IN LOGIN COMPONENT==================");
    this.callback = this.navParams.get("callback");
    console.log("user login get");
    this.userLogin = this.navParams.get("userLogin");
    console.log(this.userLogin);
  }

  openPage(pageName) {
    const component = this.pages[pageName];
    if (!component) {
      return;
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(component)
  }

  SignUp(): any {
    this.nav.push(SignUpComponent);
  }

  Password(): any {
    this.nav.push(PasswordComponent);
  }

  goBack() {
    this.nav.pop();
  }

  doLogin(data: any) {
    console.log(data);
    this.authService.doLogin(data).subscribe((respose: any) => {
      if (respose === true) {
        console.log("=================SEND PARAM WHEN POP IN LOGIN COMPONENT===================");
        this.userLogin.push(data.userName);
        console.log(this.userLogin);
        localStorage.setItem('userLogin', data.userName);
        this.callback(this.userLogin).then(() => {
          console.log("===============POP=============");
          this.nav.pop();
        });
      }
      else {
        this.isError = true;
      }
    });
  }
}
