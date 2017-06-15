import { EventEmitter, Injectable } from '@angular/core';

import { CartItem } from '../models';
import { ProductInCart } from '../models/productCart.model'

@Injectable()
export class CartService {
  public cart: CartItem[] = [];
  public quantityItem: any;

  public statusChanged = new EventEmitter<{ type: string; totalCount: number }>();

  getCart(): CartItem[] {
    console.log("GET CART");
    return this.cart;
  };

  addCartItem(product: any): void {
    console.log("IN CART SERVICE");

    if (!this.checkExits(product)) {
      this.cart.push({
        id: product.id,
        productName: product.productName,
        productPrice: product.productPrice,
        productPictureUrl: product.productPictureUrl,
        quantityInStock: product.quantityInStock,
        quantity: 1
      });
      this.statusChanged.emit({
        type: 'add',
        totalCount: this.cart.length
      });
    }
    else {
      this.statusChanged.emit({
        type: 'error',
        totalCount: this.cart.length
      });
    }

    console.log("ADDED");
    console.log(product);
  };

  updateCartItem(cart: any[]) {
    this.cart = cart;
  }

  removeCartItem(index): void {
    this.cart.splice(index, 1);
  };

  checkExits(item: any) {
    console.log("check exits product in cart");
    console.log(item);
    let index = this.cart.findIndex(x => x.id == item.id);
    console.log(index);
    if (index > -1) {
      console.log("========> product exits in cart");
      return true;
    } else {
      return false;
    }
  }


  // calcTotalSum(): number {
  //   let sum = 0;

  //   if (!this.cart || !this.cart.length) {
  //     return sum;
  //   }

  //   for (let i = 0; i < this.cart.length; i = i + 1) {
  //     sum = sum + this.cart[i].price;
  //   }

  //   return sum;
  // }
}