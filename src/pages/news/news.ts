import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { ShownewsPage } from "../shownews/shownews";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  dataitem:any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient, 
    public modalCtrl: ModalController,
    public navParams: NavParams
    ) 
    {
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.loaddata();
  }
  tapEvent(number) {
  
      console.log("Press =",number);

      this.navCtrl.push(ShownewsPage, { numpress: number });
  }

  loaddata(){
    
     let url = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_news.php";

    this.http
    .post(url, null)

    .subscribe(
      (data) => {
       setTimeout(() => {
        this.dataitem = data;
        console.log("ข้อมูลที่โหลดมา:", data);          
        }, 500);
      },
      (error) => {
        console.log("Load Fail.");
      }
    );
  }

}
