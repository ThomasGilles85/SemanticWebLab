/* * * ./app/comments/components/comment-form.component.ts * * */
// Imports
import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import{SearchService} from '../../services/SearchService'
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'search-form',
    template: `
    <br>
    <div class="row">
        <div class="col-md-3 col-lg-3"></div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="text-align: center;">
            <img src="../../../assets/logo-eis.png"  height="70px"/>
        </div>
        <div class="col-md-3 col-lg-3"></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-3 col-lg-3"></div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <form (ngSubmit)="submitSearch()">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-search"></span></span>
                                <input type="text" class="form-control" placeholder="Search for" [(ngModel)]="searchString" name="search">
                            </div>
                        </div>            
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-lg-4"></div>
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">  
                            <button type="submit" class="btn btn-primary btn-block">Search</button>
                        </div>
                    <div class="col-md-4 col-lg-4"></div>
                </div>
            </form>
        </div>
        <div class="col-md-3 col-lg-3"></div>
    </div>
    `,
})

export class SearchFormComponent{ 
    constructor(private searchService: SearchService
        ){}
  
    @Input() listId: string;

    private searchString:string;

    submitSearch(){
        this.searchService.getStandardsforSearch(this.searchString).subscribe(
            standards => {
                EmitterService.get(this.listId).emit(standards);
            },
            err => {
                 console.log(err);
            }
        );
    }
 }
