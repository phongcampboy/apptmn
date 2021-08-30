import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
  selector: 'page-cable',
  templateUrl: 'cable.html',
})
export class CablePage {

  img_cable :boolean = true;
  img_tmn1 : any;
  img_tmn2 : any;
  img_tmn3 : any;
  img_tmn4 : any;
  img_cable1: any;
  img_Analog : any;
  img_Digita : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private iab: InAppBrowser, 
    public loadingCtrl: LoadingController) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CablePage');
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2500
    });
    loader.present()

    if(this.img_cable){

      this.img_tmn1 = "https://chawtaichonburi.com/appdata/img/cable/tmn-1.png";
      this.img_tmn2 = "https://chawtaichonburi.com/appdata/img/cable/tmn-2.png";
      this.img_tmn3 = "https://chawtaichonburi.com/appdata/img/cable/tmn-3.png";
      this.img_tmn4 = "https://chawtaichonburi.com/appdata/img/cable/tmn-4.png";
      this.img_cable1 = "https://chawtaichonburi.com/appdata/img/cable/cable.png";
      this.img_Analog = "https://chawtaichonburi.com/appdata/img/cable/Analog.jpg";
      this.img_Digita = "https://chawtaichonburi.com/appdata/img/cable/Digital.jpg";

    }
  }

  Analog(){
    this.iab.create('https://chawtaichonburi.com/appdata/img/analog.php', '_blank');
  }

  Digital(){
    this.iab.create('https://chawtaichonburi.com/appdata/img/digital.php', '_blank');
  }

}
