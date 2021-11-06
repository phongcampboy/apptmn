import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-allmap',
  templateUrl: 'allmap.html',
})
export class AllmapPage {

  loaderToShow: any;  
  constructor(public navCtrl: NavController,private iab: InAppBrowser,public loadingCtrl: LoadingController, public navParams: NavParams) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllmapPage');
  }


  tmncenter1(){
    this.iab.create('https://goo.gl/maps/KuXFcn9m7iReXP527','_system', 'location=yes');
  }

  tmncenter2(){
    this.iab.create('https://goo.gl/maps/6nGJjjGiBzxHWvN78','_system', 'location=yes');
  }

  tmncenter3(){
    this.iab.create('https://goo.gl/maps/hb1ajvuvyVCEi3pX8','_system', 'location=yes');

  }
  tmncenter4(){
    this.iab.create('https://goo.gl/maps/igp3YeR79JUMkPJRA','_system', 'location=yes');

  }

}
