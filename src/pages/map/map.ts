import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";


@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html",
})
export class MapPage {
  url = 'https://www.google.com/maps/@12.9209027,100.8573939,12z/data=!3m1!4b1!4m2!6m1!1s13bqko7JKPiy-bnEBZfhe86MPq_Q';
  constructor(
    public navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MapPage");
  }

}
