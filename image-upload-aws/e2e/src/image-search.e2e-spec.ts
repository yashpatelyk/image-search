import { ImageSearchPage } from './image-search.po';
import { browser, by, element, ExpectedConditions, $$ } from 'protractor';

describe('Image Search e2e', () => {
  let page : ImageSearchPage;

  beforeEach( () => {
    page = new ImageSearchPage();
  } );

  it( 'should display filtering form', () => {
    page.navigateTo();
    expect( page.getFilteringForm() ).toBeDefined();
  } );

  it( 'should show images which meet the criteria', () => {
    page.navigateTo();
    const timestamp = new Date().getTime();
    const description = 'image search e2e ' + timestamp
    page.setup( description ); // uploads 3 images
    browser.refresh();
    page.search( timestamp );
    browser.wait(
      ExpectedConditions.invisibilityOf(element(by.css( '.loading-results' ))),
      10000,
      'Image took too long to upload'
    );
    expect($$('.image-row').count() ).toBe( 3 );
  });
} );
