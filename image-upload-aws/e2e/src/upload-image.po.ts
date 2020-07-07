import { browser, by, element } from 'protractor';

export class UploadImagePage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getForm() {
    return element(by.css('app-upload-image form'))
  }

  writeDescription( desc ): Promise<any> {
    return element(by.css('app-upload-image form #description')).sendKeys(desc) as Promise<any>;
  }

  uploadImage( filePath ) {
    return element(by.css('app-upload-image form #image')).sendKeys(filePath) as Promise<any>;
  }

  submit() {
    element(by.css('app-upload-image form button')).click();
  }
}
