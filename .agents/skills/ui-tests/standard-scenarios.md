# Standardized UI Test Scenarios

When generating test scenarios for a new feature, identify the core functionality being tested and strictly mandate the following test cases based on its type.

## 1. Forms / Input Fields
If the feature involves user typing data into inputs, radio buttons, or text areas:
- **Happy Path**: Submit the form with 100% valid inputs and verify the success state (redirect, toast message, etc.).
- **Negative Path**: Attempt to submit with required fields completely empty and assert the specific validation errors.
- **Edge Case**: Input malformed data into strict fields (e.g., special characters in phone numbers, bad email formatting) and verify specific error states.
- **Edge Case**: Verify placeholders, labels, and default text states.

## 2. Dropdowns / Select Menus
If the feature relies on native `<select>` elements or custom built listboxes/dropdowns:
- **Happy Path**: Click/open the dropdown, select a valid option, and verify the UI updates correctly (e.g., the input text changes or a sub-form appears).
- **Happy Path**: Verify all expected options/strings are actually present within the list.
- **Negative Path**: Verify what happens if the dropdown is required but left in its default "Select an option..." state during form submission.
- **Edge Case**: For typeahead/searchable dropdowns, type a query that has 0 matches and verify a "No options found" message appears.

## 3. Search / Filters
If the feature involves searching a database or filtering a list of items:
- **Happy Path**: Execute a valid query/filter and assert that >0 results are returned and visible.
- **Negative Path**: Execute a query known to return 0 results (e.g., specific dummy text) and verify that the correct "No results found" placeholder UI is displayed.
- **Edge Case**: Input extremely long strings or SQL/XSS specific characters string to ensure the frontend doesn't crash or overflow.

## 4. Navigation / Menus
If the feature is a navigation bar, sidebar, footer, or link matrix:
- **Happy Path**: Click a core internal link and verify the browser navigates to the correct expected URL or Page Object.
- **Edge Case**: Click an external link and verify it utilizes the `target="_blank"` attribute, preventing the user from losing their current session.

## 5. Data Tables / Lists
If the feature relies on displaying tabular data or paginated feeds:
- **Happy Path**: Click a column header and verify the data resorts correctly (ASC/DESC).
- **Happy Path**: Click the "Next Page" pagination button and assert that the data view actually changes.
- **Negative Path**: Verify what the table looks like when the underlying data array is empty (i.e. does it say "No Records" properly or just render an empty grid?).

## 6. Modals / Dialogs
If testing popup UI overlays:
- **Happy Path**: Verify the modal opens when triggered and the background becomes inactive.
- **Negative Path**: Verify the user can successfully dismiss the modal by clicking outside of it, pressing the `Escape` key, or clicking the "X" button.
