import { Injectable , Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Standard,SDO,Domain,ISA95Level,StandardLicence,StandardParts,RAMIITLayer,RAMIHierarchyLevel,AdminShellSubmodel } from '../model/STO';
import {Observable} from 'rxjs/Rx';
import {APP_CONFIG,AppConfig} from '../config';
import {JsonUtilityService} from './JsonService';;

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SearchService {
    private headers: Headers;
    private options: RequestOptions;
    private url; 
    private queryOptions;

     constructor (private http: Http,@Inject(APP_CONFIG) config: AppConfig) {
        this.headers = new Headers();

        this.url = config.url;
        //console.log( this.url);
        this.headers.append('Accept-Encoding', 'gzip, deflate'); 
        this.headers.append('Accept', 'application/sparql-results+json,*/*;q=0.9'); 
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 

        this.options = new RequestOptions({ headers: this.headers }); // Create a request option
		

     }
    /* getStandardsforSearch is to search about the details of standards using different properties like norm,publisher ,developer,description,orgName */
    getStandardsforSearch(searchString : string): Observable<Standard[]> {

      let body = 'query= PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sto: <https://w3id.org/i40/sto#> PREFIX dc:<http://purl.org/dc/terms/> '+
      'SELECT DISTINCT ?std ?norm ?publisher ?hasStatus ?hasPublicationDate '+
      'WHERE { {'+
      'SELECT DISTINCT ?std ' +
      'WHERE{ ' +
      '?std a sto:Standard . ' +
      '{ ?std sto:norm "' + searchString + '" . } ' +
      'UNION { ?std sto:publisher/sto:abbreviation "' + searchString + '" . } ' +
      'UNION { ?std sto:developer/sto:abbreviation "' + searchString + '" . } ' +
      'UNION { ?std sto:hasTag ?tag FILTER regex(str(?tag), "' + searchString + '") . } ' +
      // 'UNION { ?std dc:description ?description FILTER regex(str(?description), "' + searchString + '") . } ' +
      'UNION { ?std sto:orgName ?orgName FILTER regex(str(?orgName), "' + searchString + '") . } } } ' +
      '{SELECT DISTINCT ?std (group_concat(?normText;separator="|") as ?norm) WHERE{ ?std sto:norm ?normText .}group by ?std}'+
      'OPTIONAL { { ' +
      'SELECT DISTINCT ?std (group_concat(?publisherCon;separator="#") as ?publisher) '+
      'WHERE {{ ' + 
      'SELECT DISTINCT ?std (group_concat(?publisherText;separator="|") as ?publisherCon) ' +
      'WHERE{ ?std sto:publisher ?pubNode . ?pubNode sto:abbreviation ?publisherText .}group by ?std ?pubNode } }group by ?std ' +
      ' } } ' +
      'OPTIONAL{?std sto:hasStatus ?hasStatus .} ' +
      'OPTIONAL{?std sto:hasPublicationDate ?hasPublicationDate .} }';
      
      // console.log(body);

      return this.http.post(this.url,body, this.options)
      .map(this.extractDataforSearch)
      .catch(this.handleErrorObservable);       
     } 

     getStandardsforDetails(standard:string): Observable<Standard> {

      let body =  'query= PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> '+
                  'PREFIX sto: <https://w3id.org/i40/sto#> '+
                  'PREFIX rami: <https://w3id.org/i40/rami#>  '+
                  'PREFIX skos: <http://www.w3.org/2004/02/skos/core#> '+
                  'PREFIX dc:      <http://purl.org/dc/terms/> '+
                  'SELECT DISTINCT ?pubabbreviation ?pubformationDate ?puborgName ?devabbreviation ?devformationDate ?devorgName ?hasPublicationDate ?hasStatus ?norm ?licenceTerms ?usageType ?domainName?stoPartNames ?description ' +
                  'WHERE { '+
                  'OPTIONAL{' + standard + ' sto:hasStatus ?hasStatus .} '+
                  'OPTIONAL{' + standard + ' sto:hasPublicationDate ?hasPublicationDate .}  '+
                  'OPTIONAL{' + standard + ' dc:description ?description . FILTER (LANG(?description) = "en").}   '+
                  'OPTIONAL{ '+
                  '' + standard + ' sto:licence/sto:licenceTerms ?licenceTerms . '+
                  '' + standard + ' sto:licence/sto:usageType ?usageType  . '+
                  '} '+  
                  'OPTIONAL{' + standard + ' sto:scope/sto:domainName ?domainName . }  '+
                  '{SELECT DISTINCT (group_concat(?normText;separator="|") as ?norm) WHERE{ ' + standard + ' sto:norm ?normText .}} '+
                  'OPTIONAL{{ '+
    					    'SELECT DISTINCT (group_concat(?publisherabbreviation;separator="#") as ?pubabbreviation) '+
    					    'WHERE {{ '+
    						  'SELECT DISTINCT (group_concat(?abbreviation;separator="|") as ?publisherabbreviation) '+
    						  'WHERE{ ' + standard + ' sto:publisher ?pubNode . ?pubNode sto:abbreviation ?abbreviation . }group by ?pubNode } } '+
    			        '}} '+
                  'OPTIONAL{{ '+
    					    'SELECT DISTINCT (group_concat(?publisherorgName;separator="#") as ?puborgName) '+
    					    'WHERE {{ '+
    						  'SELECT DISTINCT (group_concat(?orgName;separator="|") as ?publisherorgName) '+
    						  'WHERE{ ' + standard + ' sto:publisher ?pubNode . ?pubNode sto:orgName ?orgName . }group by ?pubNode } } '+
    			        '}} '+
                  'OPTIONAL{{ '+
    						  'SELECT DISTINCT (group_concat(?formationDate;separator="|") as ?pubformationDate) '+
    					    'WHERE{ ' + standard + ' sto:publisher ?pubNode . ?pubNode sto:formationDate ?formationDate .}group by ?pubNode } '+
    			        '} '+
                  'OPTIONAL{{ '+
    					    'SELECT DISTINCT (group_concat(?developerabbreviation;separator="#") as ?devabbreviation) '+
    				      'WHERE {{ '+
    						  'SELECT DISTINCT (group_concat(?abbreviation;separator="|") as ?developerabbreviation) '+
    						  'WHERE{ ' + standard + ' sto:developer ?devNode . ?devNode sto:abbreviation ?abbreviation . }group by ?devNode } } '+
    			        '}} '+
                  'OPTIONAL{{ '+
    					    'SELECT DISTINCT (group_concat(?developerorgName;separator="#") as ?devorgName) '+
    					    'WHERE {{ '+
    						  'SELECT DISTINCT (group_concat(?orgName;separator="|") as ?developerorgName) '+
    						  'WHERE{ ' + standard + ' sto:developer ?devNode . ?devNode sto:orgName ?orgName . }group by ?devNode } } '+
    			        '}} '+
                  'OPTIONAL{{ '+
    						  'SELECT DISTINCT (group_concat(?developerformationDate;separator="|") as ?devformationDate) '+
    						  'WHERE{ ' + standard + ' sto:developer ?devNode . ?devNode sto:formationDate ?developerformationDate .}group by ?devNode } '+
    			        '} '+
                  'OPTIONAL{{ ' +
    					    'SELECT DISTINCT (group_concat(?stoPartName;separator="#") as ?stoPartNames) '+
    					    'WHERE {{ '+
    						  'SELECT DISTINCT (group_concat(?PartName;separator="|") as ?stoPartName) '+
    						  'WHERE{ ' + standard + ' sto:isPartOf ?partNode . ?partNode sto:stoPartName ?PartName .}group by ?partNode } } '+
    			        '}} '+
                  '}';                   
      // console.log(body);

      return this.http.post(this.url,body, this.options)   
      .map(this.extractDataforDetails)
      .catch(this.handleErrorObservable);       
     } 


     getChilds(start:string):Observable<{}> {

      let body =  'query= PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> '+
                  'PREFIX sto: <https://w3id.org/i40/sto#> '+
                  'SELECT DISTINCT ?x (group_concat(?norms;separator="|") as ?norm) (group_concat(?publishers;separator="|") as ?publisher) '+
                  'WHERE { '+
                  start + ' sto:relatedTo* ?x .' +
                  '?x sto:norm ?norms . ' +
                  '?x sto:publisher/sto:abbreviation ?publishers . ' +
                  'FILTER(' + start + ' != ?x).'+
                  '} '+
                  'group by ?x';
                        
      // console.log(body);

      return this.http.post(this.url,body, this.options)   
      .map(this.extractDataforGraphNodes)
      .catch(this.handleErrorObservable);       
     } 

      async getPath(start:string,end:string){

      let body =  'query= PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> '+
                  'PREFIX sto: <https://w3id.org/i40/sto#> '+
                  'select distinct ?start ?relation ?end where { '+
                  start + ' (sto:relatedTo)* ?start . '+
                  '?start ?relation ?end . '+
                  '?end (sto:relatedTo)* '+ end + ' . '+
                  '}';
                        
      // console.log(body);

      let response = await this.http.post(this.url,body, this.options).toPromise();

      return this.extractDataforPath(response);
      // return this.http.post(this.url,body, this.options)   
      // .map(this.extractDataforPath)
      // .catch(this.handleErrorObservable);  
     } 

      public getAutocompleteItems(): Observable<any> {

      let body =  'query= PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> '+
                  'PREFIX sto: <https://w3id.org/i40/sto#> '+
                  'SELECT DISTINCT ?norm ' +
                  'WHERE{ ' +
                  '?std a sto:Standard . ' + 
                  '?std sto:norm ?norm . ' +
                  '}';
                        
      // console.log(body);

      return this.http.post(this.url,body, this.options)   
      .catch(this.handleErrorObservable);       
     } 

     private extractDataforAutoComplete(res:Response): any
     {
        let items = [];

        let body = res.json();
      

        if(body["results"] === undefined)return items;


        let bindings = body["results"]["bindings"];

        for(let entry of bindings)
        {
          if(String(entry["norm"]["value"]).replace(" ","") !== "")items.push(entry["norm"]["value"]);
        }
        return items;
     }

	/*
	extractDataforSearch method get response  from sparql queries and return results to standard class as a standard object for further processing
	Response is an Http response type
	ConvertFromJsonForSearch is implemented in standard STO.ts model which splits up the data and extract properties out of it
	*/
    
	private extractDataforSearch(res: Response):Standard[] {
      let standards : Standard[] = [];
    
      let body = res.json();

      if(body["results"] === undefined)return standards;


      let bindings = body["results"]["bindings"];

      for(let entry of bindings)
      {
        let result = JsonUtilityService.parseJsonSerachResponse(entry);
        if(result !== null)standards.push(JsonUtilityService.parseJsonSerachResponse(entry)); 
      }

        return standards;
    }

   
    private extractDataforDetails(res: Response):Standard {
        let standard : Standard;
      
        let body = res.json();

        if(body["results"] === undefined)return standard;


        let bindings = body["results"]["bindings"];

        for(let entry of bindings)
        {
        standard = JsonUtilityService.parseJsonDetailsResponse(entry);
        }

        return standard;
    }

    private extractDataforGraphNodes(res: Response):any[] {
        let standards : any[] = [];
      
        let body = res.json();

        if(body["results"] === undefined)return standards;

        let bindings = body["results"]["bindings"];

        for(let entry of bindings)
        {
          let data = JsonUtilityService.parseJsonFromGraphNodes(entry)
          if(data !== null)standards.push(JsonUtilityService.parseJsonFromGraphNodes(entry));
          else console.log("Error for child node " + entry.id);
        }

        return standards;
    }

    private extractDataforPath(res: Response):any[] {
        let links:any = [];
      
        let body = res.json();

        if(body["results"] === undefined)return links;

        let bindings = body["results"]["bindings"];

        for(let entry of bindings)
        {
          var source = "sto:"+String(entry["start"]["value"]).split('#')[1];
          var type = String(entry["relation"]["value"]).split('#')[1];
          var target = "sto:"+String(entry["end"]["value"]).split('#')[1];

          var found = false;
          for(var i = 0; i < links.length; i++) {
            if (links[i].source === source && links[i].type === type && links[i].target === target) {
              found = true;
              break;
            }
            else if(links[i].source === target && links[i].type === type && links[i].target === source)
            {
              found = true;
              break;
            }
          }

          if(found == false)
          {
            var link:any = {};
            link.source = source;
            link.target = target;
            link.type = type;
            links.push(link)
          }
        }

        return links;
    }

    private handleErrorObservable (error: Response | any) {
        console.log("Error");
        console.error(error.message || error);
        return error;
    }

}