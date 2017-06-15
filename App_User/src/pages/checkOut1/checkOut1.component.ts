import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { CheckOut2Component } from '../checkOut2/checkOut2.component';
import { AddAddressComponent } from '../addAddress/addAddress.component';
import { OrderModel } from '../../models/order.model';
import { UserModel } from '../../models/user.model';
import { UserService } from "../../providers/user.service";

@Component({
  templateUrl: 'checkOut1.component.html'
})
export class CheckOut1Component implements OnInit {

  public cart: any[];
  //public listOrder: any[];
  public defineOrder: any[];
  public date: any;
  public orderObject: any;
  public Users: any;
  private listAddress: any[];
  private addIndex: any;
  public newAddress: string;
  public InfoUser: any;
  public totalCost: any;

  constructor(private nav: NavController, public navParams: NavParams, private userService: UserService) {
    this.cart = navParams.get("cart");
    this.totalCost = navParams.get("totalCost");
    console.log("cart get in check out 1 component");
    console.log(this.cart);
    this.DefineOrder(this.cart);
    console.log("get info user");
    this.GetInfoUser();
  }

  DefineOrder(order: any[]) {

    let defineOrder = new OrderModel();
    this.date = new Date();
    defineOrder.dateDelivery = this.date;
    defineOrder.dateOrder = this.date;
    defineOrder.datePackage = this.date;
    defineOrder.status = "UnComplete";
    defineOrder.totalCost = this.totalCost;
    defineOrder.listproduct = order;
    //console.log("list order when constructor");
    //console.log(defineOrder);
    this.orderObject = defineOrder;
    console.log(this.orderObject);
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

  GetInfoUser() {
    this.userService.GetInfoUser().subscribe((response: any) => {
      this.Users = response;
      console.log("get info in check out 1");
      console.log(response);
      this.listAddress = this.Users.address;
      this.addIndex = this.Users.activeIndexAddress;
      this.Users.dateOfBirth = new Date(this.Users.dateOfBirth).toISOString();
    });
  }

  changeAddIndex(index: any) {
    this.addIndex = index;
    console.log("address change");
    console.log(this.addIndex);

    //update address index
    this.Users.activeIndexAddress = this.addIndex;
  }

  removeListAddress(index: any) {
    this.listAddress.splice(index, 1);
  }

  AddAddress() {
    this.nav.push(AddAddressComponent, {
      callback: this.myCallbackFunction,
      list: this.listAddress
    });
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

    this.Users = userObject;
    console.log(this.InfoUser);
  }

  ContinueCP(): any {
    console.log("prepare to check out step 3")
    console.log(this.orderObject);
    console.log(this.Users);
    this.nav.push(CheckOut2Component, {
      orderObject: this.orderObject,
      usersObject: this.Users
    });
  }

  ngOnInit(): void {

  }

  goBack() {
    this.nav.pop();
  }
}