import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-selected-base-currency',
  templateUrl: './selected-base-currency.component.html',
  styleUrls: ['./selected-base-currency.component.css'],
})
export class SelectedBaseCurrencyComponent implements OnInit {
  constructor(private exchangeRateService: ExchangeRateService) {}

  // Chart options set here
  chartData: any = [];
  baseCurrecy: string;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.chartData, label: 'Base currenty data' },
  ];

  ngOnInit(): void {
    this.exchangeRateService
      .getSymbolData(this.exchangeRateService.baseCurrency, 'clickedBase')
      .subscribe((results: any) => {
        // base currency is changed
        this.baseCurrecy = this.exchangeRateService.baseCurrency;
        //labels set to dates
        this.barChartLabels = Object.keys(results);
        //barchartdata set currency values
        Object.keys(results).forEach((result) => {
          this.chartData.push(
            results[result][this.exchangeRateService.baseCurrency]
          );
        });
      });
  }
}
