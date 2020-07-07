import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public results;
  private filter;
  pageNumber = 1;
  searching = false;

  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.doSearch();
  }

  search( filter?, pageNumber = 1 ) {
    this.filter = filter;
    return this.httpClient.get( '/api/image/search', {
      params: {
        ...filter,
        pageNumber
      }
    } ).pipe(
      map( (res: any)  => res.hits ),
    );
  }

  doSearch( filter? ) {
    this.searching = true;
    this.search( filter ).subscribe( res => {
      this.results = res;
      this.pageNumber = 1;
      this.searching = false;
    } );
  }

  fetchNextPage() {
    this.search( this.filter, ++this.pageNumber ).subscribe( res => {
      this.results.hits.push( ...res.hits );
    } );
  }
}
