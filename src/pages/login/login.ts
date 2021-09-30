import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,AlertController,} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
import { RegisterPage } from "../register/register";
import { HomePage } from '../home/home';
import { MemberPage } from "../member/member";
import { AppversionPage } from '../appversion/appversion';
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  logindata: any = {};
  memberId: any = null;
  isLoggedIn: Boolean = false;
  user: any = null;
  name: any;
  lastname:any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    private storage: Storage,
    public navParams: NavParams
  ) 
  {
    this.logindata.user ="";
    this.logindata.pass ="";
    //this.logined();
  }

  logined() {
    this.storage.get("MemberID").then((val) => {
      this.memberId = val;
      console.log("Your ID", this.memberId);
    });

    this.storage.get("user").then((user) => {
      this.user = user;
      console.log("Username=", user);

      if (user) {
        this.isLoggedIn = true;
        this.navCtrl.push(HomePage, { memID: this.memberId });
        console.log("Load Login=", this.isLoggedIn);
      } else {
        this.isLoggedIn = false;
        console.log("Load Log=", this.isLoggedIn);
      }
    });
  }

  ionViewDidLoad(user) {
    console.log("ionViewDidLoad LoginPage");
    this.memberId = null;
    this.logined();
  }

  clicklogin(user) {
    if (this.logindata.user != "" && this.logindata.pass != "") {
      console.log("User:", this.logindata.user);
      console.log("Pass :", this.logindata.pass);
      
      let url = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_login.php";

      let datapost = new FormData();

      datapost.append("user", this.logindata.user);
      datapost.append("pass", this.logindata.pass);

      let data: Observable<any> = this.http.post(url, datapost);
      
      data.subscribe(async (datasend) => {
        console.log(datasend);
  
        if (datasend != null) {
          this.memberId = datasend[0].MemberID;
          this.user = datasend[0].User_app;
          this.name = datasend[0].FirstName;
          this.lastname = datasend[0].LastName;

          return this.storage.set("user", this.user).then(() => {
            this.storage.set("MemberID", this.memberId);
            this.storage.set("Name", this.name);
            this.storage.set("LastName", this.lastname);
            this.user = user;
            this.navCtrl.setRoot(MemberPage, { memID: this.memberId });
   
          });
          
        } else {
          const alert = this.alertCtrl.create({
            title: "แจ้งเตือน!",
            subTitle: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!",
            buttons: ["ตกลง"],
          });
          alert.present();
          console.log("Login failed");
        }
      });
    } else {
      const alert = this.alertCtrl.create({
        title: "แจ้งเตือน!",
        subTitle: "กรุณากรอกข้อมูลให้ครบทุกช่อง!",
        buttons: ["ตกลง"],
      });
      alert.present();
    }
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }
  manual(){
    setTimeout(() => {
      this.navCtrl.push(AppversionPage);
    }, 300);
  }
}
