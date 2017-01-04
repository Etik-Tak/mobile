import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthService } from '../providers/auth-service';
import { StartupPage } from '../pages/startup/startup';
import { FrontpagePage } from '../pages/frontpage/frontpage';

@NgModule({
  declarations: [
    MyApp,
    StartupPage,
    FrontpagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartupPage,
    FrontpagePage
  ],
  providers: [AuthService]
})
export class AppModule {}
