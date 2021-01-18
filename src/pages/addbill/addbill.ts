import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { PayaddbillPage } from "../payaddbill/payaddbill";
import { PayOtherPage } from "../pay-other/pay-other";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-addbill",
  templateUrl: "addbill.html",
})
export class AddbillPage {
  postdata: any = {};
  items: any;
  IDmem: any;
  id_save: any;
  memberId: any;
  id_del: any;
  dataitem: any;
  memID: any;
  Pay: number;
  id_member: any;
  ispay: number;
  add: Boolean = false;
  //data_pay: any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddbillPage");
    this.add = false;
    this.loaddata();
  }

  loaddata() {
    this.postdata.id_save = "";
    let id = this.navParams.get("memID");
    this.IDmem = id[0].MemberID;

    let memberID = this.IDmem;
    console.log("memberID=", memberID);

    let DataPost = JSON.stringify({
      memberID: this.IDmem,
    });

    let url = "https://chawtaichonburi.com/appdata/tmn_load_addbill.php";

    this.http
      .post(url, DataPost)

      .subscribe(
        (data) => {
          //console.log("Loaddata:", data);

          if (data != null) {
            let loading = this.loadingCtrl.create({
              content: "Loading...",
              spinner: "circles",
            });
            loading.present();
            this.items = data;
            this.id_member = data[0].id_member;
            //console.log("idmem=",this.id_member);
            /* this.ispay = id;
            console.log("Pay=", this.ispay); */

            loading.dismiss();
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }

  loadIsPay(id) {
    this.ispay = id;
    console.log("Pay=", this.ispay);
    let DataPost = JSON.stringify({
      memberID: this.ispay,
    });

    let url = "https://chawtaichonburi.com/appdata/tmn_bill.php";

    this.http
      .post(url, DataPost)

      .subscribe(
        (data) => {
          console.log("LoadIsPay:", data);

          if (data != null) {
            this.dataitem = data;
            this.Pay = data[0].IsPay;
            //console.log("Pay=", this.Pay);
          }
          if (this.Pay == -1) {

            let toast = this.toastCtrl.create({
              message: 'ยินดีด้วย คุณไม่มีบิลค้างชำระ',
              duration: 5000,
              position: 'top',
              showCloseButton: true,
            });

            toast.present(toast);

            /* const alert = this.alertCtrl.create({
              title: "ยินดีด้วย",
              subTitle: "คุณไม่มีบิลค้างชำระ",
              buttons: ["OK"],
            });
            alert.present();
            console.log("ไม่มีบิลค้างชำระ"); */
          } else {
            console.log("Go to Bill");
            this.navCtrl.push(PayaddbillPage, { memID: this.ispay });
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }

  addbill() {
    let url = "https://chawtaichonburi.com/appdata/tmn_addbill.php";
    let postdataset = new FormData();

    postdataset.append("MemberID", this.IDmem);
    postdataset.append("id_save", this.postdata.id_save);

    let callback: Observable<any> = this.http.post(url, postdataset);

    callback.subscribe((call) => {
      if (this.postdata.id_save == "") {
        const Alert = this.alertCtrl.create({
          title: "แจ้งเตือน!",
          subTitle: "กรุณากรอกรหัสสมาชิก!",
          buttons: ["OK"],
        });
        Alert.present();
      } else {
        if (call.status == 200) {
          this.postdata.id_save = "";
          alert(call.msg);
          //console.log("Call", call);
          var component = this.navCtrl.getActive().instance;
          //รีเฟส หน้าเดิม
          if (component.ionViewDidLoad) {
            component.ionViewDidLoad();
          }
        } else {
          alert(call.msg);
          //console.log("Call", call);
        }
      }
    });
  } //addbill

  deletmember(id) {
    const confirm = this.alertCtrl.create({
      title: "กรุณากดยืนยัน",
      message: "ถ้าต้องการลบข้อมูลสมาชิกออกจากลิสนี้",
      buttons: [
        {
          text: "ยกเลิก",
          handler: () => {
            console.log("Disagree clicked");
          },
        },
        {
          text: "ยืนยัน",
          handler: () => {
            console.log("Agree clicked");
            this.id_del = id;
            //console.log("del=",this.id_del);
            let url = "https://chawtaichonburi.com/appdata/tmndel.php";

            let postdataset = new FormData();

            postdataset.append("memberID", this.id_del);

            let callback: Observable<any> = this.http.post(url, postdataset);

            callback.subscribe((call) => {
              if (call.status == 200) {
                id = "";
                alert(call.msg);
                //console.log("Call", call);
                var component = this.navCtrl.getActive().instance;
                //รีเฟส หน้าเดิม
                if (component.ionViewDidLoad) {
                  component.ionViewDidLoad();
                }
              } else {
                alert(call.msg);
                //console.log("Call", call);
              }
            });
          },
        },
      ],
    });
    confirm.present();
  }
  addmember() {
    setTimeout(() => {
      this.add = true;
      console.log("Add=", this.add);
    }, 500);
  }

  listpay(idpay) {
    this.id_save = idpay;
    console.log("memID=", this.id_save);
    this.navCtrl.push(PayOtherPage, { memID: this.id_save });
  }
}
