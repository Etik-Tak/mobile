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
import { AddCompanyToProductPage } from '../add-company-to-product/add-company-to-product';
import { AuthHolder } from "../../providers/auth-holder";
import { ProductService } from "../../providers/product-service";
import { Product } from "../../model/product";
import { Company } from "../../model/company";
import { Util } from "../../util/util";

@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html'
})
export class ProductInfoPage {

  loading = undefined;
  product: Product = undefined;

  editing = false;
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

  editPressed() {
    this.editing = true;
  }

  okPressed() {
    this.saveProduct();
    this.editing = false;
  }

  productName() : string {
    return (this.product && this.product.name) ? this.product.name : "Ukendt produkt";
  }

  /*editProductName() {
    if (!this.editing) {
      return;
    }
    this.editingProductName = true;
    setTimeout(() => {
      this.productNameInput.setFocus();
    }, 500);
  }*/

  cancelEditingProductName() {
    this.editingProductName = false;
  }

  saveProduct() {
    if (this.productNameInput.value == "") {
      this.cancelEditingProductName();
      return;
    }
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
    return Util.canEditItemWithKeyIfVerified("name", this.product.editableItems, this.authHolder.client);
  }

  isProductNameEdited() : boolean {
    return this.productNameInput != null && this.productNameInput.value != "";
  }

  canEditCompany(company: Company) : boolean {
    return Util.canEditItemWithKeyIfVerified("name", company.editableItems, this.authHolder.client);
  }

  canAddCompany() : boolean {
    if (this.product == null) {
      return false;
    }
    return Util.canEditItemWithKeyIfVerified("name", this.product.editableItems, this.authHolder.client);
  }

  showAddCompanyPage() {
    let modal = this.modalCtrl.create(AddCompanyToProductPage, {});
    modal.onDidDismiss(data => {
      if (data["success"] == true) {
        this.addCompany(data["companyName"]);
      }
    });
    modal.present();
  }

  addCompany(companyName: string) {
    this.verifyClient(() => {
      this.showMessage('Tilføjer producent...');
      this.productService.addCompanyToProduct(this.product, companyName).subscribe(
        product => {
          this.hideMessage();
          this.product = product;
        }
      );
    });
  }

  removeCompany(company: Company) {
    this.verifyClient(() => {
      this.showMessage('Fjerner producent fra produkt...');
      this.productService.removeCompanyFromProduct(this.product, company).subscribe(
        product => {
          this.hideMessage();
          this.product = product;
        }
      );
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
