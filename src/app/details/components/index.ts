/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { EmitterService } from '../../emitter.service';
import { Domain ,Standard, SDO , AdminShellSubmodel , RAMIITLayer , RAMIHierarchyLevel , StandardParts , StandardLicence } from "app/model/STO";

@Component({
    selector: 'details-widget',
    template: `
    <h2>Details</h2> 
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
    <br>
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

        this.standard.isPartOf = [new StandardParts("Part1"),new StandardParts("Part2")];

        this.standard.licence = new StandardLicence("Term","Type");
        this.standard.scope = new Domain("DomainName");


        this.standard.developer = new SDO();

        this.standard.developer.abbreviation = ["Test1", "Test2"];
        this.standard.developer.formationDate = new Date();
        this.standard.developer.orgName = "Frauenhofer";

        this.standard.publisher = new SDO();

        this.standard.publisher.abbreviation = ["Test1", "Test2"];
        this.standard.publisher.formationDate = new Date();
        this.standard.publisher.orgName = "Frauenhofer";

        this.standard.hasAdminShellSubmodel = new AdminShellSubmodel("Submodel");
        this.standard.hasRAMIITLayer = new RAMIITLayer("IT-Layer");
        this.standard.ramiHierarchyLevel = new RAMIHierarchyLevel("HierarchyLevel");



    }
}
