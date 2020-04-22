import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  constructor(private httpClient: HttpClient) {}

  //set default base currency
  baseCurrency = 'EUR';

  //fetch latest data to get last fetch date as yesterday
  public getDate(selectedBase: string): Observable<any> {
    let subject: Subject<any> = new Subject();
    this.httpClient
      .get('https://api.exchangeratesapi.io/latest?base=' + selectedBase)
      .subscribe((results: any) => {
        subject.next(results.date);
      });

    return subject;
  }

  public getData(base: string): Observable<any> {
    //change global base
    this.baseCurrency = base;

    let today: any;
    let yesterday: any;
    let subject: Subject<any> = new Subject();

    //fetch latest date, calculate previous date and call api to fetch data between two dates
    this.getDate(base).subscribe((result: any) => {
      // set yesterday
      yesterday = result;

      // get todays date as today
      let d = new Date();
      today = d.toISOString().slice(0, 10);

      /*  **static url** */
      //  'https://api.exchangeratesapi.io/history?start_at=2020-04-16&end_at=2020-04-17&base=' +base
      /*  **dynamic url** */
      //'https://api.exchangeratesapi.io/history?start_at='+yesterday+'&end_at='+today+'&base='+base

      // **using static url as dyamic url currently not giving data for both dates (as well as sometimes both dates are same)** //
      this.httpClient
        .get(
          'https://api.exchangeratesapi.io/history?start_at=2020-04-16&end_at=2020-04-17&base=' +
            base
        )
        .subscribe((results: any) => {
          subject.next(results.rates);
        });
    });

    return subject;
  }

  public getSymbolData(symbol: string, type: string): Observable<any> {
     //API does not allow EUR as a symbol
    //Type checks if call to function is coming from symbol historical function or base historical function
    if (this.baseCurrency === 'EUR' && type != 'clickedSymbol') {
      symbol = this.baseCurrency + '&base=USD';
    } else if (this.baseCurrency != 'EUR' && type != 'clickedSymbol') {
      symbol = this.baseCurrency;
    }

    //set current month start date as start and last date as end
    let date = new Date();
    let start = new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    let end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10);

    let subject: Subject<any> = new Subject();

    this.httpClient
      .get(
        'https://api.exchangeratesapi.io/history?start_at=' +
          start +
          '&end_at=' +
          end +
          '&symbols=' +
          symbol
      )
      .subscribe((results: any) => {
        subject.next(results.rates);
      });

    return subject;
  }
}
