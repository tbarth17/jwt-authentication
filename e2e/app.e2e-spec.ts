import { Angular2JwtAuthenticationPage } from './app.po';

describe('angular2-jwt-authentication App', () => {
  let page: Angular2JwtAuthenticationPage;

  beforeEach(() => {
    page = new Angular2JwtAuthenticationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
