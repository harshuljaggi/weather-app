import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ToastrService } from 'ngx-toastr';
import * as Util from '../common/util';
import { NgForm } from '@angular/forms';
import { GeolocationService, GEOLOCATION_SUPPORT } from '@ng-web-apis/geolocation';
import { take } from 'rxjs/operators'
import { Inject } from '@angular/core';
import { logging } from 'selenium-webdriver';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  errorMessage: string = '';
  cityWeatherDetails = {};
  citiesWeatherList: any[] = [];
  citiesIconList: any[] = [];
  searchCity: string = '';
  util: any = Util;
  imgURL: string = 'https://openweathermap.org/img/wn/';
  weatherIconPath: string = "assets/images";

  constructor(private weatherService: WeatherService, private toastr: ToastrService, private readonly geolocation$: GeolocationService, @Inject(GEOLOCATION_SUPPORT) private readonly geolocationSupport: boolean) {}

  ngOnInit(): void {
    console.log('Creating Home Component');
    // If user's browser supports Geolocation API
    if (this.geolocationSupport) {
      console.log(`User's browser supports Geolocation API.`);
      console.log(`Requesting User's Geo location.`);
      this.getWeatherForGeoLocation();
    } else {
      console.log(`User's browser doesn't supports Geolocation API.`);
    }
  }

  // Asks user for geo location to fetch geo locatiom specific weather data
  getWeatherForGeoLocation() {
    this.geolocation$.pipe(take(1)).subscribe(
      position => this.getCurrentWeather('', String(position.coords.latitude), String(position.coords.longitude)),
      error => console.log(error.message)
    );
  }

  // retrieves weather data
  getCurrentWeather(cityName: string,  lat: string = '', long: string = '') {
    console.log(`Requesting current weather for [${cityName}] [${lat}] [${long}]`);
    this.weatherService.getCurrentWeather(cityName, lat, long).subscribe(
      data => this.citiesWeatherList.unshift(data),
      error => this.showErrorInfo(error, cityName)
    ); 
  }

  showErrorInfo(error: any, cityName: string) {
    const errorCode = <string>error;
    if (errorCode === '404') {
      this.showWarningToastr(`Search Data unavailable for ${cityName}`);
    } else if (errorCode === '400') {
      this.showWarningToastr(`Invalid input`);
    } else if (errorCode === '0') {
      this.showWarningToastr(`Network unavailable. Please check your connection settings.`);
    } else {
      this.showWarningToastr(errorCode);
    }
  }

  // Handler function triggered on form submit
  onSubmit(weatherForm: NgForm) {
    // Check whether input cityname weather data is already available in the app
    const [isCityPresent, city] = this.checkInCitiesWeatherList();
    if (isCityPresent) {
      this.showWarningToastr(`Weather data for ${city} is already available! If ${city} is part of different Country/State then search with "${city}, <2 letter Country/State code>"`,
      { 
        timeOut: 5000
      })
    } else {
      this.getCurrentWeather(this.searchCity);
      // Reset the form
      weatherForm.reset();
    }
  }

  // Search for the input city in citiesWeatherList to ensure single request for single city
  checkInCitiesWeatherList() {
    // If the searchCity string contains non empty value
    if (this.searchCity) {
      // Trim leading and trailing spaces
      this.searchCity = this.searchCity.trim();
      // If search input contains comma then split the string
      if (this.searchCity.includes(",")) {
        let city = this.searchCity.split(",")[0].trim();
        let stateCountryCode = this.searchCity.split(",")[1].trim()

        // If country/state code is a valid 2 letter code
        if(stateCountryCode.length === 2) {
          return [this.isCityAvailable(city, stateCountryCode), city]
        } else {
          // for invalid country/state code ignore the code
          return [this.isCityAvailable(city), city]
        }
      } else {
        // If search input contains single value
        return [this.isCityAvailable(this.searchCity), this.searchCity]
      }
    } else {
      // if searchCity contains empty string value
      return [this.isCityAvailable(this.searchCity), this.searchCity]
    }
  }

  // check whether city is present in citiesWeatherList
  isCityAvailable(inputCity: string, inputStateCountryCode: string="") {
    let cityAvailable: boolean = false; 
    let countryAvailable: boolean = false; 
    // check whether city weather list contains atleast one value
    if (this.citiesWeatherList.length) {
      this.citiesWeatherList.forEach(city => {
        // compare each city name with input city value
        if (city.name.toLowerCase() === inputCity.trim().toLowerCase()) {
          // if there is an input state / country code
          if (inputStateCountryCode !== "") {
            // compare each city's country name with input city's country value
            if (city.sys.country.toLowerCase() === inputStateCountryCode.toLowerCase()) {
              countryAvailable = true
              cityAvailable = true
            }
          } else {
            cityAvailable = true;
          }
        }
      });
    }
    return cityAvailable;
  }

  // Removes city
  removeCity(cityID: number) {
    console.log(`Removing city : ${cityID}`);
    this.citiesWeatherList = this.citiesWeatherList.filter(
      (city) => city.id !== cityID
    );
    this.showSuccessToastr("Successfuly removed city");
  }

  showSuccessToastr(message: string, customConfig: any = undefined) {
    if (customConfig) {
      this.toastr.success(message, "Success", customConfig);
    } else {
      this.toastr.success(message, "Success");
    }
    
  }

  showWarningToastr(message: string, customConfig: any = undefined) {
    if (customConfig) {
      this.toastr.warning(message, "Warning", customConfig);
    } else {
      this.toastr.warning(message, "Warning");
    }
  }
}
