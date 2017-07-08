/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, Input } from '@angular/core';
import { collapsedContent } from "../../Shared/collapsedContent";

import { SDO } from "app/model/STO";

@Component({
    selector: 'SDO-view',
    template: `
    <div class="panel panel-primary">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-9 col-md-10">
                    <h4 class="panel-title">
                        <a (click)="isCollapsedContent = !isCollapsedContent">{{header}}</a>
                    </h4>
                </div>
                <div class="col-xs-3 col-md-2" *ngIf="sdo.length > 1">
                    <h4 class="panel-title">
                        <a (click)="nextElement()">Next</a>
                    </h4>
                </div>
            </div>
        </div>
        <div class="panel-body" *ngIf="!isCollapsedContent">
            <form class="form-horizontal">                
                    <div class="form-group">
                        <label for="organisation" class="col-lg-3 control-label">Organisation</label>
                        <div class="col-lg-9">
                            <input value="{{sdo[current].orgName[0]}}" readonly class="form-control" id="organisation" placeholder="Norm">
                        </div>
                    </div>                  
                    <div class="form-group">                    
                        <label for="date" class="col-lg-3 control-label">Date</label>
                        <div class="col-lg-9">
                            <input value="{{sdo[current].formationDate | date:'dd/MM/yyyy'}}" readonly class="form-control" id="date" placeholder="Date">
                        </div>
                    </div>
                    <div class="form-group">     
                        <label for="abbreviation" class="col-lg-3 control-label">Abbreviation</label>
                        <div class="col-lg-9" style="overflow-y: auto;">
                            <input value="{{sdo[current].abbreviation[0]}}" readonly class="form-control" id="organisation" placeholder="Norm">
                        </div>
                    </div>
            </form>
        </div>
    </div>        
    `,
})
export class SDOViewComponent extends collapsedContent{

    current = 0;


    @Input() sdo: SDO[];
    @Input() header:string;

    nextElement(event) {
        if(this.current + 1 === this.sdo.length) this.current = 0;
        else this.current++;
    }
    
}
