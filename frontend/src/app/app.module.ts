import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting/greeting.component';
import { UpdateGreetingComponent } from './greeting/update-greeting/update-greeting.component';
import { LogsGreetingComponent } from './greeting/logs-greeting/logs-greeting.component';
import { SupportedNetworkComponent } from './supported-network/supported-network.component';
import { NetworkDetailsComponent } from './details/network-details/network-details.component';
import { EthAddressComponent } from './details/eth-address/eth-address.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    UpdateGreetingComponent,
    LogsGreetingComponent,
    SupportedNetworkComponent,
    NetworkDetailsComponent,
    EthAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
