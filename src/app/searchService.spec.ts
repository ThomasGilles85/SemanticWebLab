/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchService } from './services/SearchService';
import 'rxjs/add/operator/toPromise';
import { Http, HttpModule , Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {APP_CONFIG,APP_DI_CONFIG,FAKE_DI_CONFIG,AppConfig} from './config'



describe('Integration Service Test: SearchService', () => {
  let subject : SearchService;

 beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [{ provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        SearchService]
      })
    );
  
  beforeEach(inject([SearchService], s => {
    subject = s;
  }));

  it('should get list of items for autocomplete from server', (done) => {
     subject.getAutocompleteItems().toPromise().then( (result) => {         
     expect(result.length).toBeGreaterThan(0);
     done();
    } );       
});

});
