import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from "../providers/auth-service";
import { Util } from "./util";

@Injectable()
export class AuthorizedHttp {

  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  private createAuthorizationHeader() : Headers {
    let headers = new Headers()
    headers.append('X-Auth-DeviceId', this.authService.device.id);
    return headers;
  }

  public get(url: string, params: {[index: string]: any}) : Observable<Response> {
    return Observable.create(observer => {
      return this.http.get(Util.buildUrl(url, params), {
        headers: this.createAuthorizationHeader()
      });
    });
  }

  public post(url: string, params: {[index: string]: any}, data) : Observable<Response> {
    return this.http.post(Util.buildUrl(url, params), data, {
      headers: this.createAuthorizationHeader()
    });
  }

}
