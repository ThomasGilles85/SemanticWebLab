/* * * ./app/comments/components/comment-list.component.ts * * */
// Imports
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EmitterService } from '../../emitter.service';

// Component decorator
@Component({
    selector: 'search-list',
    template: `

    `,
})
// Component class
export class SearchListComponent implements OnInit, OnChanges{
    constructor(
        ){}
    
    ngOnInit(){

    }
    

    ngOnChanges(changes:any) {
    }
    
 }
