import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {SearchService} from './../services/SearchService';
import {DetailsViewComponent} from './components/index';
import {SDOViewComponent} from './components/SDO-View';
import {StandardViewComponent} from './components/Standard-View';
import {RamiViewComponent} from './components/Rami-View';
import {GraphViewComponent} from './components/Graph-View';
import {APP_CONFIG,APP_DI_CONFIG} from '../config'





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
    SDOViewComponent,
    GraphViewComponent
  ],

  providers: [
    SearchService,
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG }
  ],

  exports:[
    DetailsViewComponent,
    StandardViewComponent,
    RamiViewComponent,
    SDOViewComponent,
    GraphViewComponent
  ]
  
})
export class DetailsModule {}

