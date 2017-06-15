import { Component, ViewChild } from '@angular/core';
import { App, ModalController, Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CartComponent } from '../pages/cart/cart.component';
import { OrderComponent } from '../pages/order/order.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/signup/signup.component';
import { UserDetailsComponent } from '../pages/userdetails/userdetails.component';
import { DetailComponent } from '../pages/detail/detail.component';
import { ProductDetailComponent } from '../pages/productDetails/productDetails.component';
import { CheckOut1Component } from '../pages/checkOut1/checkOut1.component';
import { CheckOut2Component } from '../pages/checkOut2/checkOut2.component';
import { CheckOut3Component } from '../pages/checkOut3/checkOut3.component';
import { CheckOutCompleteComponent } from '../pages/checkOutComplete/checkOutComplete.component';
import { AddAddressComponent } from '../pages/addAddress/addAddress.component';
import { HistoryComponent } from '../pages/history/history.component';
import { HistoryDetailComponent } from '../pages/historyDetail/historyDetail.component';
import { PasswordComponent } from '../pages/password/password.component';
import { ProductInEventComponent } from '../pages/productInEvent/productInEvent.component';
import { ProductByCategoryService } from '../providers/productByCategory.service';
import { ProductDetailService } from '../providers/productDetails.service';
import { CategoryService } from '../providers/category.service';
import { EventService } from '../providers/event.service';
import { ProductInEventService } from '../providers/productInEvent.service';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';
import { CartService } from '../providers';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  templateUrl: './app.component.html'
})
export class AppComponent {

  rootPage: any = OrderComponent;
  cartItemCount = 0;
  toastDuration = 500;
  private pages = {};
  @ViewChild(Nav) nav: Nav;
  public userLogin: any[] = [];
  public popupText: any;
  public isLogin = false;

  constructor(

    private app: App,
    private platform: Platform,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private cartService: CartService,
    public events: Events,
    private auth: AuthService,
    private alertCtrl: AlertController

  ) {

    console.log("=======================APP COMPONENT CONTRUCTOR========================")
    this.initializeApp();
    this.pages = {
      'OrderPage': OrderComponent,
      'CartPage': CartComponent,
      'LoginPage': LoginComponent,
      'SignUpPage': SignUpComponent,
      'AccountInfo': UserDetailsComponent,
      'Details': DetailComponent,
      'productDetails': ProductDetailComponent,
      'checkOut1': CheckOut1Component,
      'checkOut2': CheckOut2Component,
      'checkOut3': CheckOut3Component,
      'checkOutComplete': CheckOutCompleteComponent,
      'addAddress': AddAddressComponent,
      'history': HistoryComponent,
      'historyDetail': HistoryDetailComponent,
      'password': PasswordComponent
    };

    if (this.auth.loggedIn()) {
      console.log("==============login in system=============")
      this.userLogin.push(localStorage.getItem('userLogin'));
      this.isLogin = true;
      console.log(this.userLogin);
    } else {
      console.log("==============NOT login in system=============")
      this.userLogin = [];
      console.log(this.userLogin);
    }
  };

  myCallbackFunction = function (_userLogin) {
    return new Promise((resolve, reject) => {
      if (_userLogin != null) {
        this.userLogin = _userLogin;
        console.log(this.userLogin);
      }
      resolve();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // subscribe to cart changes
      this.cartService
        .statusChanged
        .subscribe(data => {
          this.cartItemCount = data.totalCount;

          const toastText = data.type === 'add' ? 'YES' : 'NO';
          this.popupText = toastText;     
          if (!(this.popupText === 'YES')) {
            let alert = this.alertCtrl.create({
              title: 'Exits',
              subTitle: 'Product has been exits in your cart!',
              buttons: ['OK']
            });
            alert.present();
          } else {
            this.popupText = 'Product has been added in your cart!'
            const toast = this.toastCtrl.create({
              message: this.popupText,
              duration: this.toastDuration
            });
            toast.present();
          }

        });
      StatusBar.styleDefault();
    });
  }

  openAboutModal(): any {
    this.nav.push(HistoryComponent)
  }

  openCart(): any {
    this.nav.push(CartComponent)
  }

  home(): any {
    this.nav.push(OrderComponent)
  }

  openUserDetail(): any {
    if (this.auth.loggedIn()) {
      this.nav.push(UserDetailsComponent);
    } else {
      this.userLogin = [];
      this.nav.push(LoginComponent, {
        callback: this.myCallbackFunction,
        userLogin: this.userLogin
      });
    }
  }

  openPage(pageName) {
    const component = this.pages[pageName];
    if (!component) {
      return;
    }
    this.nav.setRoot(component);
  }
}
