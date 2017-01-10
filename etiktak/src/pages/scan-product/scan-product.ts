// Copyright (c) 2015, Daniel Andersen (daniel@trollsahead.dk)
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
// 3. The name of the author may not be used to endorse or promote products derived
//    from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { ProductService } from '../../providers/product-service';
import { ProductInfoPage } from '../product-info/product-info';

@Component({
  selector: 'page-scan-product',
  templateUrl: 'scan-product.html'
})
export class ScanProductPage {

  constructor(public http: Http, public navCtrl: NavController, public productService: ProductService) {}

  ionViewDidLoad() {
    console.log('Hello ScanProduct Page');

    BarcodeScanner.scan().then(barcodeData => {
      console.log("Barcode: " + barcodeData.format + ": " + barcodeData.text);

      if (barcodeData.cancelled) {
      } else {
        this.productService.scanProduct(barcodeData.text, barcodeData.format).subscribe(
          product => {
            this.navCtrl.setRoot(ProductInfoPage, {product});
          }
        );
      }
    }, err => {
      console.log("Error while scanning barcode: (" + err.code + "): " + err.message);
    });
  }

}
