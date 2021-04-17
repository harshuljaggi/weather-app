import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url: string = "https://api.openweathermap.org/data/2.5/";
  key: string = environment.open_weather_api_key;

  constructor(private http: HttpClient) { }

  // Gets current weather data for a city
  getCurrentWeather(cityName: string) {
    return this.http.get<any>(`${this.url}weather?q=${cityName}&&appid=${this.key}&units=metric`).pipe(
      tap(data => console.log(`Current weather data for ${cityName} : ${JSON.stringify(data)}`)),
      catchError(this.handleError));
  }

  // Handler function for Error in Backend Call
  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = String(err.status);
    }
    return throwError(errMsg);
  }
}
