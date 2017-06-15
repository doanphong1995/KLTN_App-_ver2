import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { ProductDetailService } from '../../providers/productDetails.service';
import { CartService } from '../../providers/cart.service';


@Component({
  templateUrl: 'productdetails.component.html'
})
export class ProductDetailComponent implements OnInit {

  public id: any;
  public listproduct: any[];
  constructor(
    private nav: NavController,
    public navParams: NavParams,
    private productDetailService: ProductDetailService,
    private cart: CartService
  ) {
    this.id = navParams.get("productId");
    this.LoadData();
  }

  LoadData() {
    console.log(this.id);
    this.productDetailService.getProductDetail(this.id).subscribe((response: any) => {
      //this.listproduct = response;
      this.listproduct = Array.of(response);
      console.log(this.listproduct);
    });
  }

  checkQuantity(id: any) {
    
  }

  ngOnInit(): void {

  }

  openCart() {
    this.nav.push(CartComponent);
  }

  addItemToCart(product: any) {
    console.log("add item to cart");
    this.cart.addCartItem(product);
    console.log(product);
  }
}
