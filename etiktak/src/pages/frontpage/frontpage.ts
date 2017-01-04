import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanProductPage } from '../scan-product/scan-product';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-frontpage',
  templateUrl: 'frontpage.html'
})
export class FrontpagePage {

  scanProductPage = ScanProductPage;
  searchPage = SearchPage;
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Frontpage Page');
  }

}
