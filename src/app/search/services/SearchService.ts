import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Standard } from '../model/STO';
// import { SearchResult } from '../model/SearchResult';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}

    private searchUrl = 'https://scotch-http-api.herokuapp.com/api/comments'; 
     
     // Fetch all existing comments
     getStandards() : Observable<Standard[]>{
         // ...using get request
         return this.http.get(this.searchUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }   
}
