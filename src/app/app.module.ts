import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Wpapi } from '../providers/wpapi/wpapi';
import { CategoryPage } from '../pages/category/category';
import { IndexPage } from '../pages/index/index';
import { SinglePage } from '../pages/single/single';
import 'rxjs/add/operator/map';
import { Moment } from '../pipes/moment/moment';
import { SocialSharing } from '@ionic-native/social-sharing';


import { HttpModule } from '@angular/http';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CategoryPage,
    IndexPage,
    SinglePage,
    Moment
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CategoryPage,
    IndexPage,
    SinglePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Wpapi
  ]
})
export class AppModule {}
