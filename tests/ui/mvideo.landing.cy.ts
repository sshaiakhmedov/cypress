import { MvideoLandingPage } from '../../pages/MvideoLanding.page';
import { MVIDEO_SEARCH_QUERIES } from '../../constants/mvideo';

describe('M.Video landing', () => {
  const landing = new MvideoLandingPage();

  it('navigates to search results when submitting робот пылесос in the header search', () => {
    landing.goto();
    landing.searchFor(MVIDEO_SEARCH_QUERIES.robotVacuum);
    landing.assertSearchResultsUrlContainsQuery(MVIDEO_SEARCH_QUERIES.robotVacuum);
    landing.assertSearchResultsVisible(MVIDEO_SEARCH_QUERIES.robotVacuum);
    landing.assertProductTitlesContain(MVIDEO_SEARCH_QUERIES.robotVacuum);
    
    // Verify search bar still has the query after clicking it
    landing.clickSearchInput();
    landing.assertSearchInputContains(MVIDEO_SEARCH_QUERIES.robotVacuum);
  });
});
