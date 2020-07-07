import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UploadImageComponent } from './upload-image.component';

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;
  let httpMock : HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImageComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const injector : TestBed = getTestBed();
    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
    httpMock = injector.inject( HttpTestingController );
    fixture.detectChanges();
    component.uploadForm.reset();
  });

  it('should upload file successfully when image and description is provided', () => {
    function flush() : void {
      httpMock.expectOne( ( req ) => {
        return req.method === 'POST' && req.url === '/api/image/upload'
      } )
        .flush( '', {
          status: 200,
          statusText: 'OK',
        } );
    }
    component.uploadForm.patchValue( {
      description: 'Test description',
      image: new Blob(),
    } );
    component.upload();
    flush();
    expect( component.successMsg ).toBeDefined();
    expect( component.error ).toBeUndefined();
  });

  it('should fail when description is not provided', () => {
    function flush() : void {
      httpMock.expectOne( ( req ) => {
        return req.method === 'POST' && req.url === '/api/image/upload'
      } )
        .flush( { err: 'Description required' }, {
          status: 400,
          statusText: 'OK',
        } );
    }
    component.uploadForm.patchValue( {
      image: new Blob()
    } );
    component.upload();
    flush();
    expect( component.successMsg ).toBeUndefined();
    expect( component.error ).toBeDefined();
  });
});
