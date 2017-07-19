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

  describe('Autocomplete', () => {
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
    it('Server Error (empty body) for autocomplete', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });

      subject.getAutocompleteItems().toPromise()
        .then((result: any) => {
          expect(result.length).toBe(0);
          setTimeout(() => {
            done();
          }, 500);
        });
    });

    it('should get empty list for items without value for autocomplete from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            { norm: { type: "literal", value: '' } },
            { norm: { type: "literal", value: '' } },
            { norm: { type: "literal", value: '' } },
            { norm: { type: "literal", value: '' } },
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getAutocompleteItems().toPromise().then((result) => {
        expect(result.length).toBe(0);
        setTimeout(() => {
          done();
        }, 500);
      });
    });

  });

  describe('getStandardForDetails', () => {
    it('should get list of items for search from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              std: { type: "uri", value: 'xx' },
              norm: { type: "literal", value: '15131' },
              publisher: { type: "literal", value: 'IEC' },
              hasStatus: { type: "literal", value: 'Active' },
              hasPublicationDate: { type: "literal", value: '1918-05-14' }
            },
            {
              std: { type: "uri", value: 'yy' },
              norm: { type: "literal", value: '16464' },
              publisher: { type: "literal", value: 'ISO' },
              hasStatus: { type: "literal", value: 'Active' },
              hasPublicationDate: { type: "literal", value: '1918-05-14' }
            },
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getStandardsforSearch("I").toPromise().then((result) => {
        result as Standard[];
        expect(result.length).toBe(2);
        expect(result[0].publisher[0].abbreviation[0]).toBe("IEC");
        expect(result[0].norm[0]).toBe("15131");
        expect(result[0].hasStatus).toBe("Active");
        expect(result[0].hasPublicationDate.toDateString()).toBe(new Date("1918-05-14").toDateString());
        setTimeout(() => {
          done();
        }, 500);
      });
    });
    it('should get list of items for search with error in hasPublicationDate from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              std: { type: "uri", value: 'xx' },
              norm: { type: "literal", value: '15131' },
              publisher: { type: "literal", value: 'IEC' },
              hasStatus: { type: "literal", value: 'Active' },
              hasPublicationDate: { type: "literal", value: 'lala' }
            },
            {
              std: { type: "uri", value: 'yy' },
              norm: { type: "literal", value: '16464' },
              publisher: { type: "literal", value: 'ISO' },
              hasStatus: { type: "literal", value: 'Active' },
              hasPublicationDate: { type: "literal", value: '1918-05-14' }
            },
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getStandardsforSearch("I").toPromise().then((result) => {
        result as Standard[];
        expect(result.length).toBe(2);
        expect(result[0].publisher[0].abbreviation[0]).toBe("IEC");
        expect(result[1].norm[0]).toBe("16464");
        expect(result[0].hasStatus).toBe("Active");
        expect(result[0].hasPublicationDate.toDateString()).toBe("Invalid Date");
        setTimeout(() => {
          done();
        }, 500);
      });
    });
    it('should get list empty list for search if std is missing or empty from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              std: { type: "uri", value: '' },
              norm: { type: "literal", value: '15131' },
              publisher: { type: "literal", value: 'IEC' },
              hasStatus: { type: "literal", value: 'Active' },
              hasPublicationDate: { type: "literal", value: '1918-05-14' }
            },
            {
              norm: { type: "literal", value: '16464' },
              publisher: { type: "literal", value: 'ISO' },
              hasStatus: { type: "literal", value: 'Active' },
              hasPublicationDate: { type: "literal", value: '1918-05-14' }
            },
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getStandardsforSearch("I").toPromise().then((result) => {
        result as Standard[];
        expect(result.length).toBe(0);
        setTimeout(() => {
          done();
        }, 500);
      });
    });
    it('Server Error (empty body) for search', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });

      subject.getStandardsforSearch("I").toPromise()
        .then((result: any) => {
          expect(result.length).toBe(0);
          setTimeout(() => {
            done();
          }, 500);
        });
    });
  });
});