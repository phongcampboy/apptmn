import { Component,ViewChild } from "@angular/core";
import { NavController,Slides ,LoadingController   } from "ionic-angular";
import { ServicePage } from "../service/service";
import { MapPage } from "../map/map";
import { CablePage } from '../cable/cable';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MemberPage } from '../member/member';
import { Storage } from "@ionic/storage";
import { LoginPage } from '../login/login';

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  memberId: any = null;
  isLoggedIn: Boolean = false;
  user: any = null;
 
  @ViewChild(Slides) slides: Slides;

  imageContainer = [
    {name: 'pic1', url:"https://chawtaichonburi.com/appdata/slide/Slide01.jpg" },
    {name: 'pic2', url:"https://chawtaichonburi.com/appdata/slide/Slide2.jpg" },
    {name : 'pic3', url:"https://chawtaichonburi.com/appdata/slide/Slide3.jpg"} ]

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {
    this.slides.autoplay = 5000;
    this.slides.loop = true;
    this.slides.speed = 700;
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present()

  }

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
    this.storage.get("MemberID").then((val) => {
      this.memberId = val;
      console.log("Your ID", this.memberId);
    });

    this.storage.get("user").then((user) => {
      this.user = user;
      console.log("Username=", user);

      if (user) {
        this.isLoggedIn = true;
        this.navCtrl.setRoot(MemberPage, { memID: this.memberId });
        console.log("Load Login=", this.isLoggedIn);
      } else {
        this.isLoggedIn = false;
        this.navCtrl.setRoot(LoginPage);
        console.log("Load Log=", this.isLoggedIn);
      }
    });
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
