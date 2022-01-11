import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,AlertController, LoadingController} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { PayOtherPage } from "../pay-other/pay-other";
import { ToastController } from 'ionic-angular';
import { PayaddbillPage } from "../payaddbill/payaddbill";
import { ListpayPage } from "../listpay/listpay";
import { ApiProvider } from '../../providers/api/api';
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
  id_pay:any;
  itemsend:any;
  id_Pay_member:number;
  status:any;
  msg_status:any;
  check_pay: boolean = true;
  chk_pay: boolean = true;
  idpay: any = [];

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public api: ApiProvider,
    public navParams: NavParams,

  ) 
  { 
    this.ispay = null;
  }

 async ionViewDidLoad() {//รับข้อมูลเจ้าของเครื่องที่ส่งมาจากหน้า member
    
    console.log("ionViewDidLoad AddbillPage");
    this.add = false;

    let idget = this.navParams.get("memID");
    console.log("ข้อมูลที่ส่งมา",idget);
    this.id_me = idget[0].MemberID;

    let postData = JSON.stringify({
      memberID: this.id_me,
    });
    let result = await this.api.postdata(this.api.route_load_member,postData,'กำลังโหลดข้อมูล..');
    if (result) {
      this.data_me = result;
              this.status = result[0].MemberStatusID;
              this.ispay = result[0].IsPay;
            
              console.log('Pay=',this.ispay);
              console.log('status',this.status);
    
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

                this.api.errorAlert('!!ไม่พบข้อมูล กรุณาติดต่อเจ้าหน้าที่');
                //this.navCtrl.setRoot(HomePage);

              }

              this.loaddata();
            }
            if(this.ispay!=0){
              this.check_pay = false;
              return false;
            }
            else {
              this.check_pay = true;
              return true;
            }
    
    }
    /* let url: string =
      "http://tmnoffice.dyndns.tv:8000/tmn/appdata/load_member.php"; */

    /*this.http
      .post(url, postData)

      .subscribe(
        (datame) => {
     
            if (datame != null) {
              console.log("ข้อมูลตัวเอง:", datame);
              this.data_me = datame;
              this.status = datame[0].MemberStatusID;
              this.ispay = datame[0].IsPay;
            
              console.log('Pay=',this.ispay);
              console.log('status',this.status);
    
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
                //this.navCtrl.setRoot(HomePage);

              }

              this.loaddata();
            }
            if(this.ispay!=0){
              this.check_pay = false;
              return false;
            }
            else {
              this.check_pay = true;
              return true;
            }
    
        },
        (error) => {
          console.log("Load Fail.");
          loading.dismiss();
        },
        ()=>
        setTimeout(() => {
        loading.dismiss() //ให้ Loading หายไปกรณีเกิดการทำงานเสร็จสมบูรณ์
        }, 800)
      ); */
     
  loaddata() { //โหลดข้อมูล ที่เพิ่มรหัสอื่นเข้ามา
    this.postdata.id_save = "";
    let id = this.navParams.get("memID");
    this.IDmem = id[0].MemberID;

    //let memberID = this.IDmem;
    console.log("รหัสที่ส่งมา:", this.IDmem);

     let DataPost = JSON.stringify({
      memberID: this.IDmem,
    });

 
     let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/Api_App/tmn_receipt.php";  

    this.http
      .post(url, DataPost)

      .subscribe(
        (datamember) => {
          console.log("Loaddata:", datamember);

          if (datamember != null) {
            this.items = datamember;
            console.log('Items=',this.items);
            this.id_member = datamember[0].id_member;
            this.id_pay = datamember[0].id_save;
            this.ispay = datamember[0].IsPay;
            console.log('id_pay=',this.id_pay);
            

          }else{
            
            this.add = true;
            this.items = datamember;
            console.log("NO:DATA");
            
          }
        },
        (error) => {
          console.log("เพิ่มรหัสโหลด Fail.");
        }
      ); 
  }

  loadIsPay(id) { // คลิกจ่ายบิลที่เพิ่มเข้ามา
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

  addbill() { // เพิ่มรหัสมาชิกอื่นๆ
  
    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/Api_App/tmn_addbill.php";
    
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

  deletmember(id) { //ลบข้อมลูที่เพิ่มเข้ามา
    const confirm = this.alertCtrl.create({
      title: "!ลบสมาชิก",
      message: "ยืนยันลบสมาชิกออกจากลิสนี้",
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
           
            let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/Api_App/tmndel.php";

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
    }, 300);
  }

  listpay(idpay) {
    this.id_save = idpay;
    console.log("memID=", this.id_save);
    setTimeout(() => {
    this.navCtrl.push(PayOtherPage, { memID: this.id_save });
  }, 300);
  }

  pay(data) {
    this.dataitem = data;
    console.log("Data-",this.dataitem);
    setTimeout(() => {
    this.navCtrl.push(ListpayPage, { memID: this.dataitem });
  }, 300);
  }
  billPay(id){
    //this.dataitem = id;
    //console.log("DataItem",this.dataitem);

    let postData = JSON.stringify({
      memberID : id,
    });
 
    //console.log('Pos=',postData);
    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/Api_App/load_member.php";

    this.http
      .post(url, postData)

      .subscribe(
        (data) => {
              
          if (data != null) {
                 
            this.dataitem = data[0].MemberID;
            this.ispay = data[0].IsPay;
            console.log('PAY=',this.ispay);

            if (this.ispay == 0) {
              
              setTimeout(() => {
              this.navCtrl.push(PayaddbillPage, { memID: this.dataitem });
            }, 300);
            
            }else{
              
              let toast = this.toastCtrl.create({
                message: 'รหัส ' +this.dataitem+ ' ไม่มีค่าบริการค้างชำระ',
                duration: 5000,
                position: 'top',
                showCloseButton: true,
              });
  
              toast.present(toast);

            }
          
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );

  }

}
