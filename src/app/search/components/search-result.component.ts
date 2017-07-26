import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmitterService } from '../../emitter.service';
import { Standard} from '../../model/STO';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
    selector: 'search-result',
    template: `        
        <div class="panel panel-default" style="margin-bottom: 1px;">
            <div class="panel-heading" >{{standard.publisher[0].abbreviation[0]}} {{standard.norm[0]}}</div>
            <div class="panel-body" style="padding: 1px; */">
                <div class="row">
                    <div class="col-md-2">
                        <h4>Status</h4>
                        <p>{{standard.hasStatus}}</p>
                    </div>
                    <div class="col-md-2">
                        <h4>Publication Date</h4>
                        <p>{{standard.hasPublicationDate | date: 'dd/MM/yyyy'}}</p>
                    </div>
                     <div class="col-md-2 text-center">
                        <button (click)="showDetails($event)" id="{{standard.uri}}" class="btn btn-info" style="vertical-align: middle"><span class="glyphicon glyphicon-info-sign"></span></button>
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
