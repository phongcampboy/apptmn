import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: "page-payaddbill",
  templateUrl: "payaddbill.html",
})
export class PayaddbillPage {
  dataitem: any;
  billcode: number;
  createdCode: number;
  Pay: number;
  url = "http://chart.apis.google.com/chart?cht=qr&chs=100x100&chld=H|0&chl=";
  qrcode: any;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PayaddbillPage");
    let idpay = this.navParams.get("memID");
    this.loaddata(idpay);
  }

  loaddata(id: string) {
    let loading = this.loadingCtrl.create({
      content: "Loading...",
      spinner: "circles",
    });
    loading.present();

    let postData = JSON.stringify({
      memberID: id,
    });

    let url = "https://chawtaichonburi.com/appdata/tmn_bill.php";

    this.http
      .post(url, postData)

      .subscribe(
        (data) => {
          if (data != null) {
            this.dataitem = data;
            this.Pay = data[0].IsPay;
            this.billcode = data[0].BillingCode;
            this.createdCode = this.billcode;
            this.qrcode = this.url + this.createdCode;
            console.log("Loaddata:", this.dataitem);
            console.log("IsPay=", this.Pay);
            console.log("BillingCode=", this.billcode);
            loading.dismiss();
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }
}
