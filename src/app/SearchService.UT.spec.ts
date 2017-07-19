import { Standard } from './model/STO'
import { SearchService } from './services/SearchService';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { APP_CONFIG, APP_DI_CONFIG, FAKE_DI_CONFIG, AppConfig } from './config'

class MockError extends Response implements Error {
  name: any
  message: any
}


describe('Integration Service Test: SearchService', () => {
  let subject: SearchService;
  let mockBackend: MockBackend;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule],
    providers:
    [
      { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
      { provide: XHRBackend, useClass: MockBackend },
      SearchService
    ]
  })
  );

  beforeEach(inject([SearchService, XHRBackend], (service, backend) => {
    subject = service;
    mockBackend = backend;
  }));

  it('should get list of items for autocomplete from server', (done) => {

    const mockResponse = {
      results: {
        bindings: [
          { norm: { type: "literal", value: 'Video 0' } },
          { norm: { type: "literal", value: 'Video 0' } },
          { norm: { type: "literal", value: 'Video 0' } },
          { norm: { type: "literal", value: 'Video 0' } },
        ]
      }
    };

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    subject.getAutocompleteItems().toPromise().then((result) => {
      expect(result.length).toBe(4);
      setTimeout(() => {
        done();
      }, 500);
    });
  });

  it('should get null for autocomplete', (done) => {

    mockBackend.connections.subscribe((connection) => {
      connection.mockError(new Response(new ResponseOptions({
        status: 404, //here
        statusText: 'URL not Found',
        body: "<html><head></head><body></body></html>"
      })));
    });

    subject.getAutocompleteItems().toPromise()
      .then((result: any) => { expect(result).toBeUndefined(); })
      .catch((error: any) => {
        expect(error).toBeDefined();
        setTimeout(() => {
          done();
        }, 500);
      });
  });
});