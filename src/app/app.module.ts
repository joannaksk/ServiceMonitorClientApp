import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MaterialModule } from './material.module';

// THEME:https://coolors.co/039be5-13293d-c9f9ff-f0ff1d-5e5c6c

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [DatePipe, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
