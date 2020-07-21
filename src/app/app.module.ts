import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SendDataComponent } from './send-data/send-data.component';
import { ReceiveDataComponent } from './receive-data/receive-data.component';

@NgModule({
  declarations: [
    AppComponent,
    SendDataComponent,
    ReceiveDataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
