import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Wpapi } from '../../providers/wpapi/wpapi';
import { SinglePage } from '../single/single';
import { Http } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  datas:any = [];
  pagination:number = 1;
  title:string = this.navParams.data.title;

  message:string = null;
  file:string = null;
  link:string = null;
  subject:string = null;
  searchKey:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController, private api:Wpapi, private socialSharing: SocialSharing) {
    api.posts_category(navParams.data.id, 1).subscribe(datas => {
      //this.searchKey = true;
      //alert('loading...');
      this.datas = datas;
      this.searchKey = false;
      //alert(datas);
    })
  }

  openSingle(url, title){
    //alert('hi');
    this.navCtrl.push(SinglePage, {
      url: url,
      title:title
    });
  }

  doInfinite(ev){
    //alert('hi');
    this.pagination++;
    this.api.posts_category(this.navParams.data.id, this.pagination).subscribe(datas => {
      ev.complete();
      if(datas.length !== 0){
        for(let i of datas){
          this.datas.push(i);
        }
      }
    }, (Error) => {
      //alert('No More News');
      //console.log(Error._body);
      let toast = this.toastCtrl.create({
        message: 'No More Posts',
        duration: 3000
      })
      toast.present();
      ev.complete();
      //ev.dismiss();
    })
  }

  share(url, title, message){
    //alert(title);
    console.log("new"+title+"message:"+message);
     //this.socialSharing.share(message, title, this.file, url)
     this.socialSharing.share(title, url, message)
     .then(() => {
 
     }).catch(() => {
 
     });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
