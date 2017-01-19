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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from '../util/authorized-http';
import { Constants } from '../util/constants';
import { Product } from '../model/product';
import { Company } from '../model/company';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(public http: AuthorizedHttp) {}

  public scanProduct(barcode: string, barcodeType: string) : Observable<Product> {
    return Observable.create(observer => {
      this.http.post(`${Constants.apiUrl}/product/scan/`, {'barcode': barcode, 'barcodeType': barcodeType}, {}).subscribe(
        result => {
          console.log("Result from server: " + result);
          let json = result.json();
          let product = <Product>json["scan"]["product"];
          observer.next(product);
          observer.complete();
        },
        error => {
          console.log("Error: " + error);
          observer.error(error);
          observer.complete();
        }
      )
    });
  }

  public editProduct(product: Product, name: string) : Observable<Product> {
    return Observable.create(observer => {
      this.http.post(`${Constants.apiUrl}/product/edit/`, {'productUuid': product.uuid, 'name': name}, {}).subscribe(
        result => {
          console.log("Result from server: " + result);
          let json = result.json();
          let product = <Product>json["product"];
          observer.next(product);
          observer.complete();
        },
        error => {
          console.log("Error: " + error);
          observer.error(error);
          observer.complete();
        }
      )
    });
  }

  public addCompanyToProduct(product: Product, companyName: string) : Observable<Product> {
    return Observable.create(observer => {
      this.http.post(`${Constants.apiUrl}/product/assign/company/`, {'productUuid': product.uuid, 'companyName': companyName}, {}).subscribe(
        result => {
          console.log("Result from server: " + result);
          let json = result.json();
          let product = <Product>json["product"];
          observer.next(product);
          observer.complete();
        },
        error => {
          console.log("Error: " + error);
          observer.error(error);
          observer.complete();
        }
      )
    });
  }

  public removeCompanyFromProduct(product: Product, company: Company) : Observable<Product> {
    return Observable.create(observer => {
      this.http.post(`${Constants.apiUrl}/product/remove/company/`, {'productUuid': product.uuid, 'companyUuid': company.uuid}, {}).subscribe(
        result => {
          console.log("Result from server: " + result);
          let json = result.json();
          let product = <Product>json["product"];
          observer.next(product);
          observer.complete();
        },
        error => {
          console.log("Error: " + error);
          observer.error(error);
          observer.complete();
        }
      )
    });
  }

}
