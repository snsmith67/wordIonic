import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Wpapi } from '../../providers/wpapi/wpapi';
import { SinglePage } from '../single/single';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  datas:any = [];
  h_datas:any = [];
  m_datas:any = [];
  e_datas:any = [];
  searchKeyword:string ="";
  searchType:boolean = false;
  pagination:number = 1;

  message:string = null;
  file:string = null;
  link:string = null;
  subject:string = null;
  language: string = "home";
  
 // private showLoadmore = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private api: Wpapi, private socialSharing: SocialSharing) {
    api.index(1).subscribe(datas => {
      this.datas = datas;
    });
    api.post_category_hindi().subscribe(h_datas => {
      this.h_datas = h_datas;
      console.log(h_datas);
    });
    api.post_category_marathi().subscribe(m_datas => {
      this.m_datas = m_datas;
      console.log(m_datas);
    });
    api.post_category_english().subscribe(e_datas => {
      this.e_datas = e_datas;
      console.log(e_datas);
    });
  }

  openSingle(url, title){
    //alert('hi');
    this.navCtrl.push(SinglePage, {
      url: url,
      title:title
    });
  }

  search(keyword){
    this.searchType = true;
    this.api.search(keyword, 1).subscribe(datas => {
      this.datas = datas;
      console.log(datas);
      this.searchType = false;
    });
  }

  onCancel(ev){
    if(!ev.target.value){
      this.api.index(1).subscribe(datas => {
        this.datas = datas;
        this.searchType = false;
      })
    }
  }

  doInfinite(ev){
    //alert('hi');
    this.pagination++;
    if(this.searchType === false){
      this.api.index(this.pagination).subscribe(datas => {
        ev.complete();
        if(datas.length !== 0){
          for(let i of datas){
            //console.log(i);
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
    }else if(this.searchType === true){
      this.api.search(this.searchKeyword, this.pagination).subscribe(datas => {
        ev.complete();
        if(datas.length !== 0){
          for(let i of datas){
            this.datas.push(i);
          }
        }
      },(Error) => {
        //alert('No More Posts');
        let toast = this.toastCtrl.create({
          message: 'No More Posts',
          duration: 3000
        })
        toast.present();
        ev.complete();
        
      });
    }
  }

  doRefresh(ev){
    this.api.index(1).subscribe(datas => {
      ev.complete();
      this.searchKeyword = "";
      this.pagination = 1;
      this.searchType = false;
      this.datas = datas;
    });
  }

  share(url, title, message){
    //alert(url);
    console.log("new"+title+"message:"+url);
     //this.socialSharing.share(message, title, this.file, url)
     this.socialSharing.share(title, url)
     .then(() => {
 
     }).catch(() => {
 
     });
   }

 /* getCatName(cat_id:number){
    //alert('hi');
    let cat_name:string = "";
    Array.prototype.forEach.call(this.api.category, element => {
      if(element.id == cat_id){
        cat_name = element.name;
        //alert(cat_id);
      }
    });
    return cat_name;
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

}
