import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navigateToMachineTypes() {
    return browser.get(browser.baseUrl + '/machineTypes') as Promise<any>;
  }

  navigateToProducts() {
    return browser.get(browser.baseUrl + '/products') as Promise<any>;
  }

  getNavigationBarMenuText() {
    return element(by.css('app-root nav ul')).getText();
  }

  getMachineTypeTableRowText() {
    return element(by.css('app-machine-types mat-accordion section span')).getText()
  }

  getProductsTableRowText() {
    return element(by.css('app-product mat-accordion section span')).getText()
  }

  getMachineTypeTableTopRightButton() {
    return element(by.css('app-machine-types mat-accordion section button'));
  }

  getProductsTableTopRightButtonText() {
    return element(by.css('app-product mat-accordion section button')).getText();
  }

  getMachineTypesDialogHeaderText(){
    return element(by.css('app-machine-type-dialog mat-form-field input'));
  }
  
  getMachineTypesDialogCloseButton(){
    return element(by.xpath('//mat-dialog-actions/button[1]/span'));
  }

  getMachineTypesDialogSaveButton(){
    return element(by.xpath('//mat-dialog-actions/button[2]/span'));
  }


  navigateToMachinesClickingNavigationLink() {
    return element(by.xpath('//nav/ul/li[1]/a')).click();
  }

  navigateToMachineTypesClickingNavigationLink() {
    return element(by.xpath('//nav/ul/li[2]/a')).click();
  }

  navigateToOperationsClickingNavigationLink() {
    return element(by.xpath('//nav/ul/li[3]/a')).click();
  }

  navigateToProductsClickingNavigationLink() {
    return element(by.xpath('//nav/ul/li[4]/a')).click();
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
