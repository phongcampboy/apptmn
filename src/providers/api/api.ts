import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController,LoadingController,Platform } from 'ionic-angular';
//import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
@Injectable()
export class ApiProvider {

  baseURL = "http://tmnoffice.dyndns.tv:8000/tmn/Api_App";
  loading: any;
  isLoggedIn: Boolean = false;
  data:any;
  user: any = null;
 
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public platform: Platform, private storage: Storage,
    public alertCtrl: AlertController
    ) 
  {
    console.log('Hello ApiProvider Provider');
  }

  Router(path:any) {
    return this.baseURL + path;
  }

  route_load_member = this.Router('/load_member.php');
  route_Login = this.Router('/tmn_login.php');
  route_conn = this.Router('/tmn_conn.php');
  route_listpay = this.Router('/listpay.php');
  rounte_img_home = this.Router('/img_home.php');
  rounte_img_member = this.Router('/img_member.php');
  rounte_tmn_chang_pass = this.Router('/tmn_chang_pass.php');
  rounte_tmn_receipt = this.Router('/tmn_receipt.php');

  loader: any = {
    show: (message:any) => {
      if (!this.loading) {
        this.loading = this.loadingCtrl.create({
          content: message
        })
        this.loading.present();
      }
    },
    hide: () => {
      if (this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
    }
  };

  errorAlert(message:any) {
    let alert = this.alertCtrl.create({
      title: "Error!",
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  async postdata(url:string,postdata:any,message:any):Promise<any>{
    this.loader.show(message)
    try {
  
      const response = await this.http.post(url, postdata).toPromise();
      const returnData = response;
      this.loader.hide();
      return returnData;
  
    } catch (error) {
      this.loader.hide();
      this.errorAlert("Connect error!");
      console.log('there was an error');
      console.log(error.error_message);
    }
  
  }

async login(user:any, cb:any):Promise<any>{

    return await this.storage.set('user', user).then(() => {
      this.isLoggedIn = true;
      this.user = user;      
      cb();
    });
    
  }
  
}
