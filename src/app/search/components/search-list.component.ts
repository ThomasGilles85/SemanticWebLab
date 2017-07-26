/* * * ./app/comments/components/comment-list.component.ts * * */
// Imports
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Standard} from '../../model/STO';

import { EmitterService } from '../../emitter.service';

// Component decorator
@Component({
    selector: 'search-list',
    template: `
        <div class="row">
            <div class ="col-xs-0 col-sm-0 col-md-2"></div>
            <div class ="col-md-8 col-xs-12 col-sm-12">
                <search-result [listId]="listId" *ngFor="let standard of standards" [standard]="standard"></search-result>
            </div>
            <div class ="col-xs-0 col-sm-0 col-md-2"></div>
        </div>
    `,
})
// Component class
export class SearchListComponent implements OnInit, OnChanges{
    constructor(
        ){}
    
    @Input() listId: string;
    standards : Standard[]

    ngOnInit(){

    }
    

    ngOnChanges(changes:any) {
                EmitterService.get(this.listId).subscribe((standards:Standard[]) => {this.standards = standards});
    }   
 }
