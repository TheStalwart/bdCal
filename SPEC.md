# bdCal

The app to convert shift scheduled from Sheet1.csv,
a proprietary format of BD,
into industry standard .ics feed,
compatible with popular apps like Google Calendar, Microsoft Outlook and iCloud.

The source website no longer provides its “Save as...” menu item. A browser
bookmarklet that reads the displayed Jspreadsheet 5.0.0 data and downloads
`Sheet1.csv` is a hard, required part of this app; do not remove or treat it as
an optional or unnecessary feature. Include instructions for installing it on
the browser's favorites/bookmarks bar. The bookmarklet must download the
spreadsheet data as tab-delimited UTF-8 text with a UTF-8 BOM and CRLF line
endings, using the exact filename `Sheet1.csv`.

The source format is fixed and is tab-delimited despite the `.csv` extension. It is UTF-8 text, optionally beginning with a UTF-8 BOM. Accept LF or CRLF line endings. Preserve empty fields between tabs, including trailing empty day cells; do not parse it as comma-separated data. A final line terminator is optional. Reject standalone blank rows; do not silently discard them.

Each employee row contains, in order: first name, last name, personal code (which may be empty), one day-entry field for each calendar day, and a final monthly-hours checksum. First- and last-name fields may contain multiple words; do not assume either field is a single word. The first day-entry field maps to day 1 of the selected month, the second to day 2, and so on. Rows have the same number of day-entry fields. The final summary row is identified by the exact first-field value `Stundas dienā`; it contains two empty fields, one daily-hours checksum for each day, and a final grand-total checksum field. There must be exactly one summary row, and it follows the employee rows. The number of day-entry fields determines the schedule's day count and must be 28 through 31.

- Employee names and personal codes are sensitive personal information. Names may be used locally for visualization and in output filenames, but must never be transmitted to third-party services. Do not include employee names in ICS event content; use the configured event name for all shift events.
- Never include the full personal code or its second part in output, visualization, logs, or transmitted data. The second part must never be used or transmitted. When employee names collide, append the exact substring before the first hyphen in each colliding employee's personal-code field to the output filename if all prefixes are present and distinct. If a prefix is missing or repeated, use the employee row number to distinguish every filename in that name group. Use these values only locally for filename disambiguation.
- Output filenames use the selected month-and-year pair and Latvian month names, and preserve Latvian employee-name characters encoded in UTF-8 (for example, `Pāvels Ševčuks - Novembris 2026.ics`). Assume a modern operating system with Unicode filename support. Replace filename-reserved characters and path separators with a safe separator without changing Latvian letters. No further filename collision resolution is required; the browser may append a suffix such as `(1)`.

Each day-entry field is either exactly empty (no shift), one of the no-shift markers `X`, `A`, `S`, `SB`, `TA`, `BA`, `PA`, `O`, or `0`, or a shift in `H-H` form. These marker values do not create shifts and contribute no hours to any checksum; preserve the marker in the schedule preview. Whitespace-only cells and values with surrounding whitespace are invalid, not blank. Shift start and end hours must each be decimal integers from 1 through 23 inclusive; leading zeroes are allowed (for example, `09-11`). The end hour must be later than the start hour, and shifts must be at least two hours long. Thus `10-21` is valid, while values such as `9-8`, `25-30`, `10-11`, or any other non-empty value not matching these rules are parse errors. Display a clear error and refuse to generate any ICS files for invalid input.

All checksum fields must be non-negative integers. For checksum calculations, deduct a one-hour break only from shifts longer than six hours: credited hours equal end hour minus start hour minus one when the elapsed shift duration is greater than six hours; otherwise credited hours equal the full elapsed duration. Use credited hours for employee monthly totals, daily totals, and the grand total; ICS event start and end times must retain the full shift interval. Validate each employee's computed monthly total against that employee's final checksum, each day's computed total across employees against the corresponding daily checksum, and the computed grand total (the sum of all credited shift hours) against the summary row's final grand-total checksum. The computed grand total must also equal the sum of the daily totals. Any mismatch is an input error and blocks all ICS output.

Generate ICS files only for employees with at least one shift. Do not generate an empty ICS file for a zero-shift employee.

Generate calendar files and events according to RFC 5545. Escape text values and fold content lines as required by the standard. Represent event times in the `Europe/Riga` timezone, including appropriate timezone information. Shift times are local wall-clock times in that timezone. Use modern timezone-aware browser facilities to handle daylight-saving transitions; do not hard-code UTC offsets or silently change the scheduled local shift times. If a transition makes an event time impossible to represent reliably, explain the issue clearly rather than silently producing a different time.

