import { MachinesPage, OperationsPage, AppPage } from './app.po';
import { browser, logging } from 'protractor';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /**
   * SPA cross-cut e2e tests
   */
  it('should display a navigation bar containing menu items', () => {
    page.navigateTo();
    expect(page.getNavigationBarMenuText()).toEqual('Machines Machine Types Operations Products');
  })

  it('should navigate to machines page by clicking on nav bar', () => {
    page.navigateTo();
    page.navigateToMachinesClickingNavigationLink();
    expect(browser.getCurrentUrl()).toContain('/machines');
  })

  it('should navigate to machine types page by clicking on nav bar', () => {
    page.navigateTo();
    page.navigateToMachineTypesClickingNavigationLink();
    expect(browser.getCurrentUrl()).toContain('/machineTypes');
  })

  it('should navigate to operations page by clicking on nav bar', () => {
    page.navigateTo();
    page.navigateToOperationsClickingNavigationLink();
    expect(browser.getCurrentUrl()).toContain('/operations');
  })

  it('should navigate to products page by clicking on nav bar', () => {
    page.navigateTo();
    page.navigateToProductsClickingNavigationLink();
    expect(browser.getCurrentUrl()).toContain('/products');
  })

  /**
   * MachineTypes component e2e tests
   */
  it('machineTypes should display a table containg Machine Type > Description title', () => {
    page.navigateToMachineTypes();
    expect(page.getMachineTypeTableRowText()).toEqual('Machine Type > Description');
  })

  it('machineTypes should display a table containg New button on top right corner', () => {
    page.navigateToMachineTypes();
    expect(page.getMachineTypeTableTopRightButton().getText()).toEqual('New');
  })

  it('new machineTypes dialog should display a top input box', () => {
    page.navigateToMachineTypes();
    page.getMachineTypeTableTopRightButton().click();
    expect(page.getMachineTypesDialogHeaderText().isPresent);
  })

  it('new machineTypes dialog should display close button at the bottom', () => {
    page.navigateToMachineTypes();
    page.getMachineTypeTableTopRightButton().click();
    page.getMachineTypesDialogCloseButton().click();
    expect(page.getMachineTypesDialogCloseButton().isPresent);
    expect(page.getMachineTypesDialogCloseButton().getText()).toEqual('Close');
  })

  it('new machineTypes dialog should display save button at the bottom', () => {
    page.navigateToMachineTypes();
    page.getMachineTypeTableTopRightButton().click();
    expect(page.getMachineTypesDialogSaveButton().isPresent);
    expect(page.getMachineTypesDialogSaveButton().getText()).toEqual('Save');
  })

  /**
   * Products component e2e tests
   */
  it('products should display a table containg Product Name title', () => {
    page.navigateToProducts();
    expect(page.getProductsTableRowText()).toEqual('Product Name');
  })

  it('products should display a table containg New button on top right corner', () => {
    page.navigateToProducts();
    expect(page.getProductsTableTopRightButtonText()).toEqual('New');
  })


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

// ***************
// MACHINES
// ***************
describe('MachinesPage App', () => {
  let page: MachinesPage;
  beforeEach(() => {
    page = new MachinesPage();
  });
  it('should have Id in table header', () => {
    page.navigateTo();
    expect(page.getMachinesId()).toEqual('Id');
  });
  it('should have Description in table header', () => {
    page.navigateTo();
    expect(page.getMachinesDescription()).toEqual('Description');
  });
  it('should have new button', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getNewButton().getText()).toContain('New');
  });
  it('should have edit button', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getEditButton()).toContain('Edit');
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

// ***************
// OPERATIONS
// ***************
describe('Operations App', () => {
  let page: OperationsPage;

  beforeEach(() => {
    page = new OperationsPage();
  });

  it('should have Id in table header', () => {
    page.navigateTo();
    expect(page.getOperationsId()).toEqual('Id');
  });

  it('should have Tool in table header', () => {
    page.navigateTo();
    expect(page.getOperationsTool()).toEqual('Tool');
  });

  it('should have OperationType in table header', () => {
    page.navigateTo();
    expect(page.getOperationsOperationType()).toEqual('Operation Type');
  });

  it('should have new button', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getNewButton().getText()).toContain('New');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
