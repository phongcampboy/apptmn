import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "ionic-angular";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-sendline',
  templateUrl: 'sendline.html',
})
export class SendlinePage {
  postdata: any = {};
  getdata:any;
  memberId:any;
  data_line: any;
  idsend:any
  public msg: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public navParams: NavParams) 
  {
    this.postdata.Name = "";
    this.postdata.tel = "";
    this.postdata.message = "";

    this.msg = this.formBuilder.group({
      Name: ["", Validators.required],

      //Username: ['',Validators.required],
      tel: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
         // Validators.pattern('(^0)([1-9]){8}([0-9])$')
        ],
      ],
      message: [
        "",
        [
          Validators.required,
          //Validators.minLength(4),
          Validators.maxLength(600),
        ],
      ],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendlinePage');
    this.getdata = this.navParams.get('memID');
    this.memberId = this.getdata[0].MemberID;
    //console.log("ID=",this.memberId);
    //console.log("getID",getdata);

    let Datapost = JSON.stringify({
      MemID:this.memberId,
    });
    //console.log(Datapost);

    let url:string = "http://tmnoffice.dyndns.tv:8000/tmn/appdata/load_line.php";

    this.http.post(url,Datapost)

    .subscribe(
      (data)=>{
        if(data != null){
          this.data_line = data;
          console.log('DATA=',this.data_line);
        }else{
          console.log('Load Null');
        }
      
        },(eror)=>{
          console.log("Fail Eror.");
        });

  }

  Chk_msg(){

    if(this.msg.valid){
      console.log(this.msg.valid);
      console.log("value", this.msg.value);
      console.log("Mem=",this.memberId);

       let url: string =
      "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_line.php";
      
      let postdataset = new FormData();
      postdataset.append("MemberID", this.memberId);
      postdataset.append("Name", this.postdata.Name);
      postdataset.append("tel", this.postdata.tel);
      postdataset.append("message", this.postdata.message);

  
      let callback: Observable<any> = this.http.post(url, postdataset);

      callback.subscribe((call) => {
        console.log(call);
        if (call.status == 200) {
          alert(call.msg);
          this.postdata.Name = "";
          this.postdata.tel = "";
          this.postdata.message = "";
        }
  
        if (call.status == 404) {
          alert(call.msg);
        }
        
      });

    }
   

  }

}
