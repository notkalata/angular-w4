import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';

@NgModule({
  declarations: [
    AppComponent,
    TrafficLightComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
