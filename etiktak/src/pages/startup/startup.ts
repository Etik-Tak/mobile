import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
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

  constructor(public platform: Platform, public navCtrl: NavController, private loadingCtrl: LoadingController, private authService: AuthService) {}

  ionViewDidLoad() {
    console.log('Hello Startup Page');

    this.platform.ready().then(() => {

      // Check if we have a device ID
      this.authService.hasDeviceId().subscribe(hasDeviceId => {

        // Redirect to front page
        if (hasDeviceId) {
          this.showFrontPage();
        }

        // Create new device
        else {
          this.requestDeviceId();
        }
      })
    });
  }

  requestDeviceId() {
    this.showWelcome();

    this.authService.requestDeviceId().subscribe(deviceId => {
      this.authService.createDevice(deviceId).subscribe(device => {
        console.log("Created device with ID: " + deviceId);
        this.showFrontPage();
      });
    });
  }

  showFrontPage() {
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

  showWelcome() {
    this.welcomeStartTime = Util.currentTime();

    this.loading = this.loadingCtrl.create({
      content: 'Velkommen til Etik-Tak...'
    });
    this.loading.present();
  }
}
