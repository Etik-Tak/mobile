import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthorizedHttp } from '../util/authorized-http';
import { Constants } from '../util/constants';
import { Product } from '../model/product';
import 'rxjs/add/operator/map';

@Injectable()
export class ScanService {

  constructor(
    public http: AuthorizedHttp
  ) {}

  public scanProduct(barcode: string, barcodeType: string) : Observable<Object> {
    return Observable.create(observer => {
      this.http.post(`${Constants.apiUrl}/product/scan/`, {
        "barcode": barcode,
        "barcodeType": barcodeType
      }, {}).subscribe(
        result => {
          console.log("Got result from server: " + result);
          let json = result.json();
          console.log("JSON: " + json);
          let product = <Product>json["scan"]["product"];
          console.log("Product: " + product);
          observer.next(product);
          observer.complete();
        },
        error => {
          console.log("Error: " + error);
        }
      )
    });
  }

}
