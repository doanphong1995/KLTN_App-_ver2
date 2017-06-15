import {Component, OnInit} from '@angular/core';
import { OrderComponent } from '../order/order.component';
import {NavController} from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'checkOutComplete.component.html'
})
export class CheckOutCompleteComponent implements OnInit {
 constructor(
    private nav: NavController
  ) {}

  ngOnInit(): void {
    
  }

ComeBack(){
  this.nav.push(OrderComponent);
}
  goBack(){
    this.nav.pop();
  }
}