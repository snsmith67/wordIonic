import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Wpapi } from '../../providers/wpapi/wpapi';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the SinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {
  title:string = this.navParams.get('title');
  datas:any = [];
  comments:any = [];
  segment:string = 'posts';

  message:string = null;
  file:string = null;
  link:string = null;
  subject:string = null;
  h_datas:any = [];
  searchKey:boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private api: Wpapi, private socialSharing: SocialSharing) {
    http.get(navParams.get('url')+'/?_embed').subscribe(datas => {
      this.datas = [datas.json()]
      http.get(datas.json()._links.replies[0].href).subscribe(comment => {
        this.comments = comment.json();
      })
      this.searchKey = false;
    });

    api.index(1).subscribe(h_datas => {
      this.h_datas = h_datas;
      console.log(h_datas);
    });
  }

  share(url, title, message){
    //alert(title);
    var n_url = '<a href="'+url+'">';
    console.log("title: "+title+"url: "+n_url+ "message: "+message);
     //this.socialSharing.share(message, title, this.file, url)
     //this.socialSharing.share(title, url)
     this.socialSharing.share(title, n_url, message)
     .then(() => {
 
     }).catch(() => {
 
     });
   }

   openSingle(url, title){
    //alert('hi');
    this.navCtrl.push(SinglePage, {
      url: url,
      title:title
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');
  }

}
