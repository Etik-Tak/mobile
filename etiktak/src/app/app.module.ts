import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FrontpagePage } from '../pages/frontpage/frontpage';

@NgModule({
  declarations: [
    MyApp,
    FrontpagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FrontpagePage
  ],
  providers: []
})
export class AppModule {}
