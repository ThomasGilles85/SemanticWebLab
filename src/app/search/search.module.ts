import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {SearchComponent} from './components/index';
import {SearchListComponent} from './components/search-list.component';
import {SearchFormComponent} from './components/search-form.component';
import {SearchResultComponent} from './components/search-result.component';

import {SearchService} from './../services/SearchService';
import {APP_CONFIG,APP_DI_CONFIG} from '../config'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
      SearchComponent,
      SearchListComponent,
      SearchFormComponent,
      SearchResultComponent
  ],

  providers: [
    SearchService,
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG }
  ],

  exports:[
      SearchComponent,
      SearchListComponent,
      SearchFormComponent,
      SearchResultComponent
  ]
  
})
export class SearchModule {}

