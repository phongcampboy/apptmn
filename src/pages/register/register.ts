import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginPage } from "../login/login";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html",
})
export class RegisterPage {
  postdata: any = {};
  page_login = LoginPage;
  Chk_pass: any;
  public reg: FormGroup;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navParams: NavParams
  ) {
    this.postdata.MemberId = "";
    this.postdata.User_app = "";
    this.postdata.ID_cade = "";
    this.postdata.Pass_app = "";
    this.postdata.Con_Pass_app = "";

    this.reg = this.formBuilder.group({
      MemID: ["", Validators.required],

      //Username: ['',Validators.required],
      Username: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],

      ID_card: ["", Validators.required],

      //Password: ['',Validators.required],
      Password: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],

      Con_password: ["", Validators.required],
    });
  }

  doSignup() {
    console.log("value", this.reg.value);
    console.log(this.reg.valid);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  Chk_password() {
    if (this.postdata.Pass_app != this.Chk_pass) {
      const alert = this.alertCtrl.create({
        title: "พาสเวิร์ดไม่ตรงกัน",
        subTitle: "กรุณาลองใหม่อีกครั้ง",
        buttons: ["OK"],
      });
      alert.present();
    } else {
      this.save();
    }
  }

  save() {
    console.log("value", this.reg.value);
    console.log(this.reg.valid);

    let url = "https://chawtaichonburi.com/appdata/tmn_reg.php";

    let postdataset = new FormData();

    postdataset.append("MemberID", this.postdata.MemberID);
    postdataset.append("User_app", this.postdata.User_app);
    postdataset.append("Pass_app", this.postdata.Pass_app);
    postdataset.append("ID_card", this.postdata.ID_card);

    console.log("MemberId:", this.postdata.MemberID);
    console.log("User_app:", this.postdata.User_app);
    console.log("Pass_app:", this.postdata.Pass_app);
    console.log("ID_card", this.postdata.ID_card);

    let callback: Observable<any> = this.http.post(url, postdataset);

    callback.subscribe((call) => {
      console.log(call);
      if (call.status == 200) {
        alert(call.msg);
        this.navCtrl.setRoot(this.page_login);
      }

      if (call.status == 404) {
        alert(call.msg);
      }
      if (call.status == 405) {
        alert(call.msg);
      }
    });
  }
}
