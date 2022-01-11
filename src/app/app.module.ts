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
import { CablePage } from '../pages/cable/cable';
import { ServicePage } from '../pages/service/service';
import { ChangpassPage } from '../pages/changpass/changpass';
import { PayOtherPage } from '../pages/pay-other/pay-other';
import { UtubePage } from '../pages/utube/utube';
import { StreamPage } from '../pages/stream/stream';
import { AppversionPage } from '../pages/appversion/appversion';
import { SendlinePage } from '../pages/sendline/sendline';
import { NewsPage } from '../pages/news/news';
import { ShownewsPage } from "../pages/shownews/shownews";
import { AllmapPage } from "../pages/allmap/allmap";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{  HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ChannelPage } from '../pages/channel/channel';
import { SendmailPage } from '../pages/sendmail/sendmail';
import { ReceiptPage } from '../pages/receipt/receipt';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { AppVersion } from '@ionic-native/app-version';
import { Market } from '@ionic-native/market';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ApiProvider } from '../providers/api/api';

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
    CablePage,
    ServicePage,
    ChangpassPage,
    PayOtherPage,
    UtubePage,
    ChannelPage,
    SendmailPage,
    ReceiptPage,
    StreamPage,
    AppversionPage,
    SendlinePage,
    NewsPage,
    ShownewsPage,
    AllmapPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
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
    CablePage,
    ServicePage,
    ChangpassPage,
    PayOtherPage,
    UtubePage,
    ChannelPage,
    SendmailPage,
    ReceiptPage,
    StreamPage,
    AppversionPage,
    SendlinePage,
    NewsPage,
    ShownewsPage,
    AllmapPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
   
  
        
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,EmailComposer,Camera,SocialSharing,StreamingMedia,AppVersion,Market,
    ApiProvider
  

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
