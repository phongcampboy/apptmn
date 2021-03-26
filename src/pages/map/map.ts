import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";


@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html",
})
export class MapPage {
  
  constructor(
    public navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MapPage");
  }

}
