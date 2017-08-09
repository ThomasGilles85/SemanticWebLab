import { Standard } from './model/STO'
import { SearchService } from './services/SearchService';
import { JsonUtilityService } from './services/JsonService';
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
      SearchService,
      JsonUtilityService
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

    it('should get undefined for http error for autocomplete', (done) => {

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

  describe('getStandardsForSearch', () => {
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
    it('should get undefined for http error for search', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Response(new ResponseOptions({
          status: 404,
          statusText: 'URL not Found',
          body: "<html><head></head><body></body></html>"
        })));
      });

      subject.getStandardsforSearch("I").toPromise()
        .then((result: any) => { expect(result).toBeUndefined(); })
        .catch((error: any) => {
          expect(error).toBeDefined();
          setTimeout(() => {
            done();
          }, 500);
        });
    });
  });
  describe('getStandardForDetails', () => {
    it('should get one standard for details from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              pubabbreviation: { type: "uri", value: 'Pub1Abbreviation#Pub2Abbreviation1|Pub2Abbreviation2' },
              pubformationDate: { type: "literal", value: '1918-05-14|1918-05-14' },
              puborgName: { type: "literal", value: 'Pub1OrgName#Pub2OrgName1|PubOrgName2' },
              devabbreviation: { type: "literal", value: 'Dev1Abbreviation#Dev2Abbreviation1|Dev2Abbreviation2' },
              devformationDate: { type: "literal", value: '1918-05-14|1918-05-14' },
              devorgName: { type: "uri", value: 'Dev1OrgName#Dev2OrgName1|DevOrgName2' },
              hasPublicationDate: { type: "literal", value: '1918-05-14' },
              hasStatus: { type: "literal", value: 'Active' },
              norm: { type: "literal", value: 'Norm1|Norm2' },
              licenceTerms: { type: "literal", value: 'Private' },
              usageType: { type: "literal", value: 'Private' },
              domainName: { type: "literal", value: 'DomainName' },
              stoPartNames: { type: "literal", value: 'Pub1Abbreviation|Pub2Abbreviation1#Pub2Abbreviation2' },
              description: { type: "literal", value: 'Description' }
            }
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getStandardsforDetails("UT").toPromise().then((result) => {
        result as Standard;
        expect(result.publisher[1].abbreviation.length).toBe(2);
        expect(result.norm[0]).toBe("Norm1");
        expect(result.hasStatus).toBe("Active");
        setTimeout(() => {
          done();
        }, 500);
      });
    });

    it('should item for details with error in hasPublicationDate from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              pubabbreviation: { type: "uri", value: 'Pub1Abbreviation#Pub2Abbreviation1|Pub2Abbreviation2' },
              pubformationDate: { type: "literal", value: '1918-05-14|1918-05-14' },
              puborgName: { type: "literal", value: 'Pub1OrgName#Pub2OrgName1|PubOrgName2' },
              devabbreviation: { type: "literal", value: 'Dev1Abbreviation#Dev2Abbreviation1|Dev2Abbreviation2' },
              devformationDate: { type: "literal", value: 'lala|1918-05-14' },
              devorgName: { type: "uri", value: 'Dev1OrgName#Dev2OrgName1|DevOrgName2' },
              hasPublicationDate: { type: "literal", value: 'lala' },
              hasStatus: { type: "literal", value: 'Active' },
              norm: { type: "literal", value: 'Norm1|Norm2' },
              licenceTerms: { type: "literal", value: 'Private' },
              usageType: { type: "literal", value: 'Private' },
              domainName: { type: "literal", value: 'DomainName' },
              stoPartNames: { type: "literal", value: 'Pub1Abbreviation|Pub2Abbreviation1#Pub2Abbreviation2' },
              description: { type: "literal", value: 'Description' }
            }
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getStandardsforDetails("I").toPromise().then((result) => {
        result as Standard;
        expect(result.hasPublicationDate.toDateString()).toBe("Invalid Date");
        expect(result.developer[0].formationDate.toDateString()).toBe(new Date().toDateString());
        setTimeout(() => {
          done();
        }, 500);
      });
    });

    it('Server Error (empty body) for details', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });

      subject.getStandardsforDetails("I").toPromise()
        .then((result: any) => {
          expect(result).toBe(undefined);
          setTimeout(() => {
            done();
          }, 500);
        });
    });

    it('should get undefined for http error for details', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Response(new ResponseOptions({
          status: 404,
          statusText: 'URL not Found',
          body: "<html><head></head><body></body></html>"
        })));
      });

      subject.getStandardsforDetails("I").toPromise()
        .then((result: any) => { expect(result).toBeUndefined(); })
        .catch((error: any) => {
          expect(error).toBeDefined();
          setTimeout(() => {
            done();
          }, 500);
        });
    });
  });

  describe('getChilds', () => {
    it('should get empty list from server for object with nodata', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              x: { type: "uri", value: '' },
              norm: { type: "literal", value: '' },
              publisher: { type: "literal", value: '' },
            },
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getChilds("UT").toPromise().then((result: any[]) => {
        expect(result.length).toBe(0);
        setTimeout(() => {
          done();
        }, 500);
      });
    });

    it('should get one child from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              x: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61360' },
              norm: { type: "literal", value: '61360' },
              publisher: { type: "literal", value: 'IEC' },
            }
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getChilds("UT").toPromise().then((result) => {
        expect(result[0].name).toBe("IEC_61360");
        expect(result[0].label).toBe("IEC_61360");
        expect(result[0].id).toBe("sto:IEC_61360");
        setTimeout(() => {
          done();
        }, 500);
      });
    });

    it('Server Error (empty body) for getChild', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });

      subject.getChilds("I").toPromise()
        .then((result: any) => {
          expect(result.length).toBe(0);
          setTimeout(() => {
            done();
          }, 500);
        });
    });

    it('should get undefined for http error for getChild', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Response(new ResponseOptions({
          status: 404,
          statusText: 'URL not Found',
          body: "<html><head></head><body></body></html>"
        })));
      });

      subject.getChilds("I").toPromise()
        .then((result: any) => { expect(result).toBeUndefined(); })
        .catch((error: any) => {
          expect(error).toBeDefined();
          setTimeout(() => {
            done();
          }, 500);
        });
    });

  });

  describe('getPath', () => {
    it('should get one path from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              start: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61460' },
              relation: { type: "value", value: 'https://w3id.org/i40/sto#relatedTo' },
              end: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61360' },
            }
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getPath("Start", "Child").then((result) => {
        expect(result[0].source).toBe("sto:IEC_61460");
        expect(result[0].type).toBe("relatedTo");
        expect(result[0].target).toBe("sto:IEC_61360");
        setTimeout(() => {
          done();
        }, 500);
      });
    });

    it('should get one path without doublicate from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              start: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61460' },
              relation: { type: "value", value: 'https://w3id.org/i40/sto#relatedTo' },
              end: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61360' },
            },
            {
              start: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61460' },
              relation: { type: "value", value: 'https://w3id.org/i40/sto#relatedTo' },
              end: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61360' },
            }
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getPath("Start", "Child").then((result) => {
        expect(result.length).toBe(1);
        setTimeout(() => {
          done();
        }, 500);
      });
    });

    it('should get one path without return path from server', (done) => {

      const mockResponse = {
        results: {
          bindings: [
            {
              start: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61460' },
              relation: { type: "value", value: 'https://w3id.org/i40/sto#relatedTo' },
              end: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61360' },
            },
            {
              start: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61360' },
              relation: { type: "value", value: 'https://w3id.org/i40/sto#relatedTo' },
              end: { type: "uri", value: 'https://w3id.org/i40/sto#IEC_61460' },
            }
          ]
        }
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      subject.getPath("Start", "Child").then((result) => {
        expect(result.length).toBe(1);
        setTimeout(() => {
          done();
        }, 500);
      });
    });

    it('Server Error (empty body) for getPath', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });

      subject.getPath("I","O")
        .then((result: any) => {
          expect(result.length).toBe(0);
          setTimeout(() => {
            done();
          }, 500);
        });
    });

    it('should get undefined for http error for getPath', (done) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Response(new ResponseOptions({
          status: 404,
          statusText: 'URL not Found',
          body: "<html><head></head><body></body></html>"
        })));
      });

      subject.getPath("I","O")
        .then((result: any) => { expect(result).toBeUndefined(); })
        .catch((error: any) => {
          expect(error).toBeDefined();
          setTimeout(() => {
            done();
          }, 500);
        });
    });

  });



});