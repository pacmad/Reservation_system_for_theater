import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SeatBookigServiceService } from './theater-layout/seat-bookig-service.service';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { AppComponent } from './app.component';
import {BusLayoutModule } from './theater-layout/theater-layout.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BusLayoutModule,
    BrowserAnimationsModule,
    ToastNotificationsModule.forRoot()
  ],
  exports:[BusLayoutModule],
  providers: [SeatBookigServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
