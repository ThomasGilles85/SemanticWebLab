import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {SearchComponent} from './components/index';
import {SearchListComponent} from './components/search-list.component';
import {SearchFormComponent} from './components/search-form.component';


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
      SearchFormComponent
  ],

  providers: [
  ],

  exports:[
      SearchComponent,
      SearchListComponent,
      SearchFormComponent
  ]
  
})
export class SearchModule {
}

