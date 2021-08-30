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
import { SendmailPage } from "../sendmail/sendmail";
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

  slideimg1:any

   imageContainer = [
    {
      name: "pic1",
      url: "https://chawtaichonburi.com/appdata/slide/Slide1.jpg",
    },
    {
      name: "pic2",
      url: "https://chawtaichonburi.com/appdata/slide/Slide2.jpg",
    },
    {
      name: "pic3",
      url: "https://chawtaichonburi.com/appdata/slide/Slide3.jpg",
    },
  ]; 
  testCheckboxOpen: boolean;
  testCheckboxResult: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private iab: InAppBrowser,
    private platform: Platform,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.Pay = 1;
    this.dataitem = "";
    this.img_home = true; 
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Home");
   
    if (this.img_home) {
        this.img_log = "https://chawtaichonburi.com/appdata/img/home/log.png";
        this.img_login = "https://chawtaichonburi.com/appdata/img/home/login.png";
        this.img_member = "https://chawtaichonburi.com/appdata/img/home/member.png";
        this.LogMember ="https://chawtaichonburi.com/appdata/img/home/LogMember.png";
        this.img_cabletv = "https://chawtaichonburi.com/appdata/img/home/cabletv.png";
        this.img_net = "https://chawtaichonburi.com/appdata/img/home/net.png";
        this.img_cctv = "https://chawtaichonburi.com/appdata/img/home/cctv.png";
        this.img_news = "https://chawtaichonburi.com/appdata/img/home/news.png";
        this.img_it = "https://chawtaichonburi.com/appdata/img/home/it.png";
        this.img_contact = "https://chawtaichonburi.com/appdata/img/home/contact.png";
        this.img_paytmn = "https://chawtaichonburi.com/appdata/img/home/paytmn.jpg";

        this.img_hot = "https://chawtaichonburi.com/appdata/img/net/hot.png";
        this.img_cable_net = "https://chawtaichonburi.com/appdata/img/net/cable_net.png";
        this.img_p_cctv = "https://chawtaichonburi.com/appdata/img/net/p_cctv.png";
        this.receipt_pay = "https://chawtaichonburi.com/appdata/img/1receipt_pay.png";
        this.News_tmn = "https://chawtaichonburi.com/appdata/img/News_tmn.jpg";
        this.rerun_news = "https://chawtaichonburi.com/appdata/img/rerun_news.jpg";
      }
 
     //เช็คว่า มีการอ่านโฆษณาหรือยัง และมี โฆษณาใหม่ไหม
     this.storage.get("checked").then((val) => {
      this.checked = val;
      //console.log("checked=", this.checked);

      if (this.checked) {
        
        //console.log("ไม่แสดง ข้อความนี้อีก");

        let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_chk_new.php";

      this.storage.get("version").then((val) => {
          this.news_version = val;

          let datapost = new FormData();
          datapost.append("checked", "true");
          datapost.append("chk_version", this.news_version);

                
        let data: Observable<any> = this.http.post(url, datapost);
            data.subscribe(async (call) => {
              console.log(call);
      
            if (call.status == 200) {
              //alert(call.msg);
              this.storage.set("version", call.version); 
              
              this.storage.get("version").then((val) => {
                this.news_version = val;
              
              });
     
            }

            if (call.status == 300) {
              //alert(call.msg);
              this.storage.remove('version');
              this.storage.remove('checked');
            }
                
          }); //data.subscribe
        
      });  //   this.storage.get
      
      } else {
        this.checkbox(); // แสดงโฆษณา
        console.log("500");
      }
    });

    //เช็คคอนเน็คดาต้าเบส
    const loader = this.loadingCtrl.create({
      content: "Please wait....",
      duration: 5000,
    });
    loader.present();

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
        const loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 1000,
        });
        loader.present();
        this.navCtrl.setRoot(UtubePage);
      }
    });
  }

  checkbox() {
    this.img_it = "https://chawtaichonburi.com/appdata/img/home/it.png";
    let alert = this.alertCtrl.create({
      message: `<img src="${this.img_it}" class="alert">`,
    });
    //alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: "checkbox",
      label: "ไม่แสดง ข้อความนี้อีก!",
      value: "value1",
      checked: false,
    });

    alert.addButton({
      text: "OK",
      handler: (data) => {
        console.log("Checkbox data:", data);
        this.testCheckboxOpen = true;
        this.testCheckboxResult = data;

        if (data.length != 0) {
          // user checked box
          this.checked = true;
          this.storage.set("checked", this.checked);
          console.log("Yes 1");
        }
      },
    });
    alert.addButton("Cancel");
    alert.present();
  }

/*   slide1(){
    
    let url = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/home_img.php";

   this.http
   .post(url, null)

   .subscribe(
     (data) => {
      setTimeout(() => {
       this.slideimg1 = data;
       let pic1 = data[0].pic;
       console.log("ข้อมูลที่โหลดมา:", this.slideimg1);          
       }, 500);
     },
     (error) => {
       console.log("Load Fail.");
     }
   );
 } */

  cabletv() {
    this.navCtrl.push(CablePage);
  }

  internet() {
    this.navCtrl.push(AboutPage);
  }
  cctv() {
    this.navCtrl.push(ContactPage);
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
        this.navCtrl.push(MemberPage, { memID: this.memberId });
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
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000,
    });
    loader.present();
    this.navCtrl.push(ServicePage);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }

  fackbook() {
    this.iab.create("https://www.facebook.com/tmnnewscabletv/", "_blank");
  }

  OpenUrl1() {
    this.iab.create("https://www.youtube.com/playlist?list=PLFKoyQAndwNjC4C7LlW4vHQ8IkcckGcF6","_blank");
  }

  OpenUrlCctv() {
    this.iab.create("https://chawtaichonburi.com/appdata/img/net/p_cctv1.png","_blank");
  }
  paybill() {
    this.navCtrl.push(SendmailPage);
  }

  News() {
    this.navCtrl.push(NewsPage);
  }

  /*   Test(){
    this.storage.get("MemberID").then((val) => {
      this.memberId = val;
      console.log("Your IDLog", this.memberId);
      let postData = JSON.stringify({
        memberID: this.memberId,
      });
      //console.log("ID ที่ล็อกอิน:", postData);
      
       let url: string =
        "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_receipt.php"; 

      this.http
        .post(url, postData)

        .subscribe(
          (data) => {
            console.log("Load DATA.",data);
          },
          (error) => {
            console.log("Load Fail.");
          }
        );
    });

} */
}
