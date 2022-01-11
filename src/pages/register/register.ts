import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,AlertController,LoadingController} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html",
})
export class RegisterPage {
  postdata: any = {};
  Chk_pass: any;
  public reg: FormGroup;
  memberId: any = null;
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

      //ID_card: ["", Validators.required],

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
        buttons: ["ตกลง"],
      });
      alert.present();
    } else {
      this.save();
    }
  }

save() {

    console.log("value", this.reg.value);
    console.log(this.reg.valid);
  

    //let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_reg.php";
    let url: string = "http://tmnoffice.dyndns.tv:8000/tmn/Api_App/tmn_reg.php";

    let postdataset = new FormData();

    postdataset.append("MemberID", this.postdata.MemberID);
    postdataset.append("User_app", this.postdata.User_app);
    postdataset.append("Pass_app", this.postdata.Pass_app);

    let callback: Observable<any> = this.http.post(url, postdataset);

    callback.subscribe(async(call) => {
      console.log(call);
      if (await call.status == 200) {
        alert(call.msg);
        this.navCtrl.setRoot(LoginPage);
      }
      else if (call.status == 404) {
        alert(call.msg);
      }
      else if (call.status == 405) {
        alert(call.msg);
      }
      else if (call.status == 406) {
        alert(call.msg);
      }
    },(error) => {
      console.log("สถานะ",error.message);
    }
    );
  
   
  }
}
