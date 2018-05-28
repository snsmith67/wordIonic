import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CategoryPage } from '../pages/category/category';
import{ IndexPage } from '../pages/index/index';
import { Wpapi } from '../providers/wpapi/wpapi';
import { FCM } from '@ionic-native/fcm';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = IndexPage;
  pages:any = [];
  isHome:boolean = false;
  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private api: Wpapi,private fcm: FCM) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    /*this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];*/

    api.category().subscribe(datas => {

      console.log(datas.items);
      if(datas.items){
        for(let i of datas.items){
          this.pages.push({
            title: i.title,
            id: i.object_id
          })  
        }
      }

    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //New FCM
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        // backend.registerToken(token);
        console.log(token);
      });
      this.fcm.onNotification().subscribe(data => {
        alert('message received')
        if(data.wasTapped) {
        console.info("Received in background");
        } else {
        console.info("Received in foreground");
        };
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        // backend.registerToken(token);
        console.log(token);
      });



    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    /*this.nav.setRoot(page.component);*/
    this.nav.setRoot(CategoryPage, {
      id: page.id,
      title: page.title
    })
    this.isHome = true;
  }

  openHome(){
    this.nav.setRoot(IndexPage);
    this.isHome = false;
  }

  
}
