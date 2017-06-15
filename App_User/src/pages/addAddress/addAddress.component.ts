import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { CheckOut1Component } from '../checkOut1/checkOut1.component';
import { NavController, NavParams } from 'ionic-angular';
import { UserDetailsComponent } from '../userdetails/userdetails.component';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'addAddress.component.html'
})
export class AddAddressComponent implements OnInit {

  public addressTemp: any;
  public callback: any;
  private listAddress:any[];

  constructor(
    private nav: NavController,
    private navParams: NavParams

  ) {
    this.listAddress=this.navParams.get("list");
    this.callback = this.navParams.get("callback");
  }

  AddAddress(address_added: any): any {

    for (var i in address_added) {
      //localStorage.setItem("addressNew", address_added[i]);
      this.addressTemp = address_added[i];
    }
    //console.log("addressTemp to push");
    //console.log(this.addressTemp);
    if (this.addressTemp != null) {
      //.localStorage.setItem("newAddressPMM", this.addressTemp);
      this.listAddress.push(this.addressTemp);
      this.callback(this.listAddress).then(() => {
        this.nav.pop();
      });
    }
  }

  ngOnInit(): void {

  }
}