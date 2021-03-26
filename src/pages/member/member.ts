import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,Platform,AlertController,LoadingController} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ListpayPage } from "../listpay/listpay";
import { BillPage } from "../bill/bill";
import { AddbillPage } from "../addbill/addbill";
import { ChangpassPage } from "../changpass/changpass";
import { ToastController } from "ionic-angular";
import { UtubePage } from '../utube/utube';
import { Observable } from "rxjs/Observable";
import { HomePage } from '../home/home';

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
  user_log: any = "root";
  pass_log: any = "wsx96300";
  img_member :boolean = false;
  img_pay : any;
  img_payhis : any;
  img_pass : any;

  status:any;
  msg_status:any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) 
  {
   
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MemberPage");
    this.Pay = 1;
    this.dataitem = "";

    this.img_member = true;
    //console.log("รูป",this.img_cable);

    if(this.img_member == true){

      this.img_pay = "https://chawtaichonburi.com/appdata/img/member/pay.png";
      this.img_payhis = "https://chawtaichonburi.com/appdata/img/member/payhis.png";
      this.img_pass = "https://chawtaichonburi.com/appdata/img/member/pass.png";
    }

    let idget = this.navParams.get("memID");
    console.log("ID ที่ส่งมา=", idget);

    if (idget != "") {
      let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_conn.php";
      let datapost = new FormData();
  
      datapost.append("user_log", this.user_log);
      datapost.append("pass_log", this.pass_log);
      
      let data: Observable<any> = this.http.post(url, datapost);
      data.subscribe((call) => {
        console.log(call);
  
        if (call.status == 200) {
          //alert(call.msg);
          this.platform.ready().then(() => {
            this.loaddata(idget);
          });
  
        }
  
        if (call.status == 405) {
          //alert(call.msg);   
          const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1000
          });
          loader.present();
          this.navCtrl.setRoot(UtubePage); 
        }
      });

    }

  }

  loaddata(id: string) {
    
    const loader = this.loadingCtrl.create({
      content: "Please wait....",
      duration: 1500
    });
    loader.present()

    let postData = JSON.stringify({
      memberID: id,
    });
    let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/load_member.php";

    this.http
      .post(url, postData)

      .subscribe(
        (data) => {
         setTimeout(() => {
            if (data != "") {
              this.dataitem = data;

              console.log("ข้อมูลที่โหลดมา:", data);

              this.Pay = data[0].IsPay;
              console.log("pay ",data[0].IsPay);
              this.billcode = data[0].BillingCode;
              this.createdCode = this.billcode;

              this.status = data[0].MemberStatusID;
              console.log("status",this.status);

              if(this.status == "00001"){

                this.msg_status = "01";
                //this.msg_status = "สถานะปกติ";

              }
              else if(this.status == "00002"){

                this.msg_status = "02";
                //this.msg_status = "สถานะตัดสาย";

              }

              else if(this.status == "00010"){

                this.msg_status = "10";
                //this.msg_status = "สถานะบล็อกสัญญาณชั่วคราว";

              }else{

                let toast = this.toastCtrl.create({
                  message: '!!กรุณาติดต่อเจ้าหน้าที่',
                  duration: 3000,
                  position: 'top',
                  showCloseButton: true,
                });
    
                toast.present(toast);
                this.navCtrl.setRoot(HomePage);

              }

            }else{
              let toast = this.toastCtrl.create({
                message: '!!ไม่พบข้อมูล กรุณาติดต่อเจ้าหน้าที่',
                duration: 3000,
                position: 'top',
                showCloseButton: true,
              });
  
              toast.present(toast);
              this.navCtrl.setRoot(HomePage);      
            }
          }, 1000);
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
