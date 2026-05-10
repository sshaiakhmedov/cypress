import { MvideoLandingPage } from '../../pages/MvideoLanding.page';
import { MVIDEO_SEARCH_QUERIES } from '../../constants/mvideo';
const landing = new MvideoLandingPage();

describe('M.Video landing', () => {
  beforeEach(() => {
    landing.goto();
    landing.closeLocationPopup();
  });

  it('navigates to search results when submitting робот пылесос in the header search', () => {
    landing.searchFor(MVIDEO_SEARCH_QUERIES.robotVacuum);
    landing.assertSearchResultsUrlContainsQuery(MVIDEO_SEARCH_QUERIES.robotVacuum);
    landing.assertSearchResultsVisible(MVIDEO_SEARCH_QUERIES.robotVacuum);
    landing.assertProductTitlesContain(MVIDEO_SEARCH_QUERIES.robotVacuum);

    // Verify search bar still has the query after clicking it
    landing.clickSearchInput();
    landing.assertSearchInputContains(MVIDEO_SEARCH_QUERIES.robotVacuum);
  });
});
