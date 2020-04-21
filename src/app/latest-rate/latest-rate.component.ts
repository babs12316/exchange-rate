import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';

@Component({
  selector: 'app-latest-rate',
  templateUrl: './latest-rate.component.html',
  styleUrls: ['./latest-rate.component.css'],
})
export class LatestRateComponent implements OnInit {
  todaysData: any = [];
  yesterdaysData: any = [];
  exchangeData: any = [];
  diffData: any = [];
  base: string = 'EUR';
  public constructor(private exchangeRateService: ExchangeRateService) {
    //call fetch api data on load
    this.getData();
  }

  //fetch api data
  public getData(): void {
    this.exchangeRateService.getData(this.base).subscribe((results: any) => {
      this.exchangeData = Object.entries(results); // convert it into array

      //if json does not have 2nd parameter i.e. value of past date
      if (this.exchangeData[1]) {
        this.todaysData = Object.entries(this.exchangeData[1][1]);
      } else {
        this.todaysData = Object.entries(this.exchangeData[0][1]);
      }
      this.yesterdaysData = Object.entries(this.exchangeData[0][1]);

      //compare todays currency data,yesterdays currency data & create a new array storing comparision status
      for (let i = 0; i < this.todaysData.length; i++) {
        if (this.todaysData[i][1] > this.yesterdaysData[i][1]) {
          this.diffData.push('increased');
        } else if (this.todaysData[i][1] < this.yesterdaysData[i][1]) {
          this.diffData.push('decreased');
        } else {
          this.diffData.push('equal');
        }
      }
    });
  }

  //on select change function is called
  public selectOption(selectedBase: string) {
    this.base = selectedBase;
    this.getData(); // get json data on every select change
  }

  ngOnInit(): void {}
}
