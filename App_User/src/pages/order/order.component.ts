import { Component, Input, OnInit } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DetailComponent } from '../detail/detail.component';
import { ProductInEventComponent } from '../productInEvent/productInEvent.component';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../providers';
import { CategoryService } from "../../providers/category.service";
import { EventService } from "../../providers/event.service";
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'order.component.html',
})
export class OrderComponent implements OnInit {

  public id: any;
  @Input() search: string = "";
  public listcategory: any[];
  public listevent: any[];
  public userLogin: any;

  constructor(
    private cartService: CartService,
    private nav: NavController,
    private categoryService: CategoryService,
    private eventService: EventService,
  ) {
    this.LoadData();
    this.LoadEvent();
    this.userLogin = localStorage.getItem("userLogin");
  }

  LoadEvent() {
    this.eventService.GetAllEvent().subscribe((responseevent: any) => {
      this.listevent = responseevent;
      //console.log("list event" + "\n" + this.listevent);
    });
  }
  LoadData() {
    this.categoryService.GetAllCategory().subscribe((response: any) => {
      this.listcategory = response;
      //console.log(this.listcategory);
    });
  }

  ngOnInit() {

  }

  doRefresh(refresher: Refresher) {

  }

  openProductByCategory(_id: any) {
    this.nav.push(DetailComponent, {
      id: _id
    })
  }

  openCart() {
    this.nav.push(CartComponent);
  }

  Detail() {
    this.nav.push(DetailComponent);
  }

  openProductInEvent(id: string) {
    //console.log(id);
    this.nav.push(ProductInEventComponent, {
      idEvent: id
    })
  }
}
