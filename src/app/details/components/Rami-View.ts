/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, Input } from '@angular/core';

import { Standard } from "app/model/STO";

@Component({
    selector: 'Rami-view',
    template: `
    <div class="panel panel-primary">
        <div class="panel-heading">{{header}}</div>
        <div class="panel-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="ramiHierarchyLevel" class="col-lg-4 control-label">HierarchyLevel</label>
                    <div class="col-lg-8">
                        <input value="{{standard.ramiHierarchyLevel.Label}}" readonly class="form-control" id="ramiHierarchyLevel" placeholder="Norm">
                    </div>
                </div>  
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
            </form>
        </div>
    </div>        
    `,
})
export class RamiViewComponent {


    @Input() standard: Standard;
    @Input() header:string;

    
}
