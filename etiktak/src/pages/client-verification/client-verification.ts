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
import { NavController, ViewController, LoadingController, TextInput } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-client-verification',
  templateUrl: 'client-verification.html'
})
export class ClientVerificationPage {

  loading = null;
  smsVerification = null;

  @ViewChild('mobileNumberInput') mobileNumberInput: TextInput;
  @ViewChild('smsCodeInput') smsCodeInput: TextInput;

  constructor(public navCtrl: NavController, public viewController: ViewController, private loadingCtrl: LoadingController, private authService: AuthService) {}

  ionViewDidLoad() {
    console.log('Hello ClientVerification Page');
  }

  requestSmsVerification() {
    this.showMessage('Sender SMS...');

    this.authService.requestVerification(this.mobileNumberInput.value).subscribe(
      smsVerification => {
        this.smsVerification = smsVerification;
        this.hideMessage();
      },
      error => {
        this.hideMessage();
      }
    );
  }

  verifySmsVerification() {
    this.showMessage('Verificerer SMS...');

    this.authService.verifyVerification(this.mobileNumberInput.value, this.smsCodeInput.value, this.smsVerification.challenge).subscribe(
      () => {
        this.hideMessage();
        this.close(true);
      },
      error => {
        this.hideMessage();
        this.close(false);
      }
    );
  }

  close(success: boolean) {
    this.viewController.dismiss({success: success});
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
