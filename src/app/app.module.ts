import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {SearchModule} from './search/search.module';
import {EmitterService} from './emitter.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    SearchModule
  ],
  providers: [
    EmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
