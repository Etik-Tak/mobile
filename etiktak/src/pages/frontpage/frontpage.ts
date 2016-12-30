import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-frontpage',
  templateUrl: 'frontpage.html'
})
export class FrontpagePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Frontpage Page');
  }

}
