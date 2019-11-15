import { MachinesPage, OperationsPage } from './app.po';
import { browser, logging } from 'protractor';

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
