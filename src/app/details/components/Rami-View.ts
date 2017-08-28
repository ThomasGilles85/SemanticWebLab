/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, Input } from '@angular/core';
import { Standard } from "app/model/STO";
import { collapsedContent } from "../../Shared/collapsedContent";


@Component({
    selector: 'Rami-view',
    template: `
    <div class="panel panel-primary" style="margin-left: 0px; margin-right: 0px; margin-top: 5px ; margin-bottom: 5px">
        <div class="panel-heading">
        <h4 class="panel-title">
            <a (click)="isCollapsedContent = !isCollapsedContent">{{header}}</a>
            </h4>
        </div>
        <div class="panel-body" *ngIf="!isCollapsedContent">
            <form class="form-horizontal">
                <div class="form-group">     
                    <label for="rAMIITLayer" class="col-lg-4 control-label">ITLayer</label>
                    <div class="col-lg-8">
                        <input value="{{standard.hasRAMIITLayer.Layer}}" readonly class="form-control" id="rAMIITLayer" placeholder="Date">
                    </div>
                </div>
                <div class="form-group">     
                    <label for="adminShellSubmodel" class="col-lg-4 control-label">ShellSubmodel</label>
                    <div class="col-lg-8">
                        <input value="{{standard.hasAdminShellSubmodel.Label}}" readonly class="form-control" id="adminShellSubmodel" placeholder="Date">
                    </div>
                </div>
                <div class="form-group">
                    <label for="ramiHierarchyLevel" class="col-lg-4 control-label">HierarchyLevel</label>
                    <div class="col-lg-8" style="max-height:45px;overflow-y: auto;">
                             <select id="ramiHierarchyLevel" class="form-control" name="color">
                                  <option *ngFor="let c of standard.ramiHierarchyLevel" [ngValue]="c">{{c.Label}}</option>
                            </select>
                        </div>
                </div>  
            </form>
        </div>
    </div>        
    `,
    
})
export class RamiViewComponent extends collapsedContent {

    @Input() standard: Standard;
    @Input() header:string;

    
}
