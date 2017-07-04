import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Standard,SDO,Domain,ISA95Level,StandardLicence,StandardParts,RAMIITLayer,RAMIHierarchyLevel,AdminShellSubmodel } from '../model/STO';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {
    private headers: Headers;
    private options: RequestOptions;
    private url = 'http://vocol.iais.fraunhofer.de:/sto/fuseki/myDataset/query'; 
    private queryOptions;

     constructor (private http: Http) {
        
        this.headers = new Headers();


        this.headers.append('Accept-Encoding', 'gzip, deflate'); 
        this.headers.append('Accept', 'application/sparql-results+json,*/*;q=0.9'); 
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 

        this.options = new RequestOptions({ headers: this.headers }); // Create a request option

     }

    getStandardsforSearch(searchString : string): Observable<Standard[]> {

      let body = 'query= PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sto: <https://w3id.org/i40/sto#> '+
      'SELECT DISTINCT ?norm ?status ?pubDate ?publisher '+
      'WHERE { '+
      '?std a sto:Standard . ' +
      '?std sto:norm "' + searchString + '" . ' +
      'OPTIONAL{?std sto:norm ?norm .} ' +
      'OPTIONAL{?std sto:hasStatus ?status .} ' +
      'OPTIONAL{?std sto:hasPublicationDate ?pubDate .} ' +
      'OPTIONAL{?std sto:publisher/sto:abbreviation ?publisher .}  }';
      
      console.log(body);

      return this.http.post(this.url,body, this.options)   
      .map(this.extractDataforSearch)
      .catch(this.handleErrorObservable);       
     } 

    private extractDataforSearch(res: Response):Standard[] {
      let standards : Standard[] = [];
    
      let body = res.json();

      let bindings = body["results"]["bindings"];

      for(let entry of bindings)
      {
       standards.push(Standard.ConvertFromJsonForSearch(entry));
      }

      return standards;
    }

    private handleErrorObservable (error: Response | any) {
        console.log("Error");
	    console.error(error.message || error);
	    return Observable.throw(error.message || error);
    }

}