/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, Input } from '@angular/core';

import { Standard } from "app/model/STO";

@Component({
    selector: 'Standard-view',
    template: `
    <div class="panel panel-primary">
        <div class="panel-heading">{{header}}</div>
            <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">

                                    <label for="norm" class="col-lg-3 control-label">Norm</label>

                                    <div class="col-lg-9">
                                        <input value="{{standard.norm}}" readonly class="form-control" id="norm" placeholder="Norm">
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
    </div>          
    `,
})
export class StandardViewComponent {


    @Input() standard: Standard;
    @Input() header:string;

    
}
