import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getAdminLoginButton() {
    return element(by.id('adminLogin'));
  }

  getAppText(): Promise<string> {
    return element(by.id('content')).getText() as Promise<string>;
  }
}
