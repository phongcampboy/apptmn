import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,LoadingController} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: "page-listpay",
  templateUrl: "listpay.html",
})
export class ListpayPage {
  dataitem: any;
  memberId: any;
  datapay: any;
  getmemID:any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public api: ApiProvider,
    public navParams: NavParams
  )
  {
   
  }

  async ionViewDidLoad() {
    console.log("ionViewDidLoad ListpayPage");
    let data = this.navParams.get("memID");
    //console.log("Data=", data);
    this.memberId = data[0].MemberID;
    this.dataitem = data;
    //console.log("Id=", this.memberId);

    let postData = JSON.stringify({
      memberID: this.memberId,
    });
      let result = await this.api.postdata(this.api.route_listpay,postData,'กำลังโหลดข้อมูล..');
      //console.log(result);

      if (result != "") {

        this.datapay = result;
        console.log("Loaddatapay:", this.datapay);
      }else{

        this.api.errorAlert('result.error');
      } 
      
  }


/*   loaddata() {

    let loading = this.loadingCtrl.create({
      content: "กำลังโหลดข้อมูล...",
      spinner: "circles",
    });
    loading.present();

    let postData = JSON.stringify({
      memberID: this.memberId,
    });

    let url = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/listpay.php";

    this.http
      .post(url, postData)
      .subscribe(
        (data) => {
        
          if (data != null) {
            this.datapay = data;
            console.log("Loaddata:", this.datapay);

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
  } */
}