Missing or malformed employee fields, inconsistent row widths/day-column counts, missing or malformed employee or daily checksums, a missing/duplicate/misplaced summary row, or any invalid day entry are input errors: display a clear message and refuse to generate any ICS files. The file represents exactly one month from its first through last date; a day count below 28 or above 31 is an input error.

The app should be a single page HTML5 app,
be serverless and do all data processing locally in browser,
as input file contains sensitive personal information.
Never transmit or persist the uploaded file or its contents. Do not send employee names, personal codes, or derived personal information to external services, analytics, logs, or telemetry. Names may be displayed in a local visualization and used in output filenames.

I would prefer app to not use any heavy frameworks like React or Tailwild.
Assume the user will use modern OS and web browser,
with support for latest web standards, e.g. date picker input and timezone utilities.
The app should assume "Europe/Riga" timezone,
because all branches of the business are in the same timezone
with expansion into more timezones highly unexpected.

The expected workflow is for user to upload or drag-and-drop Sheet1.csv,
and be presented with a list of .ics files for each employee, to be downloaded.
The file does not contain month or year.
The UI shall provide a single month-and-year picker, not separate month and year pickers.
The app shall determine valid month-and-year candidates by comparing the number of data days in the uploaded CSV against the number of days in each specific calendar month and year.
Only month-and-year pairs whose day count matches the CSV may be selected.
Determine the current date and year in the Europe/Riga timezone. The picker range starts with the calendar month immediately before the current month and ends with February of the first Gregorian leap year strictly after the current year, inclusive. A year is a leap year if it is divisible by 4, except century years must also be divisible by 400.
A month-and-year pair is valid only if that specific month has the same number of days as the uploaded schedule. The picker must allow only valid pairs within its range.
Count the calendar dates strictly after today through the last day of the current month, using the Europe/Riga date. If fewer than 7 dates remain, default to the earliest valid pair after the current month. Otherwise, default to the current pair if valid; if not, default to the earliest valid future pair. If no future pair is valid, default to the earliest valid pair in the picker range. Exactly 7 remaining dates does not trigger the "fewer than 7" rule.
If there are no valid pairs in the picker range, display an input error and do not generate .ics files. The user may select any other valid pair in the range.

The UI also needs to provide a non-empty text input to be used as the event name (`SUMMARY`) in every ICS shift event. The value must contain at least one non-whitespace character. Default event name is "BD".
Changing the event name must not rebuild calendar files on every keystroke. Debounce event-name updates: wait until the user has stopped typing for 500 ms, then validate the value and refresh the available downloads once. Reset the timer whenever another input event occurs. Changes to the month-and-year picker may refresh downloads immediately.
Each event should have start and end dates set in "Europe/Riga" time zone explicitly.
Offer separate downloads for the generated employee ICS files. ZIP creation and batch-download features are not required unless this spec is later updated to request them.

Visualization of parsed Sheet1.csv would be welcome.

Do not use a real schedule as a committed fixture, even after removing names and personal codes; schedules and derived shift patterns may still identify people. Maintain one wholly generated synthetic fixture at `fixtures/Sheet1.example.csv`. It should cover the supported day-entry values, valid shift-hour boundaries and durations, empty cells, and representative employee and summary rows, with all checksums computed from its synthetic entries. Never derive fixture values or column order from a real schedule. A synthetic fixture reduces exposure to personal data but does not by itself establish GDPR compliance for the application or its operation. Do not modify the source format; treat it as fixed.

The frontend must include the bookmarklet and instructions to install it on the
browser's favorites/bookmarks bar, then invoke it on the displayed work
schedule to download `Sheet1.csv`. The source website's removed “Saglabāt
kā...” (“Save as...”) menu item is not an available extraction workflow.

The UI language should default to Latvian and provide a user-accessible option to switch to
English. Localize all user-facing static and dynamically generated UI text, including validation
messages, input errors, controls, and the schedule preview. Switching languages must not change
schedule parsing, filenames, or generated calendar event content.
Use the Latvian term "Darba grafiks" for the schedule throughout the Latvian UI.
Provide Open Graph and Twitter/X link-preview titles and descriptions, along with the canonical
URL for the published app (`https://thestalwart.github.io/bdCal/`). It is acceptable for the page
title, description, and social-preview metadata to be Latvian only. Keep this metadata static in
the initial HTML; do not try to localize it with JavaScript, since link-preview crawlers may not
execute scripts. Metadata should identify the tool as a BD work-schedule converter.

The interface should use a deep navy/purple primary surface, light lavender and white
supporting surfaces, and coral/pink/red accents. Keep the app focused, accessible, and visually
distinct; do not copy the store's assets, branding, or page layout.
