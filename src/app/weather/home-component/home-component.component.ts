import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ToastrService } from 'ngx-toastr';
import * as Util from '../common/util';
import { NgForm } from '@angular/forms';

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

  constructor(private weatherService: WeatherService, private toastr: ToastrService) {}

  ngOnInit(): void {
    console.log('Creating Home Component');
  }

  // retrieves weather data for the city
  getCurrentWeather(cityName: string) {
    console.log(`Requesting current weather for ${cityName}`);
    this.weatherService.getCurrentWeather(cityName).subscribe(
      (data) => this.citiesWeatherList.unshift(data),
      (error) => (this.showWarningToastr(<string><any>error === "404" ? `Search Data unavailable for ${cityName}` : error))
    ); 
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
    this.showSuccessToastr("Successfuly removed city card!");
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
