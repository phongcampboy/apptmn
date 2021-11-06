import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
@IonicPage()
@Component({
  selector: 'page-cable',
  templateUrl: 'cable.html',
})
export class CablePage {

  img_cable :boolean = true;
  img_tmn1 : any;
  img_tmn2 : any;
  img_tmn3 : any;
  img_tmn4 : any;
  img_cable1: any;
  img_Analog : any;
  img_Digital : any;
  img_conn : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    //private iab: InAppBrowser,
    public http: HttpClient, 
    public loadingCtrl: LoadingController) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CablePage');
    let loading = this.loadingCtrl.create({

      content: 'กำลังโหลดข้อมูล...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);

      let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/img_cable.php";
      
      let postdataset = new FormData();
  
      postdataset.append("Page","Cable");
  
      let callback: Observable<any> = this.http.post(url, postdataset);
  
      callback.subscribe((call) => {
       
        if (call.status == 'Cable') {
  
          this.img_cable1 = call.cable1;
          this.img_tmn1 = call.tmn1;
          this.img_tmn2 = call.tmn2;
          this.img_tmn3 = call.tmn3;
          this.img_tmn4 = call.tmn4;
          this.img_Digital = call.Digital;
          this.img_Analog = call.Analog;
          this.img_conn = call.conn;
     
          console.log("Call", call);
         
        }
        if(call.status==400){
  
          console.log("Call=Null");
        }
        
      });
    }
 
/*   Analog(){
    this.iab.create('https://chawtaichonburi.com/appdata/img/analog.php', '_blank');
  }

  Digital(){
    this.iab.create('https://chawtaichonburi.com/appdata/img/digital.php', '_blank');
  } */

}
