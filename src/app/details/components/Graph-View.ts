import { Component, OnChanges, EventEmitter, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import * as D3 from 'd3';
import { collapsedContent } from "../../Shared/collapsedContent";
import { Router, ActivatedRoute, Params } from '@angular/router';


function collapse(d) {
    if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
    }
}

function connector(d) {
    return "M" + d.y + "," + d.x +
        "C" + (d.y + d.parent.y) / 2 + "," + d.x +
        " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
        " " + d.parent.y + "," + d.parent.x;
}

function pointsTranslate(d) { return "translate(" + d.y + "," + d.x + ")"; }

function linkPoints(d) {
    var o = { x: d.x, y: d.y, parent: { x: d.parent.x0, y: d.parent.y0 } };
    return connector(o);
}

function pointsExit(d) {
    var o = { x: d.x, y: d.y, parent: { x: d.x, y: d.y } };
    return connector(o);
}



var i;



@Component({
    selector: 'graph-view',
    template: `
    <div class="panel panel-primary">
            <div class="panel-heading">
                <h4 class="panel-title">
                    Inference Graph
                </h4>
            </div>  
        <div class="panel-body">
            <a *ngIf="selected" href="details/{{selectedElement}}" class="btn btn-default">Go to Norm {{selectedElement}}</a>
            <div style="overflow: auto;" #container (click)="Click($event.target)"></div>
    </div>
    </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./graph-view.css']
})

export class GraphViewComponent extends collapsedContent implements OnChanges, AfterViewInit {

    private data;
    public selectedElement;
    public selected;

    @ViewChild('container') element: ElementRef;
    @Input() currentStandard: string;

    private host;
    private svg;
    private margin;
    private width;
    private height;
    private xAxis;
    private yAxis;
    private htmlElement: HTMLElement;
    private treemap;
    private root;
    private duration;
    private i;


    constructor( private router: Router) {
        super();
    }

    ngAfterViewInit() {
        this.htmlElement = this.element.nativeElement;
        this.host = D3.select(this.htmlElement);
        this.MockData();
        this.setup();
        this.buildSVG();
    }

    ngOnChanges(): void {
        if (!this.data || !this.host) return;
        this.setup();
        this.buildSVG();
    }

    private setup(): void {

            this.margin = { top: 20, right: 90, bottom: 30, left: 90 },
            this.width = 960 - this.margin.left - this.margin.right,
            this.height = 300 - this.margin.top - this.margin.bottom;


        this.duration = 750;
        i = 0;
    }

    private buildSVG(): void {

        
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');


    this.treemap = D3.tree().size([this.height, this.width]);



        // Collapse after the second level
        var stratify = D3.stratify()
            .id(function (d: any) {
                return d.name;//This position
            })
            .parentId(function (d: any) {
                return d.parent; //What position this position reports to
            });

        this.root = stratify(this.data);

        this.root.each(d => {
            d.name = d.id; //transferring name to a name variable
            // d.id = i; //Assigning numerical Ids
            // i++;
        });

            this.root.x0 = this.height / 2;
            this.root.y0 = 0;


        this.root.children.forEach(collapse);

        this.update(this.root)
    }

    public children(d) {
        return d.Children
    }

    private update(source) {

        var nodes = this.treemap(this.root).descendants(),
            links = nodes.slice(1);

        nodes.forEach(function (d) { d.y = d.depth * 180; });

        var node = this.svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++this.i); });

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", pointsTranslate)

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeEnter.append("text")
            .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6);

        var nodeUpdate = node.merge(nodeEnter).transition()
            .duration(this.duration)
            .attr("transform", pointsTranslate);

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        var nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", pointsTranslate)
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        var link = this.svg.selectAll("path.link")
            .data(links);

        link.transition()
            .duration(this.duration)
            .attr("d", connector);

        var linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", linkPoints);

        link.merge(linkEnter).transition()
            .duration(this.duration)
            .attr("d", connector);

        link.exit().transition()
            .duration(this.duration)
            .attr("d", pointsExit)
            .remove();

        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    public Click(d) {
        if (d.localName === "circle") {
            var node = d.parentNode.__data__;
            if (String(node.id) !== this.currentStandard) {
                this.selectedElement = node.id;
                this.selected = true;
            }
            else {
                this.selected = false;
            }

            if (node.children) {

                // if (window.screen.width < 500) {
                    node._children = node.children;
                    node.children = null;

                // }
            }
            else {
                node.children = node._children;
                node._children = null;
            }
            this.update(node);
        }
    }

    private MockData() {
        this.data = [{
            "name": "Hazer 5000",
            "parent": "62714",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/stephen.jpg"
        }, {
            "name": "Employee 1",
            "parent": "Hazer 5000",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/cory.jpg"
        }, {
            "name": "Analytics Area",
            "parent": "Hazer 5000",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/matt.jpg"
        }, {
            "name": "Employee 2",
            "parent": "Hazer 5000",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/XinheZhang.jpg"
        }, {
            "name": "Employee 3",
            "parent": "Hazer 5000",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/craig.jpg"
        }, {
            "name": "Employee 4",
            "parent": "Hazer 5000",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/youri.jpg"
        }, {
            "name": "Intern 1",
            "parent": "Analytics Area",
            "img": ""
        }, {
            "name": "Inter 2",
            "parent": "Analytics Area",
            "img": ""
        }, {
            "name": "62714",
            "parent": null,
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/Brett.jpg"
        }, {
            "name": "CPA",
            "parent": "62714",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/Wes.jpg"
        }, {
            "name": "Matt's wife",
            "parent": "CPA",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/Amy_R.jpg"
        }, {
            "name": "Employee 5",
            "parent": "CPA",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/DavidBriley.jpg"
        }, {
            "name": "Employee 6",
            "parent": "CPA",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/BrittanyAllred_.jpg"
        }, {
            "name": "Employee 7",
            "parent": "CPA",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/Shea.jpg"
        }, {
            "name": "Employee 8",
            "parent": "Matt's wife",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/Mindy.jpg"
        }, {
            "name": "Employee 9",
            "parent": "Matt's wife",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/Jessica_Stacy.jpg"
        }, {
            "name": "Employee 10",
            "parent": "Matt's wife",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/FraleaneHudson.jpg"
        }, {
            "name": "Employee 11",
            "parent": "Employee 9",
            "img": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-342/MeganPierce_.jpg"
        }, {
            "name": "Intern 3",
            "parent": "Employee 8",
            "img": ""
        }, {
            "name": "Intern 4",
            "parent": "Employee 8",
            "img": ""
        }

        ];
    }


}