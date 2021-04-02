import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {

  img_service :boolean = false;
  img_paytmn1 : any;
  img_pay1 : any;
  img_pay2 : any;
  img_pay3 : any;
  img_pay4: any;
  img_pay: any;
  img_QrPay:any;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePage');
    this.img_service = true;
    //console.log("รูป",this.img_cable);

    if(this.img_service == true){

      this.img_paytmn1 = "https://chawtaichonburi.com/appdata/img/paytmn-1.jpg";
      this.img_pay1 = "https://chawtaichonburi.com/appdata/img/pay1.jpg";
      this.img_pay2 = "https://chawtaichonburi.com/appdata/img/pay2.jpg";
      this.img_pay3 = "https://chawtaichonburi.com/appdata/img/pay3.jpg";
      this.img_pay4 = "https://chawtaichonburi.com/appdata/img/pay4.jpg";
      this.img_pay = "https://chawtaichonburi.com/appdata/img/pay.jpg";
      this.img_QrPay = "https://chawtaichonburi.com/appdata/img/QR Hi speed.jpg";

    }
  }

}
