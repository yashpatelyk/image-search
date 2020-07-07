import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let httpMock : HttpTestingController;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule,
      ]
    }).compileComponents();
  }));

  function flush() : void {
    httpMock.expectOne( ( req ) => {
      return req.method === 'GET' && req.url === '/api/image/search'
    } )
      .flush( { hits: { hits: [ 1,2,3,4 ] } }, {
        status: 200,
        statusText: 'OK',
      } );
  }

  beforeEach(() => {
    const injector : TestBed = getTestBed();
    httpMock = injector.inject( HttpTestingController );
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.ngOnInit();
    flush();
  })

  it('should fetch images when component get loaded', () => {
    expect(app.results).toBeDefined();
    expect(app.results.hits.length).toBe(4);
  });

  it('should fetch next page when user scrolls', () => {
    app.fetchNextPage();
    flush();
    expect(app.results.hits.length).toBe(8);
  });

});
