// Copyright (c) 2017, Daniel Andersen (daniel@trollsahead.dk)
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

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, TextInput } from 'ionic-angular';
import { ClientVerificationPage } from '../client-verification/client-verification';
import { AuthHolder } from "../../providers/auth-holder";
import { ProductService } from "../../providers/product-service";
import { Product } from "../../model/product";
import { EditableItem } from "../../model/editable-item";
import { Util } from "../../util/util";

@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html'
})
export class ProductInfoPage {

  loading = undefined;
  product: Product = undefined;
  editingProductName = false;

  @ViewChild('productNameInput') productNameInput: TextInput;

  constructor(
    public navCtrl: NavController, private navParams: NavParams, private modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private authHolder: AuthHolder, private productService: ProductService) {
    this.product = navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('Hello ProductInfo Page');
  }

  productName() : string {
    return (this.product && this.product.name) ? this.product.name : "Ukendt produkt";
  }

  editProductName() {
    this.editingProductName = true;
  }

  saveProduct() {
    this.verifyClient(() => {
      this.showMessage('Gemmer produktinfo...');
      this.productService.editProduct(this.product, this.productNameInput.value).subscribe(
        product => {
          this.hideMessage();
          this.product = product;
          this.editingProductName = false;
        }
      );
    });
  }

  canEditProductName() : boolean {
    if (this.product == null) {
      return false;
    }
    return (<EditableItem>Util.getArrayItemWithKey(this.product.editableItems, "key", "name")).editable;
  }

  isProductNameEdited() : boolean {
    return this.productNameInput != null && this.productNameInput.value != "";
  }

  isEditingProductName() : boolean {
    return this.editingProductName;
  }

  addCompany() {
    this.verifyClient(() => {
      this.showMessage('Tilføjer producent...');
      /*this.productService.editProduct(this.product, this.productNameInput.value).subscribe(
        product => {
          this.hideMessage();
          this.product = product;
        }
      );*/
    });
  }

  private verifyClient(callback: () => void) {
    if (this.authHolder.client.verified) {
      callback();
    } else {
      let modal = this.modalCtrl.create(ClientVerificationPage, {});
      modal.onDidDismiss(data => {
        if (data["success"] == true) {
          callback();
        }
      });
      modal.present();
    }
  }

  private showMessage(message: string) {
    this.hideMessage();
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  private hideMessage() {
    if (this.loading != null) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

}
