import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
//import { ChannelPage } from '../channel/channel';
import { SendmailPage } from '../sendmail/sendmail';
import { CablePage } from '../cable/cable';
import { NavController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'

})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = SendmailPage;
  tab5Root = CablePage;

  constructor(public navCtrl: NavController ) 
  {
   
  }


}