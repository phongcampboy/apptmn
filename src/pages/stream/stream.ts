import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

@IonicPage()
@Component({
  selector: 'page-stream',
  templateUrl: 'stream.html',
})
export class StreamPage {

  link:any;
  LinkContainer = [
    {
      name: "ช่อง 27",
      pic: "https://gimmecover.files.wordpress.com/2013/08/logoe0b88ae0b988e0b8ade0b8873.png",
      url : "http://e14f0d2f9b42.sn.mynetname.net:8001/ch27",
    },
    {
      name: "ช่อง 22",
      pic: "https://static.thairath.co.th/media/HCtHFA7ele6Q2dUK4P83GfoA1DcmpNIedWljQBDLOsaIZ9tBcLP0ETeyvCtl4bT3BC.jpg",
      url: "http://e14f0d2f9b42.sn.mynetname.net:8001/ch22",
    },
    {
      name: "ช่อง 23",
      pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbEtcpve75qbtLYmoBW6RweUDIqZx8hPxqGRSRorGJPFKnGf0807ZeBnsRLwJ075fC6pc&usqp=CAU",
      url: "http://e14f0d2f9b42.sn.mynetname.net:8001/ch23",
    },
    {
      name: "ช่อง 25",
      pic: "https://live-tv-channels.org/pt-data/uploads/logo/th-dltv-1-3789.jpg",
      url: "http://e14f0d2f9b42.sn.mynetname.net:8001/ch25",
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,private streamingMedia: StreamingMedia) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StreamPage');

  }

  playStream(ch){

    this.link = ch;
    console.log("URL=",this.link);
       let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'portrait|landscape',
        //orientation: 'portrait',
        shouldAutoClose: true,
        controls: true
      };

      this.streamingMedia.playVideo(this.link, options);
 
   }

}
