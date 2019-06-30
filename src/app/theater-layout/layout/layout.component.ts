import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { seatsLayout } from '../../app.component';
import { SeatBookigServiceService } from '../seat-bookig-service.service';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";


@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() seatsLayout: seatsLayout;
  rows = new Array();
  custName: string = '';
  totSeats: number;
  finalData = new Array();
  divDisable: string = 'disabled-contenct';
  selectSeats = new Array();
  disButton: number = 0;


  getBookings: any;
  booked = new Array();

  constructor( private toaster: Toaster,private seatBookingServive: SeatBookigServiceService) {

  }

  ngOnInit() {
    var rows = new Array()
    var seatsInARow = new Array()
    var seatChar;

    this.getBookings = this.seatBookingServive.getBooking();
    var bookedSeats = new Array();
    if (this.getBookings) {
      this.getBookings.forEach(function (arrayItem) {
        let booked = JSON.parse(arrayItem)[0].seats;
        bookedSeats.concat(JSON.parse(arrayItem)[0].seats);
        bookedSeats.push(booked)
      });
      this.booked = [].concat.apply([], bookedSeats);
    }

    if (this.seatsLayout != undefined && this.seatsLayout.hasOwnProperty('totalRows')) {
      if (this.seatsLayout.seatNaming = 'rowType') {
        for (let row = 0; row < this.seatsLayout.totalRows; row++) {
          for (let seats = 0; seats < this.seatsLayout.seatsPerRow; seats++) {
            seatChar = String.fromCharCode(65 + seats)
            seatsInARow.push(seatChar + (row + 1).toString());
          }
          rows.push(seatsInARow);
          seatsInARow = new Array();
        }
      }
    }
    this.rows = rows;
  }

  done() {
    if (this.totSeats != this.selectSeats.length) {
      this.toaster.open({
        text: "You are allowed to select number of seats you have enetered...(You cant select more or less than that)",
        caption:  ' Attention!!!',
        type: "warning",
      });
      return;
    }
    this.finalData['cName'] = this.custName;
    this.finalData['totSeats'] = this.selectSeats.length;
    this.finalData['seats'] = this.selectSeats;
    this.finalData.push({
      cName: this.custName,
      totSeats: this.selectSeats.length,
      seats: this.selectSeats
    });
    this.seatBookingServive.setBooking(this.finalData);
    this.toaster.open({
      text: "Suceessfully booked",
      caption:  ' Attention!!!',
      type: "success",
    });
    location.reload();
  }

  seatAction(seat, event) {
    if (event.target.checked) {
      if (this.totSeats < this.selectSeats.length + 1) { 
        this.toaster.open({
          text: "You are not allowed to select seats more than entered",
          caption:  ' Attention!!!',
          type: "warning",
        });
        event.target.checked = false;
      } else {
        this.selectSeats.push(seat);
      }
    } else {
      this.selectSeats.splice(this.selectSeats.indexOf(seat), 1);
    }
  }

  startSelection() {
    if (!this.totSeats) {
      this.totSeats = 0;
    }
    if (this.custName != '' && this.totSeats != 0) {
      if ((120 - this.booked.length) < this.totSeats) {
        this.toaster.open({
          text: "Invalid number of seats",
          caption:  ' Attention!!!',
          type: "danger",
        });
      } else {
        this.divDisable = '';
        this.disButton = 1;
      }

    } else {
      this.toaster.open({
        text: "Please provide your name and number of seats needed",
        caption:  ' Attention!!!',
        type: "danger",
      });
      this.totSeats = null;
    }

  }

  getName(item) {
    return JSON.parse(item)[0].cName;
  }
  gettotSeats(item) {
    return JSON.parse(item)[0].totSeats;
  }
  getSeats(item) {
    return JSON.parse(item)[0].seats;
  }

  resetSelection() {
    location.reload();
  }
}
