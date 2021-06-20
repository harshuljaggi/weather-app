import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Util from '../common/util';

@Component({
  selector: 'app-city-card-component',
  templateUrl: './city-card-component.component.html',
  styleUrls: ['./city-card-component.component.css']
})

export class CityCardComponentComponent implements OnInit {
  @Input() city: any;
  @Input() tempUnitText: string = "";
  @Output() removeCityEvent = new EventEmitter<number>();
  util: any = Util;
  weatherIconPath: string = "assets/images";
  imgURL: string = 'https://openweathermap.org/img/wn/';

  constructor() { }

  ngOnInit(): void {
    console.log("Creating city card component");
  }

  removeCity(cityID: number) {
    this.removeCityEvent.emit(cityID);
  }
}
