import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController

} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ReceiptPage } from '../receipt/receipt';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: "page-listpay",
  templateUrl: "listpay.html",
})
export class ListpayPage {
  dataitem: any;
  memberId: any;
  datapay: any;
  getmemID:any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public navParams: NavParams
  ) {
    let data = this.navParams.get("memID");
    console.log("Data=", data);
    this.memberId = data[0].MemberID;
    this.dataitem = data;
    console.log("Id=", this.memberId);
    this.loaddata();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListpayPage");
  }
  Open(id){

    this.getmemID = id;
  
    console.log("Voice =",this.getmemID);
    this.navCtrl.push(ReceiptPage, { idvoiceID :this.getmemID });

  }

  loaddata() {

    let loading = this.loadingCtrl.create({
      content: "กำลังโหลดข้อมูล...",
      spinner: "circles",
    });
    loading.present();

    let postData = JSON.stringify({
      memberID: this.memberId,
    });

    let url = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/listpay.php";

    this.http
      .post(url, postData)

      .subscribe(
        (data) => {
        
          if (data != null) {
            this.datapay = data;
            console.log("Loaddata:", this.datapay);

          }
        },
        (error) => {
          console.log("Load Fail.");
          loading.dismiss() //ให้ Loading หายไปกรณีเกิด error 
        },
        ()=>
        setTimeout(() => {
        loading.dismiss() //ให้ Loading หายไปกรณีเกิดการทำงานเสร็จสมบูรณ์
        }, 800)
      );
  }
}
