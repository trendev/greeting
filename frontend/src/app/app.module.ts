import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting/greeting.component';
import { UpdateGreetingComponent } from './greeting/update-greeting/update-greeting.component';
import { LogsGreetingComponent } from './greeting/logs-greeting/logs-greeting.component';
import { SupportedNetworkComponent } from './supported-network/supported-network.component';
import { NetworkDetailsComponent } from './details/network-details/network-details.component';
import { EthAddressComponent } from './details/eth-address/eth-address.component';
import { LastBlockNumberComponent } from './details/last-block-number/last-block-number.component';
import { BalanceComponent } from './details/balance/balance.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSelectEthNetworkComponent } from './details/network-details/dialog-select-eth-network/dialog-select-eth-network.component';
import { MatSelectModule } from '@angular/material/select';
import { DonationComponent } from './donation/donation.component';


@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    UpdateGreetingComponent,
    LogsGreetingComponent,
    SupportedNetworkComponent,
    NetworkDetailsComponent,
    EthAddressComponent,
    LastBlockNumberComponent,
    BalanceComponent,
    ThemeSwitchComponent,
    DialogSelectEthNetworkComponent,
    DonationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
