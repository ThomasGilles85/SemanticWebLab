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
            <graph-view [currentStandard]="standard.norm[0]"></graph-view>
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

    mockData() {
        this.standard = new Standard();

        this.standard.norm = ["62714"];
        this.standard.hasStatus = "Active";
        this.standard.hasPublicationDate = new Date();

        // this.standard.isPartOf = [new StandardParts("Part1"),new StandardParts("Part2")];

        this.standard.licence = new StandardLicence("Public","Public");
        this.standard.scope = new Domain("CAD");


        this.standard.developer = [new SDO()];

        this.standard.developer[0].abbreviation = ["IEC"];
        this.standard.developer[0].formationDate = new Date("1906-06-26");
        this.standard.developer[0].orgName = ["International Electrotechnical Commission"];

        this.standard.publisher = [new SDO()];

        this.standard.publisher[0].abbreviation = ["IEC"];
        this.standard.publisher[0].formationDate = new Date("1906-06-26");
        this.standard.publisher[0].orgName = ["International Electrotechnical Commission"];

        this.standard.hasAdminShellSubmodel = new AdminShellSubmodel("Engineering");
        this.standard.hasRAMIITLayer = new RAMIITLayer("Information");
        this.standard.ramiHierarchyLevel = [new RAMIHierarchyLevel("FieldDevice"),
        new RAMIHierarchyLevel("Product"),
        new RAMIHierarchyLevel("Station"),
        new RAMIHierarchyLevel("ControlDevice")
        ];



    }
}
