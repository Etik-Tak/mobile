import { SecureStorage } from 'ionic-native';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Device } from '../model/device';
import { Constants } from '../util/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public device: Device = null;

  private deviceStorage: SecureStorage = null;

  constructor(public http: Http) {
  }

  public initialize() : Observable<void> {
    return Observable.create(observer => {
      this.getDeviceStorage().subscribe(storage => {
        storage.get('device').then(
          data => {
            console.log("Initialized device storage");
            this.device = JSON.parse(data);
            observer.next();
            observer.complete();
          },
          error => {
            console.log("Error initializing device storage: " + error);
            observer.error();
            observer.complete();
          }
        );
      });
    });
  }

  private getDeviceStorage() : Observable<SecureStorage> {
    return Observable.create(observer => {
      this.deviceStorage = new SecureStorage();
      this.deviceStorage.create('device_storage').then(
        () => {
          observer.next(this.deviceStorage);
          observer.complete();
        },
        error => console.log(error)
      );
    });
  }

  public createDevice(deviceId: string) : Observable<Device> {
    return Observable.create(observer => {
      this.deviceStorage.set('device', `{"id": "${deviceId}"}`).then(
        data => {
          this.device = new Device(deviceId);
          observer.next(true);
          observer.complete();
        }
      );
    });
  }

  public requestDeviceId() : Observable<string> {
    return Observable.create(observer => {
      this.http.post(`${Constants.apiUrl}/client/create/`, {})
        .subscribe(result => {
          console.log("Got result from server: " + result);
          let json = result.json();
          let deviceId = json["device"]["id"];
          observer.next(deviceId);
          observer.complete();
        })
    });
  }
}
