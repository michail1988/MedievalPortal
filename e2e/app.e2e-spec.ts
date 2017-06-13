import { MedievalAppPage } from './app.po';

describe('medieval-app App', function() {
  let page: MedievalAppPage;

  beforeEach(() => {
    page = new MedievalAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
