import { SecureStorage } from 'ionic-native';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Device {
  constructor(
    public id: string
  ) {}
}

@Injectable()
export class AuthService {
  private currentDevice: Device = null;
  private deviceStorage: SecureStorage = null;
  private apiUrl = 'http://10.192.84.11:5001/service';

  constructor(public http: Http) {
  }

  public hasDeviceId() : Observable<boolean> {
    return Observable.create(observer => {
      this.getDevice().subscribe(device => {
        observer.next(device != null);
        observer.complete();
      });
    });
  }

  public getDeviceStorage() : Observable<SecureStorage> {
    return Observable.create(observer => {

      // Already created device storage
      if (this.deviceStorage != null) {
        observer.next(this.deviceStorage);
        observer.complete();
      }

      // Create device storage
      else {
        this.deviceStorage = new SecureStorage();
        this.deviceStorage.create('device_storage')
          .then(
            () => {
              observer.next(this.deviceStorage);
              observer.complete();
            },
            error => console.log(error)
          );
        }
    });
  }

  public getDevice() : Observable<Device> {
    return Observable.create(observer => {

      // Already fetched device from storage
      if (this.currentDevice != null) {
        observer.next(this.currentDevice);
        observer.complete();
      }

      // Fetch device from storage
      else {
        this.getDeviceStorage().subscribe(storage => {
          storage.get('device')
            .then(
              data => {
                this.currentDevice = JSON.parse(data);
                observer.next(this.currentDevice);
                observer.complete();
              },
              error => {
                observer.next(null);
                observer.complete();
              }
            );
        });
      }
    });
  }

  public createDevice(deviceId: string) : Observable<Device> {
    return Observable.create(observer => {
      this.getDeviceStorage().subscribe(storage => {
        storage.set('device', `{"id": "${deviceId}"}`)
          .then(
            data => {
              this.getDevice().subscribe(device => {
                observer.next(this.currentDevice);
                observer.complete();
              });
            },
            error => console.log(error)
          );
      });
    });
  }

  public requestDeviceId() : Observable<string> {
    return Observable.create(observer => {
      this.http.post(`${this.apiUrl}/client/create/`, {})
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
