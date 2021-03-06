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

import { NgModule } from '@angular/core'
import { IonicApp, IonicModule } from 'ionic-angular'
import { MyApp } from './app.component'

import { AuthHolder } from '../providers/auth-holder'
import { AuthService } from '../providers/auth-service'
import { ProductService } from '../providers/product-service'
import { CompanyService } from "../providers/company-service"
import { AuthorizedHttp } from "../util/authorized-http"
import { ClientVerificationPage } from '../pages/client-verification/client-verification'
import { StartupPage } from '../pages/startup/startup'
import { FrontpagePage } from '../pages/frontpage/frontpage'
import { ScanProductPage } from '../pages/scan-product/scan-product'
import { SearchPage } from '../pages/search/search'
import { ProductInfoPage } from '../pages/product-info/product-info'
import { AddCompanyToProductPage } from '../pages/add-company-to-product/add-company-to-product'

@NgModule({
  declarations: [
    MyApp,
    ClientVerificationPage,
    StartupPage,
    FrontpagePage,
    ScanProductPage,
    SearchPage,
    ProductInfoPage,
    AddCompanyToProductPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ClientVerificationPage,
    StartupPage,
    FrontpagePage,
    ScanProductPage,
    SearchPage,
    ProductInfoPage,
    AddCompanyToProductPage
  ],
  providers: [AuthHolder, AuthService, ProductService, CompanyService, AuthorizedHttp]
})
export class AppModule {}
