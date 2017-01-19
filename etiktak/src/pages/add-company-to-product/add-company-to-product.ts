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

import { Component } from '@angular/core'
import { NavController, ViewController } from 'ionic-angular'
import { CompanyService } from "../../providers/company-service"
import { Company } from "../../model/company"

@Component({
  selector: 'page-add-company-to-product',
  templateUrl: 'add-company-to-product.html'
})
export class AddCompanyToProductPage {

  constructor(public navCtrl: NavController, public viewController: ViewController, private companyService: CompanyService) {}

  companies: Company[]
  searchString = ""

  ionViewDidLoad() {
    console.log('Hello AddCompanyToProduct Page')
  }

  search(searchEvent) {

      // Set val to the value of the searchbar
      this.searchString = searchEvent.target.value

      if (this.searchString.trim() !== '' && this.searchString.trim().length >= 3) {
        this.companyService.searchCompanies(this.searchString).subscribe(companies => {
          this.companies = companies
        })
      } else {
        this.companies = []
      }
    }

    cancel() {
      this.viewController.dismiss({success: false})
    }

    okPressed() {
      this.close(this.searchString)
    }

    close(companyName: string) {
      this.viewController.dismiss({success: true, companyName: companyName})
    }

}
