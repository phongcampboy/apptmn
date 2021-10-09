import { Component, ViewChild } from "@angular/core";
import { NavController, Slides,LoadingController, Platform,AlertController,} from "ionic-angular";
import { ServicePage } from "../service/service";
import { CablePage } from "../cable/cable";
import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { MemberPage } from "../member/member";
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { UtubePage } from "../utube/utube";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "ionic-angular";
import { NewsPage } from "../news/news";
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  memberId: any = null;
  isLoggedIn: Boolean = false;
  user: any = null;
  name: any;
  lastname: any;

  @ViewChild(Slides) slides: Slides;
  user_log: any = "root";
  pass_log: any = "wsx96300";
  dataitem: any;
  Pay: number;

  img_home: boolean = false;
  img_member: any;
  LogMember: any;
  img_log: any;
  img_login: any;
  img_cabletv: any;
  img_net: any;
  img_cctv: any;
  img_news: any;
  img_it: any;
  img_contact: any;
  img_paytmn: any;
  img_hot: any;
  img_cable_net: any;
  img_p_cctv: any;
  receipt_pay: any;
  loop: boolean = true;
  News_tmn: any;
  rerun_news: any;
  checked: boolean = true;
  news_version: any;  
  Slide1 :any;
  Slide2 :any;
  Slide3:any;
  imageContainer:any;
  testCheckboxOpen: boolean;
  testCheckboxResult: any;
  items: any;
 
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private iab: InAppBrowser,
    public http: HttpClient,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.Pay = 1;
    this.dataitem = ""; 
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Home");
    this.Home_img();
    //this.login();
     
     //เช็คคอนเน็คดาต้าเบส

    let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_conn.php";
    let datapost = new FormData();

    datapost.append("user_log", this.user_log);
    datapost.append("pass_log", this.pass_log);

    let data: Observable<any> = this.http.post(url, datapost);
    data.subscribe(async (call) => {

      console.log(call);

      if (call.status == 200) {
        //alert(call.msg);
        this.platform.ready().then(() => {

          this.login();

        });
      }
      if (call.status == 405) {
        //alert(call.msg);
        this.navCtrl.setRoot(UtubePage);
      }
    });
  }

   Home_img() { // เรียกรูปภาพมาแสดง

    let url: string ="http://tmnoffice.dyndns.tv:8000/tmn/appdata/img_home.php";
    
    let postdataset = new FormData();

    postdataset.append("Page","Home");

    let callback: Observable<any> = this.http.post(url, postdataset);

    callback.subscribe((call) => {
        
      if (call.status == 'Home') {
       
        this.imageContainer = call;
        this.img_log = call.log;
        this.img_login = call.login;
        this.Slide1 = call.Slide1;
        this.Slide2 = call.Slide2;
        this.Slide3 = call.Slide3; 
        this.img_member = call.member;
        this.LogMember = call.LogMember;
        this.img_cabletv =call.cabletv;
        this.img_net = call.net;
        this.img_cctv = call.cctv;
        this.img_news = call.news;
        this.News_tmn = call.News_tmn;
        this.rerun_news = call.rerun_news;
        this.img_hot = call.hot;
        this.img_cable_net = call.cable_net;
        this.img_p_cctv = call.p_cctv;
        this.img_it = call.it;
        this.img_contact = call.contact;
        this.img_paytmn = call.paytmn;
        console.log("Call", this.imageContainer);
   
       
      }

      if(call.status==400){

        console.log("Call=Null");
      }
  
    });

  } //Home_img 

 cabletv() {
    setTimeout(() => {
      this.navCtrl.push(CablePage);
    }, 300);
  }

  internet() {
    setTimeout(() => {
    this.navCtrl.push(AboutPage);
  }, 300);
  }
  cctv() {
    setTimeout(() => {
    this.navCtrl.push(ContactPage);
  }, 300);
  }

  //เช็คล็อกอินก่อนไปหน้าสมาชิก
  member() {
    this.storage.get("MemberID").then((val) => {
      this.memberId = val;
      console.log("Your IDmem", this.memberId);
    });

    this.storage.get("user").then((user) => {
      this.user = user;
      console.log("Username=", user);

      if (user) {
        this.isLoggedIn = true;
        setTimeout(() => {
        this.navCtrl.push(MemberPage, { memID: this.memberId });
      }, 300);
        console.log("Load Login=", this.isLoggedIn);
      } else {
        this.isLoggedIn = false;
        this.navCtrl.push(LoginPage);
        console.log("Load Log=", this.isLoggedIn);
      }
    });
  }

  logined() {
    /* this.storage.get("MemberID").then((val) => {
      this.memberId = val;
      //console.log("Your IDLog", this.memberId);
      let postData = JSON.stringify({
        memberID: this.memberId,
      });
      //console.log("ID ที่ล็อกอิน:", postData);
      let url: string =
        "http://tmnoffice.dyndns.tv:8000/tmn/appdata/load_member.php";

      this.http
        .post(url, postData)

        .subscribe(
          (data) => {
            if (data != "") {
              this.dataitem = data;
              //console.log("ข้อมูลล็อกอิน:", data);
              this.Pay = data[0].IsPay;
              console.log("pay ", this.Pay);

              if (this.Pay == 0) {
                let toast = this.toastCtrl.create({
                  message: "!!คุณมียอดค่าบริการค้างชำระ",
                  duration: 5000,
                  position: "top",
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
    }); */

    this.storage.get("Name").then((val) => {
      this.name = val;
      console.log("Your Name", this.name);
    });
    this.storage.get("LastName").then((val) => {
      this.lastname = val;
      console.log("LastName", this.lastname);
    });

    this.storage.get("user").then((user) => {
      this.user = user;
      console.log("Username=", user);
    });
  }

  login() {
    this.storage.get("MemberID").then((val) => {
      this.memberId = val;
      console.log("Your IDLog", this.memberId);
      if (this.memberId != null) {
        this.logined();
      }
    });

    this.storage.get("Name").then((val) => {
      this.name = val;
      //console.log("Your Name", this.name);
    });
    this.storage.get("LastName").then((val) => {
      this.lastname = val;
      //console.log("LastName", this.lastname);
    });

    this.storage.get("user").then((user) => {
      this.user = user;
      //console.log("Username=", user);
    });
  }

  srevice() {
    setTimeout(() => {
    this.navCtrl.push(ServicePage);
  }, 300);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }

  fackbook() {
    this.iab.create("https://www.facebook.com/tmnnewscabletv/videos/?ref=page_internal", "_blank");
  }

  OpenUrl1() {
    this.iab.create("https://www.youtube.com/playlist?list=PLFKoyQAndwNjC4C7LlW4vHQ8IkcckGcF6","_blank");
  }

  OpenUrlCctv() {
    this.iab.create("https://chawtaichonburi.com/appdata/img/net/p_cctv1.png","_blank");
  }
  News() {
    this.navCtrl.push(NewsPage);
  }
}
