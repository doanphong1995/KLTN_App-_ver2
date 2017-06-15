import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { CheckOut3Component } from '../checkOut3/checkOut3.component';

@Component({
  templateUrl: 'checkOut2.component.html'
})
export class CheckOut2Component implements OnInit {

  public cart: any[];
  public Users: any;

  constructor(
    private nav: NavController,
    public navParams: NavParams
  ) {
    this.cart = navParams.get("orderObject");
    this.Users =navParams.get("usersObject");
    console.log("data in check out 2");
    console.log(this.cart);
    console.log(this.Users);
  }

  ContinueCP() {
    this.nav.push(CheckOut3Component,{
      orderObject: this.cart,
      usersObject: this.Users
    });
  }

  ngOnInit(): void {

  }

  goBack() {
    this.nav.pop();
  }
}