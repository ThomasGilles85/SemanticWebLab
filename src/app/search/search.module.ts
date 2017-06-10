import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {SearchComponent} from './components/index';
import {SearchListComponent} from './components/search-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
     HttpModule,
    JsonpModule,
    
  ],
  declarations: [
      SearchComponent
  ],

  providers: [
  ],

  exports:[
      SearchComponent
  ]
  
})
export class SearchModule {
}

