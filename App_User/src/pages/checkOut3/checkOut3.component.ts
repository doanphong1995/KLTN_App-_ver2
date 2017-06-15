import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { CheckOutCompleteComponent } from '../checkOutComplete/checkOutComplete.component';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'checkOut3.component.html'
})
export class CheckOut3Component implements OnInit {

  public cart: any;
  public Users: any;
  public addressOrder: any;
  public listProductOrder: any;
  public totalCost: any;
  public costFinal: any;


  constructor(
    private nav: NavController,
    public navParams: NavParams
  ) {
    this.cart = navParams.get("orderObject");
    this.Users = navParams.get("usersObject");
    this.totalCost = this.cart.totalCost;
    this.costFinal = this.totalCost + 5;

    console.log(this.costFinal);
    this.GetInfoToOrder();
  }

  GetInfoToOrder() {
    for (var i = 0; i < this.Users.address.length; i++) {
      if (i == this.Users.activeIndexAddress) {
        this.addressOrder = this.Users.address[i];
      }
    }
    this.listProductOrder = this.cart.listproduct;
    console.log(this.listProductOrder);

  }

  Complete() {
    this.nav.push(CheckOutCompleteComponent);
  }
  ngOnInit(): void {

  }

  goBack() {
    this.nav.pop();
  }
}