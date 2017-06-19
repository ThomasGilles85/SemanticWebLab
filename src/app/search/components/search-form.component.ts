/* * * ./app/comments/components/comment-form.component.ts * * */
// Imports
import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import{SearchService} from '../services/SearchService'
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'search-form',
    template: `
        <form (ngSubmit)="submitSearch()">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-search"></span></span>
                    <input type="text" class="form-control" placeholder="Search for" [(ngModel)]="searchString" name="search">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Search</button>
                </div>
        </form>
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
