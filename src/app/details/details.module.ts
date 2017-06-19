import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {SearchService} from './../services/SearchService';
import {DetailsViewComponent} from './components/index';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    DetailsViewComponent
  ],

  providers: [
    SearchService
  ],

  exports:[
    DetailsViewComponent
  ]
  
})
export class DetailsModule {}

