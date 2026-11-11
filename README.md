# bdCal

bdCal converts a BD **Darba grafiks** (work schedule) export into
individual calendar files (`.ics`), one for each employee with at least one
shift.

**Use the app:** <https://thestalwart.github.io/bdCal/>

The interface defaults to Latvian. Use the language switch in the header to
view it in English.

## Privacy

The app runs entirely in your browser. The schedule is not uploaded, sent to a
server, or saved by the app. Employee names are shown in the local preview and
used in download filenames. Employee names and personal codes are not included
in calendar event content. If employee names are duplicated, the first part of
the personal code may be used locally to distinguish their filenames.

## Use

1. Show your browser's favorites/bookmarks bar and try dragging the bookmarklet
   link from the app's input panel onto it. If your browser does not allow
   dragging the bookmarklet, create a bookmark
   and paste the code below into its address/URL field instead.

   ```javascript
   javascript:(()=>{const d=document.querySelectorAll('.jss_container')[0].jspreadsheet.getData();const t=d.map(r=>r.join('\t')).join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\uFEFF'+t],{type:'text/csv;charset=utf-8;'}));a.download='Sheet1.csv';a.click();URL.revokeObjectURL(a.href)})()
   ```

2. With the work schedule open in the source application, click the bookmarklet
   on the favorites/bookmarks bar. It downloads `Sheet1.csv`.
3. Open the app and choose the downloaded file, or drag and drop it into the
   file picker.
4. Select a schedule month and year. Only dates matching the number of day
   columns in the file are offered.
5. Optionally edit the calendar event name. It is used as the title of each
   shift event.
6. Review the parsed schedule and download each employee's `.ics` file.

The source site's “Save as...” menu is no longer available. The bookmarklet
reads the displayed Jspreadsheet 5.0.0 data and downloads it as tab-delimited UTF-8
text with a BOM and CRLF line endings, named exactly `Sheet1.csv`.

The app creates no empty calendar files for employees without shifts. Calendar
events use the `Europe/Riga` time zone. If a scheduled time is ambiguous or
does not exist because of a daylight-saving transition, the app reports the
problem and does not generate files.

## Input file

Although named `Sheet1.csv`, the file is tab-delimited UTF-8 text. The app
validates its structure, shift entries, and employee, daily, and grand-total
hour checksums before enabling downloads. Empty cells and the `X`, `A`, `S`,
`SB`, `TA`, `BA`, `PA`, `O`, and `0` markers indicate no shift. Personal-code
fields may be empty. Invalid input blocks all calendar file generation.

Use the real schedule only in the browser; it contains sensitive employee
information and must not be committed. `fixtures/Sheet1.example.csv` is the
anonymized fixture used for development and tests.

## Run and test locally

No build step, server, package installation, or framework is required. Open
`index.html` in a modern browser to run the app locally.

Run the automated tests with Node.js:

```sh
node --test tests/parser.test.mjs
```
