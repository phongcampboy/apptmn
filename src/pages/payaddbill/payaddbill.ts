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
  logobill:any ="https://chawtaichonburi.com/appdata/img//member/logobill.png";

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public navParams: NavParams
  )
   {
 
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PayaddbillPage");
    this.logobill;
    let idpay = this.navParams.get("memID");
    this.loaddata(idpay);
  }

  loaddata(id: string) {
    const loader = this.loadingCtrl.create({
      content: "Please wait....",
      duration: 1000
    });
    loader.present()

    let postData = JSON.stringify({
      memberID: id,
    });

  
    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/load_member.php";

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

          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }
}
