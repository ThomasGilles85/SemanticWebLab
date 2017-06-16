/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component} from '@angular/core';
import {EmitterService} from '../../emitter.service';

@Component({
    selector: 'search-widget',
    template: `
        <div>
            <search-form></search-form>
            <search-list></search-list>
        </div>
    `,
})
export class SearchComponent {  }
