import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { OrderComponent } from '../pages/order/order.component';
import { CartComponent } from '../pages/cart/cart.component';
import { DetailComponent } from '../pages/detail/detail.component';

import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/signup/signup.component';
import { UserDetailsComponent } from '../pages/userdetails/userdetails.component';
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

import { AboutModalComponent } from '../components/about/about-modal.component';
import { CartIndicatorComponent } from '../components/cart-indicator/cart-indicator.component';

import { CartService, PizzaService } from '../providers';
import { PizzaSearchPipe } from '../pipes';
import { ProductSearchPipe } from '../pipes/product-search.pipe';
import { ProductInEventSearchPipe } from '../pipes/productInEvent-search.pipe';
import { ProductByCategoryService } from '../providers/productByCategory.service';
import { ProductDetailService } from '../providers/productDetails.service';
import { CategoryService } from '../providers/category.service';
import { EventService } from '../providers/event.service';
import { ProductInEventService } from '../providers/productInEvent.service';
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    CartComponent,

    LoginComponent,
    SignUpComponent,
    UserDetailsComponent,
    ProductDetailComponent,
    CheckOut1Component,
    CheckOut2Component,
    CheckOut3Component,
    CheckOutCompleteComponent,
    AddAddressComponent,
    HistoryComponent,
    HistoryDetailComponent,
    PasswordComponent,

    DetailComponent,
    AboutModalComponent,
    CartIndicatorComponent,
    PizzaSearchPipe,
    ProductSearchPipe,
    ProductInEventComponent,
    ProductInEventSearchPipe,
  ],
  imports: [
    IonicModule.forRoot(AppComponent, {
      backButtonText: ''
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    OrderComponent,
    DetailComponent,
    CartComponent,
    AboutModalComponent,
    LoginComponent,
    SignUpComponent,
    UserDetailsComponent,
    ProductDetailComponent,
    CheckOut1Component,
    CheckOut2Component,
    CheckOut3Component,
    CheckOutCompleteComponent,
    AddAddressComponent,
    HistoryComponent,
    HistoryDetailComponent,
    PasswordComponent,
    ProductInEventComponent
  ],
  providers: [CartService, PizzaService, ProductByCategoryService, CategoryService, ProductDetailService,
    EventService, ProductInEventService, AuthService, UserService]
})

export class AppModule { }
