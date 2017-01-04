import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-scan-product',
  templateUrl: 'scan-product.html'
})
export class ScanProductPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ScanProduct Page');
  }

}
