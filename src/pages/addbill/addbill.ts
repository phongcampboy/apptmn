import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,AlertController, LoadingController} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { PayOtherPage } from "../pay-other/pay-other";
import { ToastController } from 'ionic-angular';
import { PayaddbillPage } from "../payaddbill/payaddbill";

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
  data_me: any;
  id_me:any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,

  ) 
  { 
    this.ispay = null;
  }

  ionViewDidLoad() {
    
    console.log("ionViewDidLoad AddbillPage");
    this.add = false;

    let idget = this.navParams.get("memID");
    console.log("ข้อมูลที่ส่งมา",idget);
    this.id_me = idget[0].MemberID;

    let postData = JSON.stringify({
      memberID: this.id_me,
    });
 
    let url: string =
      "http://tmnoffice.dyndns.tv:8000/tmn/appdata/load_me.php";

    this.http
      .post(url, postData)

      .subscribe(
        (datame) => {
  
            if (datame != null) {
              console.log("ข้อมูลตัวเอง:", datame);
              this.data_me = datame;
              const loader = this.loadingCtrl.create({
                content: "Please wait....",
                duration: 1500
              });
              loader.present()
              this.loaddata();
            }
    
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
     
  }
  
  loaddata() {
    this.postdata.id_save = "";
    let id = this.navParams.get("memID");
    this.IDmem = id[0].MemberID;

    let memberID = this.IDmem;
    console.log("รหัสที่ส่งมา:", memberID);

    let DataPost = JSON.stringify({
      memberID: this.IDmem,
    });

    
    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_load_addbill.php";

    this.http
      .post(url, DataPost)

      .subscribe(
        (data) => {
          //console.log("Loaddata:", data);

          if (data != null) {
           
            const loading = this.loadingCtrl.create({
              content: "Please wait....",
              duration: 1000
            });
            loading.present()
            this.items = data;
            this.id_member = data[0].id_member;

          }else{
            
            this.add = true;
            const loading = this.loadingCtrl.create({
              content: "Please wait....",
              duration: 1000
            });
            loading.present()
            this.items = data;
            console.log("NO:DATA");
            
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );

  }

  loadIsPay(id) {
    this.ispay = id;
    let DataPost = JSON.stringify({
      memberID: this.ispay,
    });
    
    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/load_member.php";

    this.http
      .post(url, DataPost)

      .subscribe(
        (data) => {
          console.log("LoaddataIsPay:", data);

          if (data == null) {
            let toast = this.toastCtrl.create({
              message: 'ไม่พบข้อมูล',
              duration: 3500,
              position: 'top',
              showCloseButton: true,
            });

            toast.present(toast);
            this.ispay = null;
            console.log("IsPay:",this.ispay);
          }
          if(data != null){

            this.dataitem = data;
            if(this.dataitem !=""){
              this.memberId = data[0].MemberID;
              console.log("Pay=", this.memberId);
              this.navCtrl.push(PayaddbillPage, { memID: this.memberId });
            }else{
              let toast = this.toastCtrl.create({
                message: 'ยังไม่มีบิลค้างชำระ',
                duration: 3500,
                position: 'top',
                showCloseButton: true,
              });
  
              toast.present(toast);
            }
           
          }else{
            console.log("Data Fail.");
          }

          if (this.Pay == -1) {

            let toast = this.toastCtrl.create({
              message: 'ยินดีด้วย คุณไม่มีบิลค้างชำระ',
              duration: 3500,
              position: 'top',
              showCloseButton: true,
            });

            toast.present(toast);

          } 
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }

  addbill() {
  
    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_addbill.php";
    
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
           
            let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmndel.php";

            let postdataset = new FormData();

            postdataset.append("memberID", this.id_del);

            let callback: Observable<any> = this.http.post(url, postdataset);

            callback.subscribe((call) => {
              if (call.status == 200) {
                //id = "";
                alert(call.msg);
                //console.log("Call", call);
                var component = this.navCtrl.getActive().instance;
                //รีเฟส หน้าเดิม
                if (component.ionViewDidLoad) {
                  console.log("In component");
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

  pay(id_pay) {
    this.dataitem = id_pay;
    console.log("DataItem",this.dataitem);
    this.navCtrl.push(PayOtherPage, { memID: this.dataitem });
  }

}
