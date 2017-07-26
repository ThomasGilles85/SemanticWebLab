import { Component, OnChanges, EventEmitter, AfterViewInit, Input, ElementRef, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import * as D3 from 'd3';
import { collapsedContent } from "../../Shared/collapsedContent";
import { Router, ActivatedRoute, Params } from '@angular/router';
import{SearchService} from '../../services/SearchService';
import 'rxjs/add/operator/toPromise';




function dragstarted(d) {
    if (!D3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = D3.event.x;
    d.fy = D3.event.y;
}

var colors = D3.scaleOrdinal(D3.schemeCategory10);

function ticked() {
    link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    node
        .attr("transform", function (d) { return "translate(" + d.x + ", " + d.y + ")"; });

    edgepaths.attr('d', function (d) {
        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
    });

    edgelabels.attr('transform', function (d) {
        if (d.target.x < d.source.x) {
            var bbox = this.getBBox();

            var rx = bbox.x + bbox.width / 2;
            var ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
        }
        else {
            return 'rotate(0)';
        }
    });
}

var simulation, node, link;
var edgepaths, edgelabels;





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
    private dataObject;
    public selectedElement;
    public selected;

    @ViewChild('container') element: ElementRef;
    @Input() currentStandard: string;

    private host;
    private svg;
    private margin;
    private width;
    private height;
    private htmlElement: HTMLElement;







    constructor(private router: Router,private searchService: SearchService) {
        super();
    }

    ngAfterViewInit() {
        this.htmlElement = this.element.nativeElement;
        this.host = D3.select(this.htmlElement);
    }

    ngOnChanges(): void {
        if(this.currentStandard !=="No data")
        {

        this.constructData();
        }
    }

    private constructData()
    {

        console.log(this.currentStandard);
        this.searchService.getChilds(this.currentStandard).subscribe(
            async(standard:any[]) => {
                let item:any = {};
                item.name =  this.currentStandard.split(":")[1];
                item.label = this.currentStandard.split(":")[1];
                item.id = this.currentStandard;


                

                this.dataObject = {};

                this.dataObject.nodes = standard;
                this.dataObject.links = [];

                for(let entry of standard)
                {
                    let links = await this.searchService.getPath(item.id,entry["id"]);
                    this.addLink(links);
                    await this.delay(700);                    
                    
                }                

                this.dataObject.nodes.push(item);

                this.data = this.dataObject;

                this.setup();
                this.buildSVG();

            },
            err => {
                 console.log(err);
            }
        );
    }

    private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

    private addLink(links:any[])
    {
        for(let entry of links)
        {
          var found = false;
          for(var i = 0; i < this.dataObject.links.length; i++) {
            if (this.dataObject.links[i].source === entry.source && this.dataObject.links[i].type === entry.type && this.dataObject.links[i].target === entry.target) {
              found = true;
              break;
            }
          }

          if(found == false)
          {
            var link:any = {};
            link.source = entry.source;
            link.target = entry.target;
            link.type = entry.type;
            this.dataObject.links.push(link)
          }
        }



    }

    private setup(): void {

        this.margin = { top: 20, right: 90, bottom: 30, left: 90 };
        if (window.screen.width < 1000) this.width = 1500 - this.margin.left - this.margin.right;
        else this.width = window.screen.width - this.margin.left - this.margin.right - 100;
        this.height = 600 - this.margin.top - this.margin.bottom;
    }

    private buildSVG(): void {


        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom);


        this.svg.append('defs').append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 13)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 13)
            .attr('markerHeight', 13)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#999')
            .style('stroke', 'none');

        simulation = D3.forceSimulation()
            .force("link", D3.forceLink().id(function (d: any) { return d.id; }).distance(300).strength(1))
            .force("charge", D3.forceManyBody().strength(-10))
            .force("center", D3.forceCenter(window.screen.width / 2, this.height / 2));
            


        this.update(this.data)
    }

    private update(source) {

        link = this.svg.selectAll(".link")
            .data(source.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end', 'url(#arrowhead)')

        link.append("title")
            .text(function (d) { return d.type; });

        edgepaths = this.svg.selectAll(".edgepath")
            .data(source.links)
            .enter()
            .append('path')
            .attr('class', 'edgepath')
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', function (d, i) { return 'edgepath' + i }
            )
            .style("pointer-events", "none");

        edgelabels = this.svg.selectAll(".edgelabel")
            .data(source.links)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attr('class', 'edgelabel')
            .attr('id', function (d, i) { return 'edgelabel' + i })
            .attr('font-size', 10)
            .attr('fill', '#aaa');

        edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) { return '#edgepath' + i })
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) { return d.type });

        node = this.svg.selectAll(".node")
            .data(source.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(D3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
            );

        node.append("circle")
            .attr("r", 5)
            .style("fill", function (d, i) { return colors(i); })

        node.append("title")
            .text(function (d) { return d.id; });

        node.append("text")
            .attr("dy", -3)
            .text(function (d) { return d.label; });

        simulation
            .nodes(source.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(source.links);

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
        }
    }

    private MockData() {
        this.data = {
            "nodes": [
                {
                    "name": "IEC_62714",
                    "label": "IEC_62714",
                    "id": "IEC_62714"
                },
                {
                    "name": "eClass",
                    "label": "eClass",
                    "id": "eClass"
                },
                {
                    "name": "IEC_61360",
                    "label": "IEC_61360",
                    "id": "IEC_61360"
                },
                {
                    "name": "ISO_13584",
                    "label": "ISO_13584",
                    "id": "ISO_13584"
                },
                {
                    "name": "IEC_61987_X",
                    "label": "IEC_61987_X",
                    "id": "IEC_61987_X"
                },
                {
                    "name": "IEC_62541",
                    "label": "IEC_62541",
                    "id": "IEC_62541"
                },
                {
                    "name": "IEC_61499",
                    "label": "IEC_61499",
                    "id": "IEC_61499"
                },
                {
                    "name": "IEC_61131",
                    "label": "IEC_61131",
                    "id": "IEC_61131"
                },
                {
                    "name": "IEC_20922",
                    "label": "IEC_20922",
                    "id": "IEC_20922"
                },
                {
                    "name": "IEC_62424",
                    "label": "IEC_62424",
                    "id": "IEC_62424"
                }
            ],
            "links": [
                {
                    "source": "IEC_62714",
                    "target": "ISO_13584",
                    "type": "relatedTo",
                },
                {
                    "source": "IEC_62714",
                    "target": "IEC_62424",
                    "type": "relatedTo"
                },
                {
                    "source": "IEC_62714",
                    "target": "IEC_62541",
                    "type": "relatedTo"
                },
                {
                    "source": "IEC_62714",
                    "target": "IEC_61987_X",
                    "type": "relatedTo"
                },
                {
                    "source": "ISO_13584",
                    "target": "IEC_61360",
                    "type": "relatedTo",
                },
                {
                    "source": "IEC_62541",
                    "target": "IEC_20922",
                    "type": "relatedTo"
                },
                {
                    "source": "IEC_62541",
                    "target": "IEC_61499",
                    "type": "relatedTo"
                },
                {
                    "source": "IEC_61499",
                    "target": "IEC_61131",
                    "type": "relatedTo"
                },
                {
                    "source": "ISO_13584",
                    "target": "eClass",
                    "type": "relatedTo"
                },
                {
                    "source": "IEC_61360",
                    "target": "eClass",
                    "type": "relatedTo"
                }
            ]
        };
    }


}