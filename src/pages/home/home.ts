import { Component,ViewChild  } from "@angular/core";
import { NavController,Slides ,LoadingController   } from "ionic-angular";
import { ServicePage } from "../service/service";
import { MapPage } from "../map/map";


@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {}
  srevice() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
    this.navCtrl.push(ServicePage);
  }

  mymap() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  
    this.navCtrl.push(MapPage);
  }
  
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
}
