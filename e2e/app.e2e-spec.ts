import { AnalysisSSPPage } from './app.po';

describe('analysis-ssp App', function() {
  let page: AnalysisSSPPage;

  beforeEach(() => {
    page = new AnalysisSSPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
