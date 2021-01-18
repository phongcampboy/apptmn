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
  selector: "page-pay-other",
  templateUrl: "pay-other.html",
})
export class PayOtherPage {
  memberId: any;
  datapay: any;
  //dataitem: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public navParams: NavParams
  ) {
    let idget = this.navParams.get("memID");
    console.log("Data=", idget);

    if (idget != null) {
      this.loaddata(idget);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PayOtherPage");
  }

  loaddata(id: string) {
    let postData = JSON.stringify({
      memberID: id,
    });

    let url = "https://chawtaichonburi.com/appdata/listpay.php";

    this.http
      .post(url, postData)

      .subscribe(
        (data) => {
          if (data != null) {
            let loading = this.loadingCtrl.create({
              content: "Loading...",
              spinner: "circles",
            });
            loading.present();
            this.datapay = data;

            console.log("Loaddata:", this.datapay);

            loading.dismiss();
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }
}
