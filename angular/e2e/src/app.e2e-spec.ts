import { AppPage } from './app.po';
import { browser, element, logging,by } from 'protractor';
import { HttpClient,HttpXhrBackend, XhrFactory, HttpErrorResponse} from '@angular/common/http';
import { XMLHttpRequest} from 'xmlhttprequest';
//import { HttpClient } from 'protractor-http-client';

export class BrowserXhr implements XhrFactory {
  constructor() {}
  build(): any { return <any>(new XMLHttpRequest()); }
}

describe('workspace-project App', () => {
  let page: AppPage;
  const http: HttpClient = new HttpClient(new HttpXhrBackend(new BrowserXhr));

  beforeEach(() => {
    page = new AppPage();
    
  });

  it('should display login message', () => {
    page.navigateTo();
    expect(page.getAdminLoginButton().getText()).toEqual('Login As Admin');
    page.getAdminLoginButton().click();
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl+'adminlogin');
    element(by.css('app-admin-login #name')).sendKeys('Admin');
    element(by.css('app-admin-login #password')).sendKeys('Fresco@333');
    element(by.css('app-admin-login #login')).click();
    let trs = element.all(by.id('team'));
    expect(trs.all(by.tagName('td')).get(0).getText()).toBe('Fast Footers');
    expect(trs.all(by.tagName('td')).get(1).getText()).toBe('India');
    expect(trs.all(by.tagName('td')).get(2).getText()).toBe('Ram');
    expect(trs.get(1).all(by.tagName('td')).get(0).getText()).toBe('Fire Fighters');
    expect(trs.get(1).all(by.tagName('td')).get(1).getText()).toBe('America');
    expect(trs.get(1).all(by.tagName('td')).get(2).getText()).toBe('Karthick');
    expect(trs.count()).toBe(2);
    element(by.id('logout')).click();
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl+'login');    
  });

  it('should register team details', (done) => {
  
    let team = {
      name: 'test name',
      country:'test country',
      coach:'test coach',
      password: 'User0@333'
    }
    
    http.post('http://localhost:8001/teams/registration',team).subscribe((response: any) => {
        expect(response.team.name).toEqual('test name');        
        done();
    }, (error: HttpErrorResponse) => {
        done.fail(error.message);
    });
    page.navigateTo();
    page.getAdminLoginButton().click();
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl+'adminlogin');
    element(by.css('app-admin-login #name')).sendKeys('Admin');
    element(by.css('app-admin-login #password')).sendKeys('Fresco@333');
    element(by.css('app-admin-login #login')).click();
    let trs = element.all(by.id('team'));
    expect(trs.get(2).all(by.tagName('td')).get(0).getText()).toBe('test name');
    expect(trs.get(2).all(by.tagName('td')).get(1).getText()).toBe('test country');
    expect(trs.get(2).all(by.tagName('td')).get(2).getText()).toBe('test coach');
    expect(trs.count()).toBe(3);
    element(by.id('logout')).click();
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl+'login');    
});

it('should get user login response', (done) => {
  
        let loginUser = {
          name: 'test name',
          password: 'User0@333'
        }
        http.post('http://localhost:8001/teams/login',loginUser).subscribe((response: any) => {
            expect(response.team.name).toEqual('test name');
            done();
        }, (error: HttpErrorResponse) => {
            done.fail(error.message);
        });
});

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
