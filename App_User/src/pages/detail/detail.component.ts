import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailComponent } from '../productDetails/productDetails.component';
import { CartComponent } from '../cart/cart.component';
import { ProductByCategoryService } from '../../providers/productByCategory.service';
import { CartService } from '../../providers/cart.service';

import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'detail.component.html'
})
export class DetailComponent implements OnInit {

  public id: any
  public cateid: any;
  @Input() search: string = "";
  public listproduct: any[];
  constructor(
    private nav: NavController,
    public navParams: NavParams,
    private productByCategoryService: ProductByCategoryService,
    private cartService: CartService
  ) {
    this.id = navParams.get("id");
    this.LoadData();
  }

  LoadData() {
    this.productByCategoryService.getProductByCategory(this.id).subscribe((response: any) => {
      this.listproduct = response;
    });
  }

  ProductDetail() {
    this.nav.push(ProductDetailComponent);
  }


  ngOnInit(): void {

  }

  openCart() {
    this.nav.push(CartComponent);
  }

  openProductDetail(_id: any) {
    console.log(_id)
    this.nav.push(ProductDetailComponent, {
      productId: _id
    })
  }

  orderDirectly(product: any){
    console.log("add item to cart");
    console.log(product);
    this.cartService.addCartItem(product);
    console.log("====================DONE====================");
  }
}