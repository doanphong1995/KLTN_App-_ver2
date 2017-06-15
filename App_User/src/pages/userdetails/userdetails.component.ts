import { Component } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { UserService } from "../../providers/user.service";
import { AddAddressComponent } from '../addAddress/addAddress.component';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../providers/auth.service';
import { OrderComponent } from '../../pages/order/order.component';

@Component({
  templateUrl: 'userdetails.component.html'
})
export class UserDetailsComponent {

  public Users: any;
  private listAddress: any[];
  private addIndex: any;
  public newAddress: string;
  public InfoUser: any;
  private pages = {};
  public userLogin: any[] = [];

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.pages = {
      'OrderPage': OrderComponent
    };

    this.GetInfoUser();
  }

  ngOnInit(): void {

  }

  goBack() {
    this.nav.pop();
  }

  myCallbackFunction = function (_params) {
    console.log("param");
    console.log(_params);
    return new Promise((resolve, reject) => {
      if (_params != null) {
        this.listAddress = _params;
      }
      resolve();
    });
  }

  AddAddress() {
    this.nav.push(AddAddressComponent, {
      callback: this.myCallbackFunction,
      list: this.listAddress
    });
  }

  GetInfoUser() {
    this.userService.GetInfoUser().subscribe((response: any) => {
      this.Users = response;
      this.listAddress = this.Users.address;
      this.addIndex = this.Users.activeIndexAddress;
      this.Users.dateOfBirth = new Date(this.Users.dateOfBirth).toISOString();
    });
  }

  changeAddIndex(index: any) {
    this.addIndex = index;
  }

  removeListAddress(index: any) {
    this.listAddress.splice(index, 1);
  }

  UpdateUser(data: any) {
    let userObject = new UserModel();
    userObject.activeIndexAddress = this.addIndex;
    userObject.address = this.listAddress;
    userObject.email = data.email;
    userObject.fullName = data.fullName;
    userObject.userName = data.userName;
    userObject.phone = data.phone;
    userObject.dateOfBirth = data.dateOfBirth;

    this.InfoUser = userObject;
    console.log(this.InfoUser);
  }

  openPage(pageName) {
    const component = this.pages[pageName];
    if (!component) {
      return;
    }
    this.nav.setRoot(component, {
      userLogin: this.userLogin
    });
  }

  logOut() {
    console.log("=========================LOG OUT==========================");
    localStorage.clear();
    this.auth.logout();
    this.nav.pop();
  }
}

