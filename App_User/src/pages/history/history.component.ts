import { Component, OnInit } from '@angular/core';
import { HistoryDetailComponent } from '../historyDetail/historyDetail.component';
import { NavController } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'history.component.html'
})
export class HistoryComponent implements OnInit {

  constructor(
    private nav: NavController
  ) { }

  Detail() {
    this.nav.push(HistoryDetailComponent)
  }

  ngOnInit(): void {

  }

  goBack() {
    this.nav.pop();
  }
}