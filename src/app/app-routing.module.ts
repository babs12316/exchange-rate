import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LatestRateComponent} from './latest-rate/latest-rate.component';
import {SelectedCurrencyComponent} from './selected-currency/selected-currency.component';
import {SelectedBaseCurrencyComponent} from './selected-base-currency/selected-base-currency.component';
import{BaseCurrencyCompareComponent} from './base-currency-compare/base-currency-compare.component';

const routes: Routes = [
   { path: '',   redirectTo: '/latest-rate', pathMatch: 'full' },   //default path set to lates-rate
  { path: 'latest-rate', component: LatestRateComponent },
  { path: 'base-chart', component: SelectedBaseCurrencyComponent },
  { path: 'symbol-chart/:id', component: SelectedCurrencyComponent },
  { path: 'top-five', component: BaseCurrencyCompareComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
