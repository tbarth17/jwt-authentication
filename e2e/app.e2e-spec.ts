import { Actv8ClientDashboardPage } from './app.po';

describe('angular2-jwt-authentication App', function() {
  let page: Actv8ClientDashboardPage;

  beforeEach(() => {
    page = new Actv8ClientDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
