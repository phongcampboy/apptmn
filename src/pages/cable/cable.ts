import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

/**
 * Generated class for the CablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cable',
  templateUrl: 'cable.html',
})
export class CablePage {

  img_cable :boolean = false;
  img_tmn1 : any;
  img_tmn2 : any;
  img_tmn3 : any;
  img_tmn4 : any;
  img_cable1: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CablePage');
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2500
    });
    loader.present()
    this.img_cable = true;
    //console.log("รูป",this.img_cable);
    if(this.img_cable == true){

      this.img_tmn1 = "https://chawtaichonburi.com/appdata/img/cable/tmn-1.png";
      this.img_tmn2 = "https://chawtaichonburi.com/appdata/img/cable/tmn-2.png";
      this.img_tmn3 = "https://chawtaichonburi.com/appdata/img/cable/tmn-3.png";
      this.img_tmn4 = "https://chawtaichonburi.com/appdata/img/cable/tmn-4.png";
      this.img_cable1 = "https://chawtaichonburi.com/appdata/img/cable/cable.png";

    }
  }

}
