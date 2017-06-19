/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component} from '@angular/core';
import {EmitterService} from '../../emitter.service';

@Component({
    selector: 'search-widget',
    template: `
        <div>
            <search-form [listId]="listId"></search-form>
            <search-list [listId]="listId"></search-list>
        </div>
    `,
})
export class SearchComponent {  
    private listId = 'COMMENT_COMPONENT_LIST';
}
