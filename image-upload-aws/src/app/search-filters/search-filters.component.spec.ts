import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchFiltersComponent } from './search-filters.component';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFiltersComponent ],
      imports: [
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit correct form value', () => {
    spyOn( component.search, 'emit' ).and.callThrough();
    const value = {
      fileType: 'type',
      size: 'size',
      description: 'description'
    };
    component.searchForm.patchValue( value );
    component.searchClicked();
    expect( component.search.emit ).toHaveBeenCalledWith( value );
  });
});
