import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
const require = createRequire(import.meta.url);
const { getMonthOptions, parseSchedule, createFilename, createIcs, translate } = require("../app.js");

const fixtureUrl = new URL("../fixtures/Sheet1.example.csv", import.meta.url);
const fixture = await readFile(fixtureUrl, "utf8");
const pageHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");
const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const spec = await readFile(new URL("../SPEC.md", import.meta.url), "utf8");

test("provides the required schedule-export bookmarklet and installation instructions", () => {
  const bookmarklet = String.raw`javascript:(()=>{const d=document.querySelectorAll('.jss_container')[0].jspreadsheet.getData();const t=d.map(r=>r.join('\t')).join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\uFEFF'+t],{type:'text/csv;charset=utf-8;'}));a.download='Sheet1.csv';a.click();URL.revokeObjectURL(a.href)})()`;
  const textareaStart = pageHtml.indexOf('<textarea id="bookmarklet-code"');
  const textareaContentStart = pageHtml.indexOf(">", textareaStart) + 1;
  const textareaEnd = pageHtml.indexOf("</textarea>", textareaContentStart);
  const pageBookmarklet = pageHtml.slice(textareaContentStart, textareaEnd);
  const readmeBookmarklet = readme.match(/```javascript\r?\n([\s\S]*?)\r?\n\s*```/u)?.[1]?.trim();
  assert.equal(pageBookmarklet, bookmarklet);
  assert.equal(readmeBookmarklet, bookmarklet);
  assert.ok(pageHtml.includes(`<a id="bookmarklet-drag" class="bookmarklet-drag" href="${bookmarklet}" draggable="true"`));
  assert.match(appSource, /bookmarkletLink\.addEventListener\("click", \(event\) => event\.preventDefault\(\)\)/u);
  assert.equal(translate("bookmarkletDragLink", {}, "lv"), "Saglabāt grafiku");
  assert.equal(translate("bookmarkletDragLink", {}, "en"), "Save schedule");
  assert.match(pageHtml, /bookmarkletInstructions/u);
  assert.match(readme, /favorites\/bookmarks bar/u);
  assert.match(spec, /hard, required part/u);
  assert.match(spec, /UTF-8 BOM and CRLF line\s+endings/u);
});

test("parses the synthetic schedule and validates all checksums", () => {
  const schedule = parseSchedule(fixture);
  assert.equal(schedule.dayCount, 31);
  assert.equal(schedule.employees.length, 9);
  assert.equal(schedule.employees.filter((employee) => employee.shifts.length === 0).length, 1);
  assert.equal(schedule.grandTotalHours, 1882);
  assert.equal(schedule.dailyHours.reduce((sum, hours) => sum + hours, 0), 1882);
  assert.deepEqual(schedule.employees.map((employee) => employee.monthlyHours), [296, 355, 296, 270, 240, 209, 152, 64, 0]);
  assert.equal(schedule.employees.at(-1).shifts.length, 0);
});

test("covers every valid shift interval, supported marker, and empty cell", () => {
  const schedule = parseSchedule(fixture);
  const rows = fixture.replace(/^\uFEFF/u, "").split(/\r?\n/u).map((row) => row.split("\t"));
  const summaryIndex = rows.findIndex((row) => row[0] === "Stundas dienā");
  const employeeRows = rows.slice(0, summaryIndex);
  assert.equal(schedule.employees.length, employeeRows.length);
  assert.equal(employeeRows.filter((row) => !row[2].trim()).length, 2);
  assert.ok(schedule.employees.some((employee) => employee.firstName.includes(" ")));
  const markers = new Set(schedule.employees.flatMap((employee) =>
    employee.noShiftDays.map((noShiftDay) => noShiftDay.value)));
  assert.deepEqual([...markers].sort(), ["0", "A", "BA", "O", "PA", "S", "SB", "TA", "X"].sort());
  const cells = employeeRows.flatMap((row) => row.slice(3, -1));
  assert.ok(cells.includes(""));
  assert.ok(cells.includes("09-11"));
  assert.ok(cells.includes("1-3"));
  assert.ok(cells.includes("10-16"));
  assert.ok(cells.includes("10-17"));
  const actualIntervals = new Set(schedule.employees.flatMap((employee) =>
    employee.shifts.map(({ startHour, endHour }) => `${startHour}-${endHour}`)));
  const expectedIntervals = [];
  for (let start = 1; start <= 21; start++) {
    for (let end = start + 2; end <= 23; end++) expectedIntervals.push(`${start}-${end}`);
  }
  assert.equal(actualIntervals.size, 231);
  assert.deepEqual([...actualIntervals].sort(), expectedIntervals.sort());
  assert.equal(schedule.grandTotalHours, schedule.dailyHours.reduce((sum, hours) => sum + hours, 0));
});

