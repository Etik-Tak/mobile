import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-scan-product',
  templateUrl: 'scan-product.html'
})
export class ScanProductPage {

  constructor(public http: Http, public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ScanProduct Page');

    BarcodeScanner.scan().then(barcodeData => {
      console.log("Barcode: " + barcodeData.text);
      console.log("Barcode: " + barcodeData.format);
      console.log("Barcode: " + barcodeData.cancelled);
      //this.navCtrl.pop();
    }, err => {
      console.log("Error while scanning barcode: (" + err.code + "): " + err.message);
    });
  }

}
