import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: "page-utube",
  templateUrl: "utube.html",
})
export class UtubePage {
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UtubePage");

    
  }
}
