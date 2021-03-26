import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  img_cctv :boolean = false;
  img_cctv01 : any;
  img_cctv1 : any;
  img_cctv2 : any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CablePage');
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1500
    });
    loader.present()

    this.img_cctv = true;
    //console.log("รูป",this.img_cable);

    if(this.img_cctv == true){

      this.img_cctv01 = "https://chawtaichonburi.com/appdata/img/cctv/cctv.png";
      this.img_cctv1 = "https://chawtaichonburi.com/appdata/img/cctv/cctv1.png";
      this.img_cctv2 = "https://chawtaichonburi.com/appdata/img/cctv/cctv2.png";

    }
  }

}
