import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {SearchModule} from './search/search.module';
import {DetailsModule} from './details/details.module';

import {EmitterService} from './emitter.service';

import {SearchComponent} from './search.component';
import {DetailsComponent} from './details.component';

import {PageNotFoundComponent} from './not-found.component';



const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    SearchModule,
    DetailsModule
  ],
  providers: [
    EmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
