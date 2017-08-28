import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmitterService } from '../../emitter.service';
import { Standard} from '../../model/STO';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
    selector: 'search-result',
    template: `        
        <div class="panel panel-default" style="margin-bottom: 1px;">
            <div class="panel-heading" style="height: 20px">{{standard.publisher[0].abbreviation[0]}} {{standard.norm[0]}}</div>
            <div class="panel-body" style="padding: 1px; */">
                <div class="row">
                    <div class="col-md-1">
                        <h4>Status:</h4>
                    </div>
                    <div class="col-md-2">
                        <h4>{{standard.hasStatus}}</h4>
                    </div>
                    <div class="col-md-3">
                        <h4>Publication Date:</h4>
                    </div>
                    <div class="col-md-1">
                        <h4>{{standard.hasPublicationDate | date: 'dd/MM/yyyy'}}</h4>
                    </div>
                     <div class="col-md-5 text-right">
                        <button (click)="showDetails($event)" id="{{standard.uri}}" class="btn btn-info" style="height:35px ; width=35px ; vertical-align: middle; margin:0 auto; display:block;"><span style="height:35px ; width=35px ; text-align: center ; vertical-align: middle ;  horizontal-align: middle" class="glyphicon glyphicon-info-sign"></span></button>
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
