/* * * ./app/comments/components/index.ts * * */
// Imports
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import{SearchService} from '../../services/SearchService'
import { EmitterService } from '../../emitter.service';
import { Domain ,Standard, SDO , AdminShellSubmodel , RAMIITLayer , RAMIHierarchyLevel , StandardParts , StandardLicence } from "app/model/STO";

@Component({
    selector: 'details-widget',
    template: `
    <div style="text-align: center;">
    <h2>Details</h2>
    </div> 
    <div class="row" style="margin-left: 0px; margin-right: 0px; margin-top: 0px ; margin-bottom: 0px">
        <div class="col-md-12 col-lg-12 col-xs-12">
            <Standard-view [header]="'Standard information'" [standard]="standard"></Standard-view>
        </div>
    </div>
    <div class="row" style="margin-left: 0px; margin-right: 0px; margin-top: 0px ; margin-bottom: 0px"> 
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
    <div class="row" style="margin-left: 0px; margin-right: 0px; margin-top: 0px ; margin-bottom: 0px"> 
        <div class="col-md-12 col-lg-12 col-xs-12">
            <graph-view [currentStandard]="standardId"></graph-view>
        </div>
    </div>
    `,
})
export class DetailsViewComponent implements OnInit {

    standard: Standard = new Standard;

    constructor(private searchService: SearchService) {
    }

    ngOnInit() {
        this.loadData().subscribe(
            standard => {
                this.standard = standard;
            },
            err => {
                 console.log(err);
            }
        );
    }

    @Input() standardId: string;

    loadData()
    {
        return this.searchService.getStandardsforDetails(this.standardId);
    }
}
