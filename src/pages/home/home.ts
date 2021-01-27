import { Component,ViewChild  } from "@angular/core";
import { NavController,Slides ,LoadingController   } from "ionic-angular";
import { ServicePage } from "../service/service";
import { MapPage } from "../map/map";
import { CablePage } from '../cable/cable';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';


@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present()

    this.slides.autoplay = 5000;
    this.slides.loop = true;
    this.slides.speed = 700;
  }
  imageContainer = [
    {name: 'pic1', url:"https://chawtaichonburi.com/appdata/slide/Slide01.jpg" },
    {name: 'pic2', url:"https://chawtaichonburi.com/appdata/slide/Slide2.jpg" },
    {name : 'pic3', url:"https://chawtaichonburi.com/appdata/slide/Slide3.jpg"} ]

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {}

  cabletv() {
    this.navCtrl.push(CablePage);
  }
  
  internet() {
    this.navCtrl.push(AboutPage);
  }
  cctv() {
    this.navCtrl.push(ContactPage);
  }
  member() {
    this.navCtrl.push(LoginPage);
  }


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