test("treats supported leave and no-shift markers as non-shift days", () => {
  const rows = fixture.replace(/^\uFEFF/u, "").split(/\r?\n/u).map((row) => row.split("\t"));
  const markerValues = ["X", "A", "S", "SB", "TA", "BA", "PA", "O", "0"];
  const expectedGrandTotal = parseSchedule(fixture).grandTotalHours;
  for (const marker of markerValues) {
    const employeeRow = rows.findIndex((row) => row[0] !== "Stundas dienā" && row.slice(3, -1).includes("X"));
    const dayIndex = rows[employeeRow].findIndex((value, index) => index >= 3 && index < rows[employeeRow].length - 1 && value === "X");
    const modifiedRows = rows.map((row) => [...row]);
    modifiedRows[employeeRow][dayIndex] = marker;
    const schedule = parseSchedule(modifiedRows.map((row) => row.join("\t")).join("\n"));
    const employee = schedule.employees.find((entry) => entry.rowNumber === employeeRow + 1);
    assert.ok(employee.noShiftDays.some((noShiftDay) => noShiftDay.day === dayIndex - 2 && noShiftDay.value === marker));
    assert.equal(schedule.grandTotalHours, expectedGrandTotal);
  }
});

test("provides Latvian and English UI translations with interpolated values", () => {
  assert.equal(translate("heading", {}, "lv"), "Darba grafiks kalendārā");
  assert.equal(translate("heading", {}, "en"), "Work schedule to calendar");
  assert.equal(translate("privacyStrong", {}, "lv"), "Visi dati paliek šajā ierīcē.");
  assert.equal(translate("privacyStrong", {}, "en"), "All data stays on this device.");
  assert.equal(
    translate("errorDailyChecksum", { day: 2, computed: 9, file: 8 }, "lv"),
    "Dienas kontrolsumma nesakrīt 2. dienai (aprēķināts 9, failā 8).",
  );
  assert.equal(
    translate("errorDailyChecksum", { day: 2, computed: 9, file: 8 }, "en"),
    "Daily checksum mismatch for day 2 (computed 9, file has 8).",
  );
});

