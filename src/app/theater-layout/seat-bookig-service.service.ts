import { Injectable } from '@angular/core';

@Injectable()
export class SeatBookigServiceService {
  constructor() { }

  public setBooking(obj) {
    var getData = this.getBooking();
    var dataArray: any = [];
    if (getData) {
      getData.forEach(function (arrayItem) {
        dataArray.push(arrayItem);
      });
      dataArray.push(JSON.stringify(obj));
      localStorage.setItem('bookingData', JSON.stringify(dataArray));
    } else {
      dataArray.push(JSON.stringify(obj));
      localStorage.setItem('bookingData', JSON.stringify(dataArray));
    }

  }

  public getBooking() {
    var x = localStorage.getItem("bookingData");
    return JSON.parse(x);
  }

}
