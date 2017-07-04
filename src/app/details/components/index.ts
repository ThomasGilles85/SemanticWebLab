/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { EmitterService } from '../../emitter.service';
import { Domain ,Standard, SDO , AdminShellSubmodel , RAMIITLayer , RAMIHierarchyLevel , StandardParts , StandardLicence } from "app/model/STO";

@Component({
    selector: 'details-widget',
    template: `
    <div style="text-align: center;">
    <h2>Details</h2>
    </div> 
    <div class="row" style="margin-left: 0px; margin-right:0px;">
        <div class="col-md-12 col-lg-12 col-xs-12">
            <Standard-view [header]="'Standard information'" [standard]="standard"></Standard-view>
        </div>
    </div>
    <div class="row" style="margin-left: 0px; margin-right: 0px;"> 
        <div class="col-md-4 col-lg-4 col-xs-12">
            <SDO-view [header]="'Publisher'" [sdo]="standard.publisher"></SDO-view>
        </div>
        <div class="col-md-4 col-lg-4 col-xs-12">
            <SDO-view [header]="'Developer'" [sdo]="standard.developer"></SDO-view>
        </div>

        <div class="col-md-4 col-lg-4 col-xs-12">
            <Rami-view [header]="'RAMI'" [standard]="standard"></Rami-view>
        </div>
    </div>
    <div class="row" style="margin-left: 0px; margin-right: 0px;"> 
        <div class="col-md-12 col-lg-12 col-xs-12">
            <graph-view [currentStandard]="standard.norm"></graph-view>
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

        // this.standard.isPartOf = [new StandardParts("Part1"),new StandardParts("Part2")];

        this.standard.licence = new StandardLicence("Public","Public");
        this.standard.scope = new Domain("CAD");


        this.standard.developer = new SDO();

        this.standard.developer.abbreviation = ["IEC"];
        this.standard.developer.formationDate = new Date("1906-06-26");
        this.standard.developer.orgName = "International Electrotechnical Commission";

        this.standard.publisher = new SDO();

        this.standard.publisher.abbreviation = ["IEC"];
        this.standard.publisher.formationDate = new Date("1906-06-26");
        this.standard.publisher.orgName = "International Electrotechnical Commission";

        this.standard.hasAdminShellSubmodel = new AdminShellSubmodel("Engineering");
        this.standard.hasRAMIITLayer = new RAMIITLayer("Information");
        this.standard.ramiHierarchyLevel = [new RAMIHierarchyLevel("FieldDevice"),
        new RAMIHierarchyLevel("Product"),
        new RAMIHierarchyLevel("Station"),
        new RAMIHierarchyLevel("ControlDevice")
        ];



    }
}
