/* * * ./app/comments/components/comment-form.component.ts * * */
// Imports
import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';

import{SearchService} from '../../services/SearchService'
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'search-form',
    template: `
    <br>
    <div class="row">
        <div class="col-md-3 col-lg-3"></div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="text-align: center;">
            <img src="../../../assets/logo-eis.png"  height="70px"/>
        </div>
        <div class="col-md-3 col-lg-3"></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-3 col-lg-3"></div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <form (ngSubmit)="submitSearch()">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <div >
                                <div class="input-group">
                                    <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-search"></span></span>
                                    <input autocomplete="off" type="text" class="form-control" placeholder="Search for" [(ngModel)]="searchString" name="search" (keyup)=filter()>
                                </div>
                                <div class="suggestions" *ngIf="filteredList.length > 0">
                                    <ul *ngFor="let item of filteredList" >
                                        <li >
                                            <a (click)="select(item)">{{item}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>            
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-lg-4"></div>
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">  
                            <button type="submit" class="btn btn-primary btn-block">Search</button>
                        </div>
                    <div class="col-md-4 col-lg-4"></div>
                </div>
            </form>
        </div>
        <div class="col-md-3 col-lg-3"></div>
    </div>
    `,
    styles: ['.suggestions{	border:solid 1px #f1f1f1; background: white; }',
    '.suggestions ul{	padding: 0px;	margin: 0px;}',
    '.suggestions ul li{	list-style: none;	padding: 0px;	margin: 0px;}',
    '.suggestions ul li a{	padding:5px;	display: block;	text-decoration: none;	color:#7E7E7E;}',
    '.suggestions ul li a:hover{	background-color: #f1f1f1;}'],
})

export class SearchFormComponent{ 
    constructor(private searchService: SearchService
        ){
            this.searchService.getAutocompleteItems().subscribe(
            standards => {
                this.items = standards;
            },
            err => {
                 console.log(err);
            }
        );
        }
  
    @Input() listId: string;

    private searchString:string;

    public filteredList = [];

    public items;

    submitSearch(){
        this.searchService.getStandardsforSearch(this.searchString).subscribe(
            standards => {
                EmitterService.get(this.listId).emit(standards);
            },
            err => {
                 console.log(err);
            }
        );
    }

    filter() {
        if (this.searchString !== ""){
            this.filteredList = this.items.filter( (el:any) => {
                return el.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
            });
        }else{
            this.filteredList = [];
        }
    }
 
    select(item){
        this.searchString = item;
        this.filteredList = [];
    }
 }
