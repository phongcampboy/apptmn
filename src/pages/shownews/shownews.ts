import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-shownews',
  templateUrl: 'shownews.html',
})
export class ShownewsPage {

  press: any;
  dataitem:any;

  constructor(
    public navCtrl: NavController, 
    public http: HttpClient, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ShownewsPage');
    let loading = this.loadingCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 400);

    let getdata = this.navParams.get('numpress');
    console.log("Get=",getdata);

    this.shownews(getdata);

  }

  shownews(data:number){

      let postData = JSON.stringify({
        Press: data,
      });
  
      let url = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_newspage.php";
      this.http.post(url,postData)

      .subscribe(
        (datapress) => {
          setTimeout(() => {
            this.dataitem = datapress;
            console.log("ข้อมูลที่โหลดมา:", datapress);          
            }, 500);
      },
      (error) =>{
        console.log("Load datapress Fail.");
      }
      );
  }

}
