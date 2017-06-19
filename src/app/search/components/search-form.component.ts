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
                <br />
                <button type="submit" class="btn btn-primary btn-block">Add</button>
                </div>
        </form>
    `,
})

export class SearchFormComponent{ 
    constructor(private searchService: SearchService
        ){}
  
    private standards;

    submitSearch(){
                    this.searchService.getStandardsforSearch().subscribe();
    }
 }
