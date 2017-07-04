import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmitterService } from '../../emitter.service';
import { Standard} from '../../model/STO';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
    selector: 'search-result',
    template: `        
        <div class="panel panel-default">
            <div class="panel-heading">{{standard.publisher.abbreviation}} {{standard.norm}}</div>
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
                        <button (click)="showDetails($event)" id="{{standard.norm}}" class="btn btn-info" style="horizontal-align:middle"><span class="glyphicon glyphicon-info-sign"></span></button>
                    </div>
                </div>  
            </div>
        </div>
    `
})
export class SearchResultComponent { 
     constructor(  private router: Router
        ){}

    @Input() standard: Standard;
    @Input() listId: string;

    showDetails(event){
        var target = event.currentTarget;
        var value = target.id;
        this.router.navigate(['/details', value]);
    }
 }
