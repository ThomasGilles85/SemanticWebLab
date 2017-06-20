/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { EmitterService } from '../../emitter.service';
import { Standard, SDO } from "app/model/STO";

@Component({
    selector: 'details-widget',
    template: `
    <h2>Details</h2>
        <div class="row">

            <div class="col-md-4">
                <Standard-view [header]="'Standard information'" [standard]="standard"></Standard-view>
            </div>
            <div class="col-md-4">
                <SDO-view [header]="'Publisher'" [sdo]="standard.publisher"></SDO-view>
            </div>
            <div class="col-md-4">
                <SDO-view [header]="'Developer'" [sdo]="standard.developer"></SDO-view>
            </div>


</div>
    `,
})
export class DetailsViewComponent {

    standard: Standard;

    constructor() {
        this.loadData();

    }

    @Input() standardId: string;


    loadData() {
        this.standard = new Standard();

        this.standard.norm = "62714";
        this.standard.hasStatus = "Active";
        this.standard.hasPublicationDate = new Date();


        this.standard.developer = new SDO();

        this.standard.developer.abbreviation = ["Test1", "Test2"];
        this.standard.developer.formationDate = new Date();
        this.standard.developer.orgName = "Frauenhofer";

        this.standard.publisher = new SDO();

        this.standard.publisher.abbreviation = ["Test1", "Test2"];
        this.standard.publisher.formationDate = new Date();
        this.standard.publisher.orgName = "Frauenhofer";



    }
}
