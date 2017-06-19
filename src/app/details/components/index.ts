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
                <div class="panel panel-primary">
                    <div class="panel-heading">Standard information</div>
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
                </div>
            <div class="col-md-4">
            <div class="panel panel-primary">
                <div class="panel-heading">Publisher</div>
                    <div class="panel-body">
                    <form class="form-horizontal">
                                <div class="form-group">

                                    <label for="publisherorganisation" class="col-lg-3 control-label">Organisation</label>

                                    <div class="col-lg-9">
                                        <input value="{{standard.publisher.orgName}}" readonly class="form-control" id="publisherorganisation" placeholder="Norm">
                                    </div>
                                </div>  
                                <div class="form-group">     
                                    <label for="publisherdate" class="col-lg-3 control-label">Date</label>

                                    <div class="col-lg-9">
                                        <input value="{{standard.publisher.formationDate | date:'dd/MM/yyyy'}}" readonly class="form-control" id="publisherdate" placeholder="Date">
                                    </div>
                                </div>
                                <div class="form-group">     
                                    <label for="publisherabbreviation" class="col-lg-3 control-label">Abbreviation</label>

                                    <div class="col-lg-9">
                                        <table id="publisherabbreviation">
                                            <tr *ngFor="let row of standard.publisher.abbreviation ">
                                                <td> {{row}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
            <div class="panel panel-primary">
              <div class="panel-heading">Developer</div>

                <div class="panel-body">
                    <form class="form-horizontal">
                                <div class="form-group">

                                    <label for="developerorganisation" class="col-lg-3 control-label">Organisation</label>

                                    <div class="col-lg-9">
                                        <input value="{{standard.developer.orgName}}" readonly class="form-control" id="developerorganisation" placeholder="Norm">
                                    </div>
                                </div>  
                                <div class="form-group">     
                                    <label for="developerdate" class="col-lg-3 control-label">Date</label>

                                    <div class="col-lg-9">
                                        <input value="{{standard.developer.formationDate | date:'dd/MM/yyyy'}}" readonly class="form-control" id="developerdate" placeholder="Date">
                                    </div>
                                </div>
                                <div class="form-group">     
                                    <label for="developerabbreviation" class="col-lg-3 control-label">Abbreviation</label>

                                    <div class="col-lg-9">
                                        <table id="developerabbreviation">
                                            <tr *ngFor="let row of standard.developer.abbreviation ">
                                                <td> {{row}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
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
