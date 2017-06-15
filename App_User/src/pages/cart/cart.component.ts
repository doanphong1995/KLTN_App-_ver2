import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CheckOut1Component } from '../checkOut1/checkOut1.component';

import { CartService } from '../../providers';
import { CartItem } from '../../models';

@Component({
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  public totalCost = 0;
  public cart: CartItem[] = [];
  quantity = 1;
  constructor(private cartService: CartService, private alertCtrl: AlertController,
    private nav: NavController) { }

  ngOnInit(): void {
    console.log("CART COMPONENT");
    this.cart = this.cartService.getCart();
    console.log(this.cart);

    this.SumCost(this.cart);
  }

  SumCost(cart: any) {
    for (var i = 0; i < cart.length; i++) {
      this.totalCost += cart[i].productPrice * cart[i].quantity;
    }
    console.log("sum cost");
    console.log(this.totalCost);
  }

  add(item: any) {
    console.log(item);
    if (item.quantity < 10) {
      item.quantity++;
    }
    this.totalCost += item.productPrice;
    this.cartService.updateCartItem(this.cart);
  }
  minus(item: any) {
    console.log(item);
    if (item.quantity > 1) {
      item.quantity--;
    }
    this.totalCost -= item.productPrice;
    this.cartService.updateCartItem(this.cart);
  }

  ionViewDidEnter(): void {
    if (this.cart.length) {
      return;
    }
  }

  CheckOut1(cart: any[]) {
    this.nav.push(CheckOut1Component, {
      cart: cart, 
      totalCost: this.totalCost
    })
  }

  // calcTotalSum() {
  //   return this.cartService.calcTotalSum();
  // }

  removeFromCart(index: number, item: any): void {
    this.cartService.removeCartItem(index);
    this.totalCost -= item.productPrice * item.quantity;
    this.totalCost
  }

  goBack() {
    this.nav.pop();
  }
}
