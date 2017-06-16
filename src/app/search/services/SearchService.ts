import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Standard,SDO,Domain,ISA95Level,StandardLicence,StandardParts,RAMIITLayer,RAMIHierarchyLevel,AdminShellSubmodel } from '../model/STO';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}

    private searchUrl = 'http://vocol.iais.fraunhofer.de:/sto/fuseki/myDataset/query'; 
    private body = 'query= PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sto: <https://w3id.org/i40/sto#> SELECT DISTINCT ?norm ?status ?pubDate WHERE { ?std a sto:Standard . ?std sto:norm "62714" . OPTIONAL{?std sto:norm ?norm .} OPTIONAL{?std sto:hasStatus ?status .} OPTIONAL{?std sto:hasPublicationDate ?pubDate .}  }'
    private queryOptions;


    //Fetch all existing comments
    getStandards(): Observable<Standard[]> {
         // ...using get request

        let headers = new Headers();
        headers.append('Accept-Encoding', 'gzip, deflate'); 
        headers.append('Accept', 'application/sparql-results+json,*/*;q=0.9'); 
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 

        let options = new RequestOptions({ headers: headers }); // Create a request option


        return this.http.post(this.searchUrl,this.body, options)   
            .map(this.extractDataforSearch)
            .catch(this.handleErrorObservable);
        
     } 

  private extractDataforSearch(res: Response):Standard[] {
    let standards : Standard[] = [];
    
    let body = res.json();

    console.log(res.status);
    let bindings = body["results"]["bindings"];


    for(let entry of bindings)
    {
       standards.push(Standard.ConvertFromJson(entry));
    }

    console.log(standards);

    return standards;
  }

    private handleErrorObservable (error: Response | any) {
        console.log("Error");
	    console.error(error.message || error);
	    return Observable.throw(error.message || error);
    }


}