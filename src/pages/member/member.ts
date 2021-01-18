import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ListpayPage } from "../listpay/listpay";
import { BillPage } from "../bill/bill";
import { AddbillPage } from "../addbill/addbill";
import { ChangpassPage } from "../changpass/changpass";
import { ToastController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-member",
  templateUrl: "member.html",
})
export class MemberPage {
  dataitem: any;
  Pay: number;
  billcode: number;
  createdCode: number;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.Pay = null;
    this.dataitem = "";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MemberPage");
    let idget = this.navParams.get("memID");
    console.log("ID=", idget);

    if (idget != null) {
      this.platform.ready().then(() => {
        this.loaddata(idget);
      });
    }
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
            //console.log("Load-dataitem2=", this.dataitem);
            //console.log("IsPay=", this.Pay);
            //console.log("BillingCode=", this.billcode);
            loading.dismiss();
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }

  BillPage() {
    this.navCtrl.push(BillPage, { memID: this.dataitem });
  }

  sendaddbil() {
    this.navCtrl.push(AddbillPage, { memID: this.dataitem });
  }

  listpay() {
    this.navCtrl.push(ListpayPage, { memID: this.dataitem });
  }
  changpass() {
    this.navCtrl.push(ChangpassPage, { memID: this.dataitem });
  }
}
