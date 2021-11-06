import { Component } from "@angular/core";
import {IonicPage,NavController, NavParams,LoadingController} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ToastController } from 'ionic-angular';
import { ReceiptPage } from '../receipt/receipt';

@IonicPage()
@Component({
  selector: "page-pay-other",
  templateUrl: "pay-other.html",
})
export class PayOtherPage {
  memberId: any;
  datapay: any;
  dataid:any;
  idvoice:any;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.dataid = this.navParams.get("memID");
    console.log("ID ที่ส่งมา=", this.dataid);

    if (this.dataid != null) {
      this.loaddata(this.dataid);
    }else{
      console.log("No ID");
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PayOtherPage");
  }

  Open(idvoice){

    this.idvoice = idvoice;
    console.log("Voice =",this.idvoice);
    this.navCtrl.push(ReceiptPage, { idvoiceID: this.idvoice });

  }

  loaddata(id: string) {
    let loading = this.loadingCtrl.create({
      content: "กำลังโหลดข้อมูล...",
      spinner: "circles",
    });
    loading.present();

    let postData = JSON.stringify({
      memberID: id,
    });


    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/listpay.php";

    this.http
      .post(url, postData)

      .subscribe(
        (data) => {
       
          if (data != null) {
     
            this.datapay = data;

            console.log("ข้อมูลที่เคยชำระ:", this.datapay);
          }else{
            this.datapay = data;
            console.log("ข้อมูลที่เคยชำระ",this.datapay);
            let toast = this.toastCtrl.create({
              message: 'ยินดีด้วย คุณไม่มีบิลค้างชำระ',
              duration: 3500,
              position: 'top',
              showCloseButton: true,
            });
            toast.present(toast);
   /*          if(this.datapay==null){
              console.log("Mem",this.dataid);
              this.navCtrl.push(AddbillPage, { memID: this.dataid });
            } */
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
