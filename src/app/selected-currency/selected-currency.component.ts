import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ExchangeRateService} from '../exchange-rate.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-selected-currency',
  templateUrl: './selected-currency.component.html',
  styleUrls: ['./selected-currency.component.css']
})
export class SelectedCurrencyComponent implements OnInit {

  symbolData:any=[];
  symbol:string;
  chartData:any=[];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  
  barChartData: ChartDataSets[] = [
    { data: this.chartData, label: 'Symbol Historical Data' }
  ];


  constructor( private activatedRoute: ActivatedRoute,private exchangeRateService: ExchangeRateService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.symbol = params['id'];
 //     console.log('Url Id: ',id);
    })
    this.exchangeRateService.getSymbolData(this.symbol,'clickedSymbol').subscribe((results: any) => {
     // this.symbolData = Object.entries(results);// convert it into array
     this.barChartLabels=Object.keys(results);
     
     Object.keys(results).forEach(result=>{
       this.chartData.push(results[result][this.symbol]);
   //    console.log("hello"+results[result][this.symbol])
     })
     //  console.log("data is"+JSON.stringify(results));
   
  })
}



}
