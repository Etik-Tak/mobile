import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthService } from '../providers/auth-service';
import { StartupPage } from '../pages/startup/startup';
import { FrontpagePage } from '../pages/frontpage/frontpage';
import { ScanProductPage } from '../pages/scan-product/scan-product';
import { SearchPage } from '../pages/search/search';

@NgModule({
  declarations: [
    MyApp,
    StartupPage,
    FrontpagePage,
    ScanProductPage,
    SearchPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartupPage,
    FrontpagePage,
    ScanProductPage,
    SearchPage
  ],
  providers: [AuthService]
})
export class AppModule {}
