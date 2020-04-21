import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatestRateComponent } from './latest-rate/latest-rate.component';
import { SelectedCurrencyComponent } from './selected-currency/selected-currency.component';
import { SelectedBaseCurrencyComponent } from './selected-base-currency/selected-base-currency.component';
import { BaseCurrencyCompareComponent } from './base-currency-compare/base-currency-compare.component';

@NgModule({
  declarations: [
    AppComponent,
    LatestRateComponent,
    SelectedCurrencyComponent,
    SelectedBaseCurrencyComponent,
    BaseCurrencyCompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
