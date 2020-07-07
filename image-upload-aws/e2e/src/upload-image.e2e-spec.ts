import { UploadImagePage } from './upload-image.po';
import { browser, logging, ExpectedConditions, by, element } from 'protractor';

describe('Upload Image e2e', () => {
  let page: UploadImagePage;

  beforeEach(() => {
    page = new UploadImagePage();
  });

  it('should display form', () => {
    page.navigateTo();
    expect(page.getForm()).toBeDefined();
  });

  it('should upload the image successfully when image and description is provided', () => {
    page.navigateTo();
    page.writeDescription( 'Image description e2e' );
    page.uploadImage( '/Users/ypatel1/Downloads/img.png' );
    page.submit();
    browser.wait(
      ExpectedConditions.presenceOf(element(by.css( 'app-upload-image .success' ))),
      50000,
      'Image took too long to upload'
    );
  });

  it('should disable upload button when description is not provided', () => {
    page.navigateTo();
    page.uploadImage( '/Users/ypatel1/Downloads/img.png' );
    expect(element(by.css( 'app-upload-image button' ) ).isEnabled()).toBe( false );
  });

  it('should disable upload button when Image is not provided', () => {
    page.navigateTo();
    page.writeDescription( 'Desc' );
    page.submit();
    expect(element(by.css( 'app-upload-image button' ) ).isEnabled()).toBe( false );
  });

  it('should show Image type error when png or jpg is not provided', () => {
    page.navigateTo();
    page.uploadImage( '/Users/ypatel1/Downloads/img.gif' );
    page.writeDescription( 'Desc' );
    page.submit();
    browser.wait(
      ExpectedConditions.presenceOf(element(by.css( 'app-upload-image .error' ))),
      10000,
      'Image took too long to upload'
    );
    expect(element(by.css( 'app-upload-image .error' ) ).getText()).toBe( 'Image should be in PNG or JPEG format' );
  });

  it('should show Image size error when image is bigger than 500 KB', () => {
    page.navigateTo();
    page.uploadImage( '/Users/ypatel1/Downloads/big_size.png' );

    expect(browser.switchTo().alert().getText()).toBe( 'File can\'t be larger than 500 KB' );
  });

});
