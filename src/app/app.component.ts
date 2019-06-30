import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(){
  }
  

  seatsLayout:seatsLayout= {
    totalRows:10,
    seatsPerRow:12,
    seatNaming:'rowType',
  }
}

export class seatsLayout{
  totalRows: Number;
  seatsPerRow: Number;
  seatNaming: String;
}