//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the WpapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Wpapi {

  //public Categories:any = [];
  constructor(public http: Http) {
    console.log('Hello WpapiProvider Provider');
  }

  index(id){
    return this.http.get('http://localhost/smith/wordApp/wp-json/wp/v2/posts/?_embed&?filter[order]=DESC&filter[posts_per_page]=5&page='+id)
    .map(data => data.json());
  }

  search(keyword,id){
    return this.http.get("http://localhost/smith/wordApp/wp-json/wp/v2/posts?_embed&?filter[order]=DESC&filter[posts_per_page]=5&search="+ keyword +"&page="+id)
    .map(data => data.json());
  }


  category(){
    return this.http.get('http://localhost/smith/wordApp/wp-json/menus/v1/menus/top')
    .map(data => data.json());
  }

  posts_category(id,page){
    return this.http.get("http://localhost/smith/wordApp/wp-json/wp/v2/posts?_embed&categories="+id+"&filter[order]=DESC&filter[posts_per_page]=5&page="+page)
    .map(data => data.json());
  }

  post_category_hindi(){
    return this.http.get("http://localhost/smith/wordApp/wp-json/wp/v2/posts?_embed&categories=3&filter[order]=DESC&filter[posts_per_page]=5")
    .map(data => data.json());
  }

  post_category_marathi(){
    return this.http.get("http://localhost/smith/wordApp/wp-json/wp/v2/posts?_embed&categories=4&filter[order]=DESC&filter[posts_per_page]=5")
    .map(data => data.json());
  }

  post_category_english(){
    return this.http.get("http://localhost/smith/wordApp/wp-json/wp/v2/posts?_embed&categories=2&filter[order]=DESC&filter[posts_per_page]=5")
    .map(data => data.json());
  }

}
