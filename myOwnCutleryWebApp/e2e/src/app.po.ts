import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}

// ***************
// MACHINES
// ***************
export class MachinesPage {

  navigateTo() {
    return browser.get('http://localhost:4200/machines');
  }

  getMachinesId() {
    return element(by.xpath(`//span[1][contains(@class, 'mat-header-cell')]`)).getText();
  }

  getMachinesDescription() {
    return element(by.xpath(`//span[2][contains(@class, 'mat-header-cell')]`)).getText();
  }

  getNewButton() {
    return element(by.cssContainingText('button', 'New'));
  }

  getEditButton() {
    return element(by.xpath(` //button[contains(@class,'btn btn-primary buttonTables')]`)).getText();
  }

}

// ***************
// OPERATIONS
// ***************
export class OperationsPage {

  navigateTo() {
    return browser.get('http://localhost:4200/operations');
  }

  getOperationsId() {
    return element(by.xpath(`//span[1][contains(@class, 'mat-header-cell')]`)).getText();
  }

  getOperationsTool() {
    return element(by.xpath(`//span[2][contains(@class, 'mat-header-cell')]`)).getText();
  }

  getOperationsOperationType() {
    return element(by.xpath(`//span[3][contains(@class, 'mat-header-cell')]`)).getText();
  }

  getNewButton() {
    return element(by.cssContainingText('button', 'New'));
  }

}
