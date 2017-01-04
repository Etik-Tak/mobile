import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { FrontpagePage } from '../frontpage/frontpage';

@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html'
})
export class StartupPage {

  constructor(public platform: Platform, public navCtrl: NavController, private authService: AuthService) {}

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
    this.authService.requestDeviceId().subscribe(deviceId => {
      this.authService.createDevice(deviceId).subscribe(device => {
        console.log("Created device with ID: " + deviceId);
        this.showFrontPage();
      });
    });
  }

  showFrontPage() {
    this.navCtrl.setRoot(FrontpagePage);
  }
}
