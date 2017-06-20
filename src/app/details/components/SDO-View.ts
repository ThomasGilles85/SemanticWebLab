/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, Input } from '@angular/core';

import { SDO } from "app/model/STO";

@Component({
    selector: 'SDO-view',
    template: `
    <div class="panel panel-primary">
        <div class="panel-heading">{{header}}</div>
        <div class="panel-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="organisation" class="col-lg-3 control-label">Organisation</label>
                    <div class="col-lg-9">
                        <input value="{{sdo.orgName}}" readonly class="form-control" id="organisation" placeholder="Norm">
                    </div>
                </div>  
                <div class="form-group">     
                    <label for="date" class="col-lg-3 control-label">Date</label>
                    <div class="col-lg-9">
                        <input value="{{sdo.formationDate | date:'dd/MM/yyyy'}}" readonly class="form-control" id="date" placeholder="Date">
                    </div>
                </div>
                <div class="form-group">     
                    <label for="abbreviation" class="col-lg-3 control-label">Abbreviation</label>
                    <div class="col-lg-9">
                        <table id="abbreviation">
                            <tr *ngFor="let row of sdo.abbreviation ">
                                <td> {{row}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </div>        
    `,
})
export class SDOViewComponent {


    @Input() sdo: SDO;
    @Input() header:string;

    
}
