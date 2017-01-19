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

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Http } from '@angular/http'
import { AuthHolder } from './auth-holder'
import { Device } from '../model/device'
import { Client } from '../model/client'
import { SmsVerification } from '../model/sms-verification'
import { Constants } from '../util/constants'
import { AuthorizedHttp } from '../util/authorized-http'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  constructor(public http: Http, private authorizedHttp: AuthorizedHttp, private authHolder: AuthHolder) {}

  public createDevice() : Observable<void> {
    return Observable.create(observer => {
      console.log("Registering device...")
      this.http.post(`${Constants.apiUrl}/client/create/`, {}).subscribe(
        result => {
          let json = result.json()
          let device = <Device>json['device']
          let client = <Client>json['client']

          this.authHolder.setDevice(device).subscribe(() => {
            this.authHolder.setClient(client).subscribe(() => {
              observer.next()
              observer.complete()
            })
          })
        },
        error => {
          console.log("Error creating device: " + error)
          observer.error(error)
          observer.complete()
        }
      )
    })
  }

  public requestVerification(mobileNumber: string) : Observable<SmsVerification> {
    return Observable.create(observer => {
      console.log("Requesting verification: " + mobileNumber)
      this.authorizedHttp.post(`${Constants.apiUrl}/verification/request/`, {'mobileNumber': mobileNumber}, {}).subscribe(
        result => {
          let json = result.json()
          let smsVerification = <SmsVerification>json['smsVerification']
          observer.next(smsVerification)
          observer.complete()
        },
        error => {
          console.log("Error requesting SMS verification: " + error)
          observer.error(error)
          observer.complete()
        }
      )
    })
  }

  public verifyVerification(mobileNumber: string, smsChallenge: string, clientChallenge: string) : Observable<void> {
    return Observable.create(observer => {
      this.authorizedHttp.post(`${Constants.apiUrl}/verification/verify/`, {'mobileNumber': mobileNumber, 'smsChallenge': smsChallenge, 'clientChallenge': clientChallenge}, {}).subscribe(
        result => {
          let json = result.json()
          let client = <Client>json['client']
          this.authHolder.setClient(client).subscribe(() => {
            observer.next()
            observer.complete()
          })
        },
        error => {
          console.log("Error verifying SMS verification: " + error)
          observer.error(error)
          observer.complete()
        }
      )
    })
  }

}
