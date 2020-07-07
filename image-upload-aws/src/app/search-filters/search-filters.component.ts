import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  public searchForm: FormGroup = new FormGroup({
    fileType: new FormControl( '' ),
    size: new FormControl( '' ),
    description: new FormControl( '' ),
  });

  constructor() { }

  ngOnInit(): void {
  }

  searchClicked() {
    const { fileType, size, description } = this.searchForm.value;
    const filter = {};
    if ( fileType || size || description ) {
      Object.keys( this.searchForm.value ).forEach( key => {
        if ( this.searchForm.value[key] ) {
          filter[ key ] = this.searchForm.value[key];
        }
      } )
    }
    this.search.emit( filter );
  }

}
