import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {SearchService} from './../services/SearchService';
import {DetailsViewComponent} from './components/index';
import {SDOViewComponent} from './components/SDO-View';
import {StandardViewComponent} from './components/Standard-View';
import {RamiViewComponent} from './components/Rami-View';





@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    DetailsViewComponent,
    StandardViewComponent,
    RamiViewComponent,
    SDOViewComponent
  ],

  providers: [
    SearchService
  ],

  exports:[
    DetailsViewComponent,
    StandardViewComponent,
    RamiViewComponent,
    SDOViewComponent
  ]
  
})
export class DetailsModule {}

