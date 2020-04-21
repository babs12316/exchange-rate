import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';

@Component({
  selector: 'app-base-currency-compare',
  templateUrl: './base-currency-compare.component.html',
  styleUrls: ['./base-currency-compare.component.css'],
})
export class BaseCurrencyCompareComponent implements OnInit {
  todaysData: any = [];
  yesterdaysData: any = [];
  exchangeData: any = [];
  diffIncreaseData: any = [];
  diffDecreaseData: any = [];
  sortedData: any = [];

  increaseData: any = [];

  base: string = 'EUR';
  actionStatus: string = 'increase';

  public constructor(private exchangeRateService: ExchangeRateService) {
    //call fetch api data on load
    this.getData('increase');
  }
  //fetch api data
  public getData(action): void {
    // set actioStatus for hiding or showing buttons
    this.actionStatus = action;

    // empty array to aviod concation on every function call
    this.diffIncreaseData = [];
    this.diffDecreaseData = [];

    this.exchangeRateService.getData(this.base).subscribe((results: any) => {
      this.exchangeData = Object.entries(results); // convert it into array
      //if json does not have 2nd parameter i.e. value of past date
      if (this.exchangeData[1]) {
        this.todaysData = Object.entries(this.exchangeData[1][1]); // Get data for today
      } else {
        this.todaysData = Object.entries(this.exchangeData[0][1]); 
      }
      this.yesterdaysData = Object.entries(this.exchangeData[0][1]); // get data for yesterday

      for (let i = 0; i < this.todaysData.length; i++) {
        if (this.todaysData[i][1] > this.yesterdaysData[i][1]) {
          this.diffIncreaseData.push({
            currency: this.todaysData[i][0],
            diff: this.todaysData[i][1] - this.yesterdaysData[i][1],
            percentage:
              ((this.todaysData[i][1] - this.yesterdaysData[i][1]) /
                this.yesterdaysData[i][1]) *
              100,
          });
        } else if (this.todaysData[i][1] < this.yesterdaysData[i][1]) {
          this.diffDecreaseData.push({
            currency: this.todaysData[i][0],
            diff: this.yesterdaysData[i][1] - this.todaysData[i][1],
            percentage:
              ((this.yesterdaysData[i][1] - this.todaysData[i][1]) /
                this.yesterdaysData[i][1]) *
              100,
          });
        }
      }

      if (action === 'decrease') {
        this.sortedData = this.diffDecreaseData
          .sort(function (a: any, b: any) {
            return b.diff - a.diff;
          })
          .slice(0, 5)
          .map((item) => Object.entries(item));
      } else if (action === 'increase') {
        this.sortedData = this.diffIncreaseData
          .sort(function (a: any, b: any) {
            return b.diff - a.diff;
          })
          .slice(0, 5)
          .map((item) => Object.entries(item));
      }
    });
  }
  public selectOption(selectedBase: string) {
    this.base = selectedBase;
    this.getData('increase'); // get json data on every select change
  }

  ngOnInit(): void {}
}
