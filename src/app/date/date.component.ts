import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date',
  
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  constructor() { }

  today = Date.now();
  fixedTimezone = '2015-06-15T09:03:01+0900';

  ngOnInit() {
  }



}

