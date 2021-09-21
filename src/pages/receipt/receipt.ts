import { Component } from "@angular/core";
import {IonicPage,NavController, NavParams,LoadingController,} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: "page-receipt",
  templateUrl: "receipt.html",
})
export class ReceiptPage {
  datapay: any;
  ValueVat: number;
  Total: number;
  Price: number;
  logobill: any =
    "https://chawtaichonburi.com/appdata/img/member/GetAttachment.png";
  bath: any;
  url: string;
  day: any;
  ispay : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public http: HttpClient
  ) {
    let dataID = this.navParams.get("idvoiceID");

    if (dataID != null) {
      this.loaddata(dataID);
      console.log("ID=", dataID);
    } else {
      console.log("No ID");
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReceiptPage");
  }

  ArabicNumberToText(Number) {
    var Number = this.CheckNumber(Number);
    var NumberArray = new Array(
      "ศูนย์",
      "หนึ่ง",
      "สอง",
      "สาม",
      "สี่",
      "ห้า",
      "หก",
      "เจ็ด",
      "แปด",
      "เก้า",
      "สิบ"
    );
    var DigitArray = new Array(
      "",
      "สิบ",
      "ร้อย",
      "พัน",
      "หมื่น",
      "แสน",
      "ล้าน"
    );
    var BahtText = "";
    if (isNaN(Number)) {
      return "ข้อมูลนำเข้าไม่ถูกต้อง";
    } else {
      if (Number - 0 > 9999999.9999) {
        return "ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้";
      } else {
        Number = Number.split(".");
        if (Number[1].length > 0) {
          Number[1] = Number[1].substring(0, 2);
        }
        var NumberLen = Number[0].length - 0;
        for (var i = 0; i < NumberLen; i++) {
          var tmp = Number[0].substring(i, i + 1) - 0;
          if (tmp != 0) {
            if (i == NumberLen - 1 && tmp == 1) {
              BahtText += "เอ็ด";
            } else if (i == NumberLen - 2 && tmp == 2) {
              BahtText += "ยี่";
            } else if (i == NumberLen - 2 && tmp == 1) {
              BahtText += "";
            } else {
              BahtText += NumberArray[tmp];
            }
            BahtText += DigitArray[NumberLen - i - 1];
          }
        }
        BahtText += "บาท";
        if (Number[1] == "0" || Number[1] == "00") {
          BahtText += "ถ้วน";
        } else {
          var DecimalLen = Number[1].length - 0;
          for (var ii = 0; ii < DecimalLen; ii++) {
            var tmp1 = Number[1].substring(ii, ii + 1) - 0;
            if (tmp1 != 0) {
              if (ii == DecimalLen - 1 && tmp1 == 1) {
                BahtText += "เอ็ด";
              } else if (ii == DecimalLen - 2 && tmp1 == 2) {
                BahtText += "ยี่";
              } else if (ii == DecimalLen - 2 && tmp1 == 1) {
                BahtText += "";
              } else {
                BahtText += NumberArray[tmp1];
              }
              BahtText += DigitArray[DecimalLen - ii - 1];
            }
          }
          BahtText += "สตางค์";
        }
        return BahtText;
      }
    }
  }

  CheckNumber(Number) {
    var decimal = false;
    Number = Number.toString();
    Number = Number.replace(/ |,|บาท|฿/gi, "");
    for (var i = 0; i < Number.length; i++) {
      if (Number[i] == ".") {
        decimal = true;
      }
    }
    if (decimal == false) {
      Number = Number + ".00";
    }
    return Number;
  }

  FormatNumber = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".") + " บาท";
  };

  reversedDate($date) {
    let $expl = $date.split("-");
    return $expl[2] + "-" + $expl[1] + "-" + $expl[0];
  }
  loaddata(id: string) {
    let postData = JSON.stringify({
      memberID: id,
    });

    console.log("Pos=", postData);
    let url: string =
      "http://tmnoffice.dyndns.tv:8000/tmn/appdata/tmn_invoice.php";

    this.http
      .post(url, postData)

      .subscribe(
        (data) => {
          let loading = this.loadingCtrl.create({
            content: "Loading...",
            spinner: "circles",
          });
          loading.present();
          if (data != null) {
            
            this.ValueVat = data[0].ValueVat;
            this.Total = data[0].Total;
            var D = data[0].DatePay;
            this.day = D.substring(0, 10);
            console.log("day=", this.day);
            //this.Price = this.Total - this.ValueVat;
            this.ispay = data[0].IsPay;
            console.log('Pay=',this.ispay);
            this.datapay = data;
            console.log("ข้อมูลที่เคยชำระ:", this.datapay);
            this.bath = "บาท";
            loading.dismiss();
            
          }
        },
        (error) => {
          console.log("Load Fail.");
        }
      );
  }
}
