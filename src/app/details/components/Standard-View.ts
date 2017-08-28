/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, Input } from '@angular/core';
import { collapsedContent } from "../../Shared/collapsedContent";

import { Standard } from "app/model/STO";

@Component({
    selector: 'Standard-view',
    template: `
    <div class="panel panel-primary" style="margin-left: 0px; margin-right: 0px; margin-top: 5px ; margin-bottom: 5px">
        <div class="panel-heading">
                <h4 class="panel-title">
            <a (click)="isCollapsedContent = !isCollapsedContent">{{header}}</a>
            </h4>
        </div>
        <div class="panel-body" *ngIf="!isCollapsedContent">
            <div class="row">
                <div class="col-md-4">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="norm" class="col-lg-3 control-label">Norm</label>

                            <div class="col-lg-9">
                                <input value="{{standard.norm[0]}}" readonly class="form-control" id="norm" placeholder="Norm">
                            </div>
                        </div>  
                         <div class="form-group">     
                            <label for="date" class="col-lg-3 control-label">Date</label>

                            <div class="col-lg-9">
                                <input value="{{standard.hasPublicationDate | date:'dd/MM/yyyy'}}" readonly class="form-control" id="date" placeholder="Date">
                            </div>
                        </div>
                        <div class="form-group">     
                            <label for="status" class="col-lg-3 control-label">Status</label>

                            <div class="col-lg-9">
                                <input value="{{standard.hasStatus}}" readonly class="form-control" id="status" placeholder="Status">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-4">
                    <form class="form-horizontal">
                        <label for="parts" class="col-lg-3 control-label">Parts</label>
                        <div class="col-lg-9" style="overflow-y: auto;">
                            <table id="parts" class="table table-striped table-bordered">
                                <tr *ngFor="let row of standard.isPartOf ">
                                    <td > {{row.stoPartName}}</td>
                                </tr>
                            </table>
                        </div>
                    </form>
                </div>
                <div class="col-md-4">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="damainName" class="col-lg-3 control-label">Domain</label>

                            <div class="col-lg-9">
                                <input value="{{standard.scope.domainName}}" readonly class="form-control" id="damainName" placeholder="Norm">
                            </div>
                        </div>  
                         <div class="form-group">     
                            <label for="licenseTerms" class="col-lg-3 control-label">Licenceterm</label>

                            <div class="col-lg-9">
                                <input value="{{standard.licence.licenseTerms}}" readonly class="form-control" id="licenseTerms" placeholder="Date">
                            </div>
                        </div>
                        <div class="form-group">     
                            <label for="usageTypes" class="col-lg-3 control-label">Usagetype</label>

                            <div class="col-lg-9">
                                <input value="{{standard.licence.usageTypes}}" readonly class="form-control" id="usageTypes" placeholder="Status">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
       
    `,
})
export class StandardViewComponent extends collapsedContent {


    @Input() standard: Standard;
    @Input() header:string;

    
}
