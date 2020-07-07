import { UploadImagePage } from './upload-image.po';
import { browser, by, element, ExpectedConditions, $$ } from 'protractor';

export class ImageSearchPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getFilteringForm() {
    return element(by.css('app-search-filters form'))
  }

  upload( description ) {
    let uploadPage: UploadImagePage = new UploadImagePage();
    uploadPage.writeDescription( description );
    uploadPage.uploadImage( '/Users/ypatel1/Downloads/img.png' );
    uploadPage.submit();
    browser.wait(
      ExpectedConditions.presenceOf(element(by.css( 'app-upload-image .success' ))),
      50000,
      'Image took too long to upload'
    );
  }

  search( description ) {
    $$('app-search-filters form #description').sendKeys( '' );
    $$('app-search-filters form #description').sendKeys( description );
    element(by.css('app-search-filters form button[type="submit"]')).click();
  }

  setup( description ) {
    this.upload( description );
    this.upload( description );
    this.upload( description );
  }
}
