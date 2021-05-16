import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './weather/home-component/home-component.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { POSITION_OPTIONS } from '@ng-web-apis/geolocation';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  providers: [
    {
      provide: POSITION_OPTIONS,
      useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 0},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
