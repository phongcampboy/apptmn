import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the ChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  img_channel :boolean = true;
  img_Analog : any;
  img_Digita : any;
  img_Dload: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelPage');

    if(this.img_channel){

      this.img_Analog = "https://chawtaichonburi.com/appdata/img/cable/Analog.jpg";
      this.img_Digita = "https://chawtaichonburi.com/appdata/img/cable/Digital.jpg";
      this.img_Dload = "https://chawtaichonburi.com/appdata/img/cable/download.png";

    }
  }
  
  OpenUrl1()
  {
    this.iab.create('https://chawtaichonburi.com/appdata/img/cable/Analog%201-1-64.jpg', '_blank');
    console.log("You click");

  }
  OpenUrl2()
  {
    this.iab.create('https://chawtaichonburi.com/appdata/img/cable/Digital 1-1-64.jpg', '_blank');

  }

}
