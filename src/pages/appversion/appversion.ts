import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-appversion',
  templateUrl: 'appversion.html',
})
export class AppversionPage {

  app1:any ="https://chawtaichonburi.com/appdata/img/manual/app-01.jpg";
  app2:any ="https://chawtaichonburi.com/appdata/img/manual/app-02.jpg";
  app3:any ="https://chawtaichonburi.com/appdata/img/manual/app-03.jpg";
  app4:any ="https://chawtaichonburi.com/appdata/img/manual/app-04.jpg";



  constructor(public navCtrl: NavController, public navParams: NavParams,)
  {

  
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppversionPage');
  }

}
