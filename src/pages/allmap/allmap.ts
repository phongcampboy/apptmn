import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AllmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allmap',
  templateUrl: 'allmap.html',
})
export class AllmapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllmapPage');
  }

  tmncenter1(){
    window.open("https://www.google.com/maps/dir//12.8821044,100.9034758/@12.8818794,100.9036314,19z",'_system', 'location=yes');
  }
  tmncenter2(){
    window.open("https://goo.gl/maps/6nGJjjGiBzxHWvN78",'_system', 'location=yes');
  }
  tmncenter3(){
    window.open("https://www.google.com/maps/dir//12.907791,100.9100608",'_system', 'location=yes');
  }
  tmncenter4(){
    window.open("https://www.google.com/maps/dir//12.9490327,100.9135599",'_system', 'location=yes');
  }
}
