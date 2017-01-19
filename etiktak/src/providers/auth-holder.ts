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

import { SecureStorage } from 'ionic-native'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Device } from '../model/device'
import { Client } from '../model/client'

@Injectable()
export class AuthHolder {

  public device: Device = null
  public client: Client = null

  private deviceStorage: SecureStorage = null

  public initialize() : Observable<void> {
    return Observable.create(observer => {
      this.getDeviceStorage().subscribe(storage => {

        // Fetch device
        storage.get('device').then(
          data => {
            this.device = JSON.parse(data)

            // Fetch client
            storage.get('client').then(
              data => {
                this.client = JSON.parse(data)

                console.log("Initialized storage")
                observer.next()
                observer.complete()
              },
              error => {
                console.log("Error initializing client from storage: " + error)
                observer.error()
                observer.complete()
              }
            )
          },
          error => {
            console.log("Error initializing device from storage: " + error)
            observer.error()
            observer.complete()
          }
        )
      })
    })
  }

  public setDevice(device: Device) : Observable<void> {
    return Observable.create(observer => {
      this.deviceStorage.set('device', JSON.stringify(device)).then(() => {
        this.device = device
        console.log("Stored device in storage. Device UUID: " + this.device.id)
        observer.next()
        observer.complete()
      }).catch(error => {
        console.log("Error storing device: " + error)
        observer.error(error)
        observer.complete()
      })
    })
  }

  public setClient(client: Client) : Observable<void> {
    return Observable.create(observer => {
      this.deviceStorage.set('client', JSON.stringify(client)).then(() => {
        this.client = client
        console.log("Stored client in storage. Client UUID: " + this.client.uuid)
        observer.next()
        observer.complete()
      }).catch(error => {
        console.log("Error storing client: " + error)
        observer.error(error)
        observer.complete()
      })
    })
  }

  private getDeviceStorage() : Observable<SecureStorage> {
    return Observable.create(observer => {
      this.deviceStorage = new SecureStorage()
      this.deviceStorage.create('device_storage').then(
        () => {
          observer.next(this.deviceStorage)
          observer.complete()
        },
        error => {
          observer.error(error)
          observer.complete()
        }
      )
    })
  }
}
