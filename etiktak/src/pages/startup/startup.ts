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

import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { AuthHolder } from '../../providers/auth-holder';
import { AuthService } from '../../providers/auth-service';
import { FrontpagePage } from '../frontpage/frontpage';
import { Util } from '../../util/util';

@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html'
})
export class StartupPage {

  welcomeStartTime = null;
  loading = null;

  constructor(public platform: Platform, public navCtrl: NavController, private loadingCtrl: LoadingController, private authHolder: AuthHolder, private authService: AuthService) {}

  ionViewDidLoad() {
    console.log('Hello Startup Page');

    this.platform.ready().then(() => {

      // Initialize device
      this.authHolder.initialize().subscribe(
        () => {
          // Redirect to front page if device already exists
          this.showFrontPage();
        },
        error => {
          // Create new device
          this.createDevice();
        }
      );
    });
  }

  private createDevice() {
    this.showWelcome();

    this.authService.createDevice().subscribe(() => {
      console.log("Created device with ID: " + this.authHolder.device.id);
      this.showFrontPage();
    });
  }

  private showFrontPage() {
    if (this.loading != null) {
      let maxWaitTime = 3.0;
      setTimeout(() => {
        this.loading.dismiss();
        this.loading = null;
        this.navCtrl.setRoot(FrontpagePage);
      }, Math.max(0, maxWaitTime - (Util.currentTime() - this.welcomeStartTime)) * 1000.0);
    } else {
      this.navCtrl.setRoot(FrontpagePage);
    }
  }

  private showWelcome() {
    this.welcomeStartTime = Util.currentTime();

    this.loading = this.loadingCtrl.create({
      content: 'Velkommen til Etik-Tak...'
    });
    this.loading.present();
  }
}
