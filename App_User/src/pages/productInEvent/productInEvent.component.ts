import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { ProductDetailComponent } from '../productDetails/productDetails.component';
import { CartComponent } from '../cart/cart.component';
import { ProductInEventService } from '../../providers/productInEvent.service';
import { ProductInEventModel } from '../../models/productInEvent.model';
import { Product } from '../models/product.model';

import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'productInEvent.component.html'
})
export class ProductInEventComponent implements OnInit {

    public id: any;
    @Input() search: string = "";
    public listGetData: any[];
    public listGetArray: any[] = [];

    constructor(
        private nav: NavController,
        public navParams: NavParams,
        private productInEventService: ProductInEventService
    ) {
        this.id = navParams.get("idEvent");
        //console.log("idEvent: " + this.id);
        this.LoadData(this.id);
    }

    LoadData(id: string) {
        this.productInEventService.GetAllProductInEvent(id).subscribe((response: any) => {
            this.listGetData = response;
            console.log("list product in event");

            console.log(this.listGetData);

            //let listGetArray = new ProductInEventModel();
            for (var i = 0; i < response.discountProducts.length; i++) {
                this.listGetArray.push(response.discountProducts[i]);
            }

            console.log("listproduct fix");
            console.log(this.listGetArray);
        });
    }

    ProductDetail(id: any) {
        console.log("in product event");
        console.log(id);
        this.nav.push(ProductDetailComponent, {
            productId: id
        });
    }

    openCart() {
        this.nav.push(CartComponent);
    }

    ngOnInit(): void {

    }
}