test("includes canonical, Open Graph, and Twitter link-preview metadata", () => {
  assert.match(pageHtml, /<link rel="canonical" href="https:\/\/thestalwart\.github\.io\/bdCal\/">/u);
  assert.match(pageHtml, /<meta name="description" content="Pārvērtiet BD darba grafiku lejupielādējamos kalendāra failos\.">/u);
  assert.match(pageHtml, /<meta property="og:type" content="website">/u);
  assert.match(pageHtml, /<meta property="og:site_name" content="bdCal · BD">/u);
  assert.match(pageHtml, /<meta property="og:title" content="bdCal — BD darba grafiks kalendārā">/u);
  assert.match(pageHtml, /<meta property="og:description" content="Pārvērtiet BD darba grafiku lejupielādējamos kalendāra failos\.">/u);
  assert.match(pageHtml, /<meta property="og:locale" content="lv_LV">/u);
  assert.match(pageHtml, /<meta name="twitter:card" content="summary">/u);
  assert.match(pageHtml, /<meta name="twitter:title" content="bdCal — BD darba grafiks kalendārā">/u);
  assert.match(pageHtml, /<meta name="twitter:description" content="Pārvērtiet BD darba grafiku lejupielādējamos kalendāra failos\.">/u);
  assert.match(pageHtml, /<title>bdCal — BD darba grafiks kalendārā<\/title>/u);
  assert.doesNotMatch(appSource, /document\.title\s*=|meta\[name="description"\]|meta\[property="og:|meta\[name="twitter:/u);
});

test("accepts BOM, CRLF, and an optional final line terminator", () => {
  const windowsText = `\uFEFF${fixture.replace(/\r\n/gu, "\n").replace(/\n/gu, "\r\n")}\r\n`;
  assert.equal(parseSchedule(windowsText).dayCount, 31);
});

test("rejects whitespace-only day cells", () => {
  const rows = fixture.replace(/^\uFEFF/u, "").split("\n");
  const cells = rows[0].split("\t");
  cells[3] = " ";
  rows[0] = cells.join("\t");
  assert.throws(() => parseSchedule(rows.join("\n")), /Invalid day entry/u);
});

test("rejects malformed or inconsistent input and checksum mismatches", () => {
  assert.throws(() => parseSchedule(`${fixture}\n\n`), /blank row/u);
  const rows = fixture.replace(/^\uFEFF/u, "").split(/\r?\n/u);
  const summary = rows.at(-1).split("\t");
  summary[summary.length - 1] = String(Number(summary.at(-1)) + 1);
  rows[rows.length - 1] = summary.join("\t");
  const badGrandTotal = rows.join("\n");
  assert.throws(() => parseSchedule(badGrandTotal), /Grand-total checksum mismatch/u);
  const employee = rows[0].split("\t");
  employee[employee.length - 1] = String(Number(employee.at(-1)) + 1);
  const badEmployeeTotal = [employee.join("\t"), ...rows.slice(1)].join("\n");
  assert.throws(() => parseSchedule(badEmployeeTotal), /Monthly checksum mismatch/u);
});

test("month candidates match day count and apply the Riga cutoff", () => {
  const lateInMonth = getMonthOptions(29, { year: 2026, month: 11, day: 25 });
  assert.equal(lateInMonth.selected, "2028-02");
  assert.ok(lateInMonth.options.every((option) => option.month !== 2 || option.year % 4 === 0));

  const earlierInMonth = getMonthOptions(30, { year: 2026, month: 11, day: 6 });
  assert.equal(earlierInMonth.selected, "2026-11");
  assert.equal(getMonthOptions(30, { year: 2026, month: 11, day: 23 }).selected, "2026-11");
  assert.equal(getMonthOptions(30, { year: 2026, month: 11, day: 24 }).selected, "2027-04");
});

test("generated ICS uses configured event title, Latvian filename, and Riga timezone", () => {
  const schedule = parseSchedule(fixture);
  const employee = schedule.employees[0];
  const selection = { year: 2026, month: 7 };
  const contents = createIcs(employee, selection, "BD", new Date("2026-07-06T12:00:00Z"));
  assert.match(contents, /TZID:Europe\/Riga/u);
  assert.match(contents, /DTSTART;TZID=Europe\/Riga:202607/u);
  assert.match(contents, /SUMMARY:BD/u);
  assert.doesNotMatch(contents, /Synthetic 1|Worker 1|SYNTH1|00001/u);
  assert.equal(createFilename(employee, selection), "Synthetic 1 Worker 1 - Jūlijs 2026.ics");
  assert.equal((contents.match(/BEGIN:VEVENT/gu) ?? []).length, employee.shifts.length);
});

test("ICS text is escaped and content lines are folded within the RFC octet limit", () => {
  const employee = { rowNumber: 1, shifts: [{ day: 1, startHour: 10, endHour: 21 }] };
  const contents = createIcs(employee, { year: 2026, month: 11 }, `Ā,${"B".repeat(90)};\\C\nD`);
  const physicalLines = contents.split("\r\n").filter(Boolean);
  assert.ok(physicalLines.every((line) => new TextEncoder().encode(line).length <= 75));
  assert.ok(physicalLines.some((line) => line.startsWith(" ")));
  const unfolded = contents.replace(/\r\n /gu, "");
  assert.ok(unfolded.includes(`SUMMARY:Ā\\,${"B".repeat(90)}\\;\\\\C\\nD`));
});

test("duplicate employee names get disambiguated with only the personal-code first part", () => {
  const rows = fixture.replace(/^\uFEFF/u, "").split(/\r?\n/u);
  const firstRow = rows[0].split("\t");
  firstRow[0] = "Alex";
  firstRow[1] = "Sample";
  rows[0] = firstRow.join("\t");
  const duplicateRow = rows[1].split("\t");
  duplicateRow[0] = "Alex";
  duplicateRow[1] = "Sample";
  rows[1] = duplicateRow.join("\t");
  const schedule = parseSchedule(rows.join("\n"));
  assert.equal(createFilename(schedule.employees[0], { year: 2026, month: 7 }), "Alex Sample - SYNTH1 - Jūlijs 2026.ics");
  assert.equal(createFilename(schedule.employees[1], { year: 2026, month: 7 }), "Alex Sample - SYNTH2 - Jūlijs 2026.ics");
  const calendar = createIcs(schedule.employees[1], { year: 2026, month: 7 }, "BD");
  assert.doesNotMatch(calendar, /SYNTH2|00002/u);
});

test("duplicate names without distinct personal-code prefixes use row numbers", () => {
  const rows = fixture.replace(/^\uFEFF/u, "").split(/\r?\n/u);
  const original = rows[0].split("\t");
  original[0] = "Alex";
  original[1] = "Sample";
  rows[0] = original.join("\t");
  for (const codes of [["", ""], ["010101-00001", "010101-00002"]]) {
    const modifiedRows = rows.map((row) => [...row.split("\t")]);
    const second = modifiedRows[1];
    second[0] = original[0];
    second[1] = original[1];
    modifiedRows[0][2] = codes[0];
    second[2] = codes[1];
    const schedule = parseSchedule(modifiedRows.map((row) => row.join("\t")).join("\n"));
    assert.equal(
      createFilename(schedule.employees[0], { year: 2026, month: 7 }),
      "Alex Sample - row 1 - Jūlijs 2026.ics",
    );
    assert.equal(
      createFilename(schedule.employees[1], { year: 2026, month: 7 }),
      "Alex Sample - row 2 - Jūlijs 2026.ics",
    );
  }
});

test("rejects daylight-saving wall times that cannot be represented unambiguously", () => {
  const employee = { rowNumber: 1, shifts: [{ day: 29, startHour: 3, endHour: 13 }] };
  assert.throws(
    () => createIcs(employee, { year: 2026, month: 3 }, "BD"),
    /does not exist in Europe\/Riga/u,
  );
  const repeatedHourEmployee = { rowNumber: 1, shifts: [{ day: 25, startHour: 3, endHour: 5 }] };
  assert.throws(
    () => createIcs(repeatedHourEmployee, { year: 2026, month: 10 }, "BD"),
    /is ambiguous in Europe\/Riga/u,
  );
});
