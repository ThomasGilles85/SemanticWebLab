import { LabAppPage } from './app.po';

describe('lab-app App', function() {
  let page: LabAppPage;

  beforeEach(() => {
    page = new LabAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
