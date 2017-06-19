import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmitterService } from '../../emitter.service';
import { Standard} from '../model/STO';


@Component({
    selector: 'search-result',
    template: `        
        <div class="panel panel-default">
            <div class="panel-heading">{{standard.norm}}</div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-2">
                        <h4>Status</h4>
                        <p>{{standard.hasStatus}}</p>
                    </div>
                    <div class="col-md-2">
                        <h4>Publication Date</h4>
                        <p>{{standard.hasPublicationDate | date: 'dd/MM/yyyy'}}</p>
                    </div>
                     <div class="col-md-2">
                        <button class="btn btn-info" style="horizontal-align:middle"><span class="glyphicon glyphicon-info-sign"></span></button>
                    </div>
                </div>  
            </div>
        </div>
    `
})
export class SearchResultComponent { 
     constructor(
        ){}

    @Input() standard: Standard;
    @Input() listId: string;

  
 }
