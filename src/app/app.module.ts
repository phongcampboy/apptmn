import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MemberPage } from '../pages/member/member';
import { BillPage } from '../pages/bill/bill';
import { AddbillPage } from '../pages/addbill/addbill';
import { PayaddbillPage } from '../pages/payaddbill/payaddbill';
import { RegisterPage } from '../pages/register/register';
import { ListpayPage } from '../pages/listpay/listpay';
import { MapPage } from '../pages/map/map';
import { CablePage } from '../pages/cable/cable';
import { ServicePage } from '../pages/service/service';
import { ChangpassPage } from '../pages/changpass/changpass';
import { PayOtherPage } from '../pages/pay-other/pay-other';
import { UtubePage } from '../pages/utube/utube';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{ HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ChannelPage } from '../pages/channel/channel';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MemberPage,
    BillPage,
    AddbillPage,
    PayaddbillPage,
    RegisterPage,
    ListpayPage,
    MapPage,
    CablePage,
    ServicePage,
    ChangpassPage,
    PayOtherPage,
    UtubePage,
    ChannelPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
    //IonicModule.forRoot(MyApp,{tabsPlacement:"top"}) ////กำหนดตำแหน่งแทป ใน app.module
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MemberPage,
    BillPage,
    AddbillPage,
    PayaddbillPage,
    RegisterPage,
    ListpayPage,
    MapPage,
    CablePage,
    ServicePage,
    ChangpassPage,
    PayOtherPage,
    UtubePage,
    ChannelPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
