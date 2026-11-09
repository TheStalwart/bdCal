const TIME_ZONE = "Europe/Riga";
const NO_SHIFT_MARKERS = new Set(["X", "A", "S", "SB", "TA", "BA", "PA", "O", "0"]);
const LATVIAN_MONTHS = [
  "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs",
  "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris",
];
const ENGLISH_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const translations = {
  lv: {
    eyebrow: "BD · Kalendāra pārveidotājs",
    heading: "Darba grafiks kalendārā",
    ledeFirst: "Pārvērtiet BD darba grafiku atsevišķos kalendāra failos.",
    language: "Valoda",
    privacyLabel: "Privātuma paziņojums",
    privacyStrong: "Visi dati paliek šajā ierīcē.",
    privacyText: "Nekas netiek augšupielādēts vai nosūtīts. Vārdi redzami tikai lokālajā priekšskatā un lejupielādēto failu nosaukumos; ja vārdi sakrīt, faila nosaukumā var tikt iekļauta personas koda pirmā daļa vai rindas numurs.",
    inputStep: "01 · IEVADNE",
    inputHeading: "Izvēlieties grafiku",
    acquisitionLead: "Vispirms iegūstiet grafika failu:",
    acquisitionText: "Ar labo peles pogu noklikšķiniet uz darba grafika un izvēlieties",
    saveAsTranslation: "",
    pickerLabel: "Izvēlieties vai ievelciet Sheet1.csv",
    pickerHint: "Noklikšķiniet, lai izvēlētos failu, vai ievelciet to šeit · apstrāde notiek lokāli",
    scheduleMonth: "Grafika mēnesis",
    chooseFileFirst: "Vispirms izvēlieties grafika failu",
    matchingMonths: "Pieejami tikai tie mēneši, kuru dienu skaits atbilst failā norādītajam.",
    eventName: "Kalendāra notikuma nosaukums",
    eventNameHint: "Šis nosaukums tiks izmantots katram maiņas notikumam.",
    reviewStep: "02 · PĀRSKATS UN LEJUPIELĀDE",
    previewHeading: "Grafika priekšskatījums",
    summaryCounts: "Darbinieku skaits: {employees} · Maiņu skaits: {shifts}",
    tableLabel: "Ritināms parsētā grafika priekšskatījums",
    tableCaption: "Parsētās darbinieku maiņas pa kalendāra dienām",
    tableHint: "Ritiniet horizontāli, lai skatītu visas dienas. Tukša šūna, X, A, S, SB, TA, BA, PA, O un 0 apzīmē dienu bez maiņas.",
    timezone: "Laika josla: Europe/Riga",
    footer: "Privātums pēc noklusējuma · Bez servera · Bez izsekošanas",
    employee: "Darbinieks",
    hours: "Stundas",
    validationEmployees: "{count} darbinieku rindas apstrādātas; mēneša kontrolsummas sakrīt.",
    validationDaily: "Visu {count} dienu kontrolsummas un kopējā kontrolsumma sakrīt.",
    validationStructure: "Maiņu laiki un faila struktūra ir derīgi.",
    noMonthOptions: "Atļautajā periodā nav mēneša un gada, kurā būtu tikpat dienu kā grafikā.",
    noMatchingSelection: "Izvēles periodā nav pieejams mēnesis un gads.",
    eventNameRequired: "Ievadiet kalendāra notikuma nosaukumu, kas nav tukšs.",
    noEmployeesWithShifts: "Nevienam darbiniekam nav maiņu, tāpēc nav lejupielādējamu kalendāra failu.",
    zeroShiftSchedule: "Grafiks ir derīgs. Darbinieki bez maiņām ir redzami priekšskatā, bet tukši kalendāra faili netiek veidoti.",
    downloadsReady: "Grafiks ir pārbaudīts. Lejupielādei pieejami {count} kalendāra faili.",
    generationFailed: "Neizdevās izveidot kalendāra failus.",
    fileReadFailed: "Neizdevās nolasīt failu.",
    selectedFile: "Izvēlēts fails: {name}",
    invalidUtf8: "Izvēlētais fails nav derīgs UTF-8 teksts.",
    noFileDropped: "Nomestajā vietā fails nav atrasts. Izvēlieties vai ievelciet Sheet1.csv grafiku.",
    oneFileAtATime: "Vienlaikus ievelciet tikai vienu grafika failu.",
    errorEmpty: "Izvēlētais fails ir tukšs.",
    errorLineEndings: "Failā ir neatbalstītas rindu beigas. Izmantojiet LF vai CRLF.",
    errorBlankRow: "Failā ir tukša rinda. Izdzēsiet tukšās rindas un mēģiniet vēlreiz.",
    errorSummaryCount: "Failā jābūt tieši vienai dienas kopsavilkuma rindai ar nosaukumu “Stundas dienā”.",
    errorSummaryPosition: "Dienas kopsavilkuma rindai jābūt faila pēdējai rindai.",
    errorMinimumRows: "Failā jābūt vismaz vienai darbinieka rindai un kopsavilkuma rindai.",
    errorDayFields: "Darbinieku rindās nav derīga dienu ierakstu kopuma.",
    errorDayCount: "Failā ir {count} dienu kolonnas. Grafikā jābūt 28–31 dienai.",
    errorSummaryWidth: "Kopsavilkuma rindā ir atšķirīgs kolonnu skaits nekā darbinieku rindās.",
    errorSummaryEmpty: "Pēc “Stundas dienā” kopsavilkuma rindā jābūt diviem tukšiem laukiem.",
    errorRowWidth: "Darbinieka rindā {row} ir neatbilstošs kolonnu skaits.",
    errorEmployeeFields: "Darbinieka rindā {row} trūkst vārda vai uzvārda lauka.",
    errorDayEntry: "Nederīgs dienas ieraksts darbinieka rindā {row}, dienā {day}.",
    errorShiftTime: "Nederīgs maiņas laiks darbinieka rindā {row}, dienā {day}.",
    errorMonthlyChecksum: "Mēneša kontrolsumma nesakrīt darbinieka rindā {row} (aprēķināts {computed}, failā {file}).",
    errorDailyChecksum: "Dienas kontrolsumma nesakrīt {day}. dienai (aprēķināts {computed}, failā {file}).",
    errorGrandChecksum: "Kopējā kontrolsumma nesakrīt (aprēķināts {computed}, failā {file}).",
    errorNumber: "{context} jābūt veselam nenegatīvam skaitlim.",
    errorNumberRange: "{context} pārsniedz atbalstīto skaitlisko diapazonu.",
    contextDailyChecksum: "{day}. dienas kontrolsummai",
    contextGrandChecksum: "kopējai kontrolsummai",
    contextMonthlyChecksum: "darbinieka {row}. rindas mēneša kontrolsummai",
    errorTimezone: "Pārlūkprogramma nevar noteikt Europe/Riga vasaras laika noteikumus šim datumam.",
    errorDstGap: "Maiņas laiks darbinieka rindā {row}, dienā {day} nepastāv Europe/Riga laika joslā vasaras laika maiņas dēļ. Kalendāra faili netika izveidoti.",
    errorDstRepeat: "Maiņas laiks darbinieka rindā {row}, dienā {day} ir divdomīgs Europe/Riga laika joslā, jo vasaras laika maiņas laikā pulkstenis atkārtojas. Kalendāra faili netika izveidoti.",
  },
  en: {
    eyebrow: "BD · Calendar converter",
    heading: "Work schedule to calendar",
    ledeFirst: "Convert a BD work schedule into individual calendar files.",
    language: "Language",
    privacyLabel: "Privacy notice",
    privacyStrong: "All data stays on this device.",
    privacyText: "Nothing is uploaded or transmitted. Names appear only in the local preview and download filenames; a personal-code prefix or employee row number may appear in filenames to distinguish duplicate names.",
    inputStep: "01 · INPUT",
    inputHeading: "Choose a schedule",
    acquisitionLead: "First, get the schedule file:",
    acquisitionText: "Right-click the work schedule and select",
    saveAsTranslation: "(“Save as...”).",
    pickerLabel: "Choose or drop Sheet1.csv",
    pickerHint: "Click to browse, or drag and drop the file here · processed locally",
    scheduleMonth: "Schedule month",
    chooseFileFirst: "Choose a schedule file first",
    matchingMonths: "Only months whose calendar length matches the file are available.",
    eventName: "Calendar event name",
    eventNameHint: "Used as the title for every shift event.",
    reviewStep: "02 · REVIEW & DOWNLOAD",
    previewHeading: "Schedule preview",
    summaryCounts: "Employees: {employees} · Shifts: {shifts}",
    tableLabel: "Scrollable parsed schedule preview",
    tableCaption: "Parsed employee shifts by calendar day",
    tableHint: "Scroll horizontally to see every day. Empty, X, A, S, SB, TA, BA, PA, O, and 0 all indicate no shift.",
    timezone: "Europe/Riga timezone",
    footer: "Private by design · No server · No tracking",
    employee: "Employee",
    hours: "Hours",
    validationEmployees: "{count} employee rows parsed; employee monthly checksums match.",
    validationDaily: "{count} daily checksums and the grand-total checksum match.",
    validationStructure: "Shift times and file structure are valid.",
    noMonthOptions: "No month and year in the allowed range has the same number of days as the schedule.",
    noMatchingSelection: "No matching month and year are available in the picker range.",
    eventNameRequired: "Enter a non-empty calendar event name before generating downloads.",
    noEmployeesWithShifts: "No employees have shifts, so there are no calendar files to download.",
    zeroShiftSchedule: "The schedule is valid. Zero-shift employees appear in the preview but do not get empty calendar files.",
    downloadsReady: "Validated schedule ready. {count} individual calendar file(s) available to download.",
    generationFailed: "The calendar files could not be generated.",
    fileReadFailed: "The file could not be read.",
    selectedFile: "Selected: {name}",
    invalidUtf8: "The selected file is not valid UTF-8 text.",
    noFileDropped: "No file was found in the drop. Choose or drop a Sheet1.csv schedule.",
    oneFileAtATime: "Drop one schedule file at a time.",
    errorEmpty: "The selected file is empty.",
    errorLineEndings: "The file contains unsupported line endings. Use LF or CRLF.",
    errorBlankRow: "The file contains a blank row. Remove blank rows and try again.",
    errorSummaryCount: "The file must contain exactly one daily summary row labeled “Stundas dienā”.",
    errorSummaryPosition: "The daily summary row must be the final row in the file.",
    errorMinimumRows: "The file must contain at least one employee row and a summary row.",
    errorDayFields: "Employee rows do not contain a valid set of day entries.",
    errorDayCount: "The file contains {count} day columns. Schedules must contain 28–31 days.",
    errorSummaryWidth: "The summary row has a different number of columns from the employee rows.",
    errorSummaryEmpty: "The summary row must have two empty fields after “Stundas dienā”.",
    errorRowWidth: "Employee row {row} has an inconsistent number of columns.",
    errorEmployeeFields: "Employee row {row} is missing a first-name or last-name field.",
    errorDayEntry: "Invalid day entry on employee row {row}, day {day}.",
    errorShiftTime: "Invalid shift time on employee row {row}, day {day}.",
    errorMonthlyChecksum: "Monthly checksum mismatch on employee row {row} (computed {computed}, file has {file}).",
    errorDailyChecksum: "Daily checksum mismatch for day {day} (computed {computed}, file has {file}).",
    errorGrandChecksum: "Grand-total checksum mismatch (computed {computed}, file has {file}).",
    errorNumber: "{context} must be a non-negative whole number.",
    errorNumberRange: "{context} is outside the supported numeric range.",
    contextDailyChecksum: "daily checksum for day {day}",
    contextGrandChecksum: "grand-total checksum",
    contextMonthlyChecksum: "monthly checksum on employee row {row}",
    errorTimezone: "The browser could not determine Europe/Riga daylight-saving rules for this date.",
    errorDstGap: "A shift time on employee row {row}, day {day} does not exist in Europe/Riga because of a daylight-saving clock change. No calendar files were generated.",
    errorDstRepeat: "A shift time on employee row {row}, day {day} is ambiguous in Europe/Riga because clocks repeat during a daylight-saving change. No calendar files were generated.",
  },
};
let currentLanguage = "lv";
function translate(key, values = {}, language = currentLanguage) {
  const template = translations[language][key] ?? translations.en[key] ?? key;
  return template.replace(/\{(\w+)\}/gu, (_, name) => {
    if (name === "context" && values.contextKey) {
      return translate(values.contextKey, values.contextValues, language);
    }
    return String(values[name] ?? "");
  });
}
const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

class ScheduleError extends Error {
  constructor(key, values = {}) {
    super(translate(key, values, "en"));
    this.name = "ScheduleError";
    this.translationKey = key;
    this.translationValues = values;
  }
}

function invalid(key, values = {}) {
  throw new ScheduleError(key, values);
}

function parseNonNegativeInteger(value, contextKey, contextValues = {}) {
  const context = { contextKey, contextValues };
  if (!/^\d+$/.test(value)) invalid("errorNumber", context);
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed)) invalid("errorNumberRange", context);
  return parsed;
}

function normalizedEmployeeName(firstName, lastName) {
  return `${firstName.trim().normalize("NFC")} ${lastName.trim().normalize("NFC")}`
    .replace(/\s+/gu, " ")
    .toLocaleLowerCase("lv-LV");
}

function parseSchedule(input) {
  if (typeof input !== "string" || input.length === 0) invalid("errorEmpty");
  let text = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;
  if (text.includes("\r") && /\r(?!\n)/u.test(text)) {
    invalid("errorLineEndings");
  }
  text = text.replace(/\r\n/gu, "\n");
  if (text.endsWith("\n")) text = text.slice(0, -1);
  const lines = text.split("\n");
  if (lines.some((line) => line.length === 0)) {
    invalid("errorBlankRow");
  }

  const rows = lines.map((line) => line.split("\t"));
  const summaryIndexes = [];
  rows.forEach((row, index) => {
    if (row[0] === "Stundas dienā") summaryIndexes.push(index);
  });
  if (summaryIndexes.length !== 1) {
    invalid("errorSummaryCount");
  }
  if (summaryIndexes[0] !== rows.length - 1) {
    invalid("errorSummaryPosition");
  }
  if (rows.length < 2) invalid("errorMinimumRows");

  const summary = rows[rows.length - 1];
  const employeesRows = rows.slice(0, -1);
  const expectedWidth = employeesRows[0].length;
  if (expectedWidth < 32) invalid("errorDayFields");
  const dayCount = expectedWidth - 4;
  if (dayCount < 28 || dayCount > 31) {
    invalid("errorDayCount", { count: dayCount });
  }
  if (summary.length !== expectedWidth) {
    invalid("errorSummaryWidth");
  }
  if (summary[1] !== "" || summary[2] !== "") {
    invalid("errorSummaryEmpty");
  }

  const dailyChecksums = summary.slice(3, 3 + dayCount).map((value, dayIndex) =>
    parseNonNegativeInteger(value, "contextDailyChecksum", { day: dayIndex + 1 }));
  const grandTotalChecksum = parseNonNegativeInteger(summary.at(-1), "contextGrandChecksum");
  const dailyComputed = Array(dayCount).fill(0);
  const seenNames = new Map();
  const employees = employeesRows.map((row, employeeIndex) => {
    const rowNumber = employeeIndex + 1;
    if (row.length !== expectedWidth) {
      invalid("errorRowWidth", { row: rowNumber });
    }
    const firstName = row[0].trim();
    const lastName = row[1].trim();
    if (!firstName || !lastName) {
      invalid("errorEmployeeFields", { row: rowNumber });
    }
    const checksum = parseNonNegativeInteger(row.at(-1), "contextMonthlyChecksum", { row: rowNumber });
    const shiftFields = row.slice(3, 3 + dayCount);
    const shifts = [];
    const noShiftDays = [];
    let monthlyComputed = 0;

    shiftFields.forEach((cell, dayIndex) => {
      if (cell === "") return;
      if (NO_SHIFT_MARKERS.has(cell)) {
        noShiftDays.push({ day: dayIndex + 1, value: cell });
        return;
      }
      const match = /^(\d{1,2})-(\d{1,2})$/u.exec(cell);
      if (!match) {
        invalid("errorDayEntry", { row: rowNumber, day: dayIndex + 1 });
      }
      const startHour = Number(match[1]);
      const endHour = Number(match[2]);
      const duration = endHour - startHour;
      if (startHour < 1 || startHour > 23 || endHour < 1 || endHour > 23 ||
          duration < 2) {
        invalid("errorShiftTime", { row: rowNumber, day: dayIndex + 1 });
      }
      const creditedHours = duration > 6 ? duration - 1 : duration;
      monthlyComputed += creditedHours;
      dailyComputed[dayIndex] += creditedHours;
      shifts.push({ day: dayIndex + 1, startHour, endHour });
    });

    if (monthlyComputed !== checksum) {
      invalid("errorMonthlyChecksum", { row: rowNumber, computed: monthlyComputed, file: checksum });
    }

    const employee = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.replace(/\s+/gu, " "),
      rowNumber,
      shifts,
      noShiftDays,
      monthlyHours: monthlyComputed,
      filenameSuffix: "",
    };
    const key = normalizedEmployeeName(firstName, lastName);
    const group = seenNames.get(key) ?? [];
    group.push(employee);
    seenNames.set(key, group);
    return employee;
  });

  dailyComputed.forEach((computed, dayIndex) => {
    if (computed !== dailyChecksums[dayIndex]) {
      invalid("errorDailyChecksum", { day: dayIndex + 1, computed, file: dailyChecksums[dayIndex] });
    }
  });
  const computedGrandTotal = dailyComputed.reduce((sum, hours) => sum + hours, 0);
  if (computedGrandTotal !== grandTotalChecksum) {
    invalid("errorGrandChecksum", { computed: computedGrandTotal, file: grandTotalChecksum });
  }

  for (const group of seenNames.values()) {
    if (group.length < 2) continue;
    const prefixes = group.map((employee) => {
      const code = employeesRows[employee.rowNumber - 1][2];
      const firstPartEnd = code.indexOf("-");
      return firstPartEnd > 0 ? code.slice(0, firstPartEnd) : "";
    });
    const safePrefixes = prefixes.map((prefix) => safeFilenamePart(prefix));
    const hasDistinctPrefixes = prefixes.every((prefix) => prefix.trim()) &&
      safePrefixes.every(Boolean) && new Set(safePrefixes).size === safePrefixes.length;
    group.forEach((employee, index) => {
      employee.filenameSuffix = hasDistinctPrefixes
        ? ` - ${prefixes[index]}`
        : ` - row ${employee.rowNumber}`;
    });
  }

  return {
    employees,
    dayCount,
    dailyHours: dailyComputed,
    grandTotalHours: computedGrandTotal,
  };
}

function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function getRigaToday(now = new Date()) {
  const parts = formatter.formatToParts(now);
  const get = (type) => Number(parts.find((part) => part.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

function monthOrdinal(year, month) {
  return year * 12 + month - 1;
}

function fromMonthOrdinal(ordinal) {
  return { year: Math.floor(ordinal / 12), month: (ordinal % 12) + 1 };
}

function getMonthOptions(dayCount, today = getRigaToday()) {
  let nextLeapYear = today.year + 1;
  while (!isLeapYear(nextLeapYear)) nextLeapYear += 1;
  const start = monthOrdinal(today.year, today.month) - 1;
  const end = monthOrdinal(nextLeapYear, 2);
  const current = monthOrdinal(today.year, today.month);
  const options = [];
  for (let ordinal = start; ordinal <= end; ordinal += 1) {
    const { year, month } = fromMonthOrdinal(ordinal);
    if (daysInMonth(year, month) === dayCount) {
      options.push({
        year,
        month,
        ordinal,
        value: `${year}-${String(month).padStart(2, "0")}`,
        label: `${LATVIAN_MONTHS[month - 1]} ${year}`,
      });
    }
  }
  if (options.length === 0) return { options, selected: null };

  const currentOption = options.find((option) => option.ordinal === current);
  const future = options.filter((option) => option.ordinal > current);
  const remainingCalendarDates = daysInMonth(today.year, today.month) - today.day;
  let selected;
  if (remainingCalendarDates < 7) {
    selected = future[0];
  } else {
    selected = currentOption ?? future[0];
  }
  selected ??= options[0];
  return { options, selected: selected.value };
}

function pad(value, size = 2) {
  return String(value).padStart(size, "0");
}

function localDateTimeString(year, month, day, hour) {
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}0000`;
}

function zonedParts(timestamp, timeZone = TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function offsetAt(timestamp) {
  const parts = zonedParts(timestamp);
  const localAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return Math.round((localAsUtc - Math.floor(timestamp / 1000) * 1000) / 60000);
}

function sameLocalDateTime(parts, target) {
  return parts.year === target.year && parts.month === target.month &&
    parts.day === target.day && parts.hour === target.hour &&
    parts.minute === target.minute && parts.second === 0;
}

function possibleInstants(target) {
  const wallAsUtc = Date.UTC(target.year, target.month - 1, target.day, target.hour, target.minute, 0);
  const offsets = new Set();
  for (let hour = -36; hour <= 36; hour += 3) {
    offsets.add(offsetAt(wallAsUtc + hour * 60 * 60 * 1000));
  }
  const matches = [];
  for (const offset of offsets) {
    const instant = wallAsUtc - offset * 60 * 1000;
    if (sameLocalDateTime(zonedParts(instant), target)) matches.push(instant);
  }
  return [...new Set(matches)].sort((a, b) => a - b);
}

function offsetText(offsetMinutes) {
  const sign = offsetMinutes < 0 ? "-" : "+";
  const absolute = Math.abs(offsetMinutes);
  return `${sign}${pad(Math.floor(absolute / 60))}${pad(absolute % 60)}`;
}

function utcBasic(timestamp) {
  const date = new Date(timestamp);
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}`;
}

function localBasic(timestamp, offsetBefore) {
  const date = new Date(timestamp + offsetBefore * 60 * 1000);
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}`;
}

function findZoneTransitions(year) {
  const start = Date.UTC(year - 1, 0, 1);
  const end = Date.UTC(year + 2, 0, 1);
  const step = 6 * 60 * 60 * 1000;
  const transitions = [];
  let previousTime = start;
  let previousOffset = offsetAt(previousTime);
  for (let time = start + step; time <= end; time += step) {
    const currentOffset = offsetAt(time);
    if (currentOffset !== previousOffset) {
      let low = previousTime;
      let high = time;
      while (high - low > 1000) {
        const middle = Math.floor((low + high) / 2000) * 1000;
        if (offsetAt(middle) === previousOffset) low = middle;
        else high = middle;
      }
      const instant = Math.ceil(high / 1000) * 1000;
      const afterOffset = offsetAt(instant);
      transitions.push({
        instant,
        before: offsetAt(instant - 1000),
        after: afterOffset,
      });
    }
    previousTime = time;
    previousOffset = currentOffset;
  }
  return transitions;
}

function timezoneComponent(year) {
  const cached = timezoneComponentCache.get(year);
  if (cached) return cached;
  const transitions = findZoneTransitions(year);
  if (transitions.length === 0) {
    throw new ScheduleError("errorTimezone");
  }
  const components = transitions.map((transition) => {
    const type = transition.after > transition.before ? "DAYLIGHT" : "STANDARD";
    return [
      `BEGIN:${type}`,
      `DTSTART:${localBasic(transition.instant, transition.before)}`,
      `TZOFFSETFROM:${offsetText(transition.before)}`,
      `TZOFFSETTO:${offsetText(transition.after)}`,
      `END:${type}`,
    ].join("\r\n");
  });
  const result = ["BEGIN:VTIMEZONE", `TZID:${TIME_ZONE}`, ...components, "END:VTIMEZONE"];
  timezoneComponentCache.set(year, result);
  return result;
}

const timezoneComponentCache = new Map();

function escapeText(value) {
  return value
    .replace(/\\/gu, "\\\\")
    .replace(/\r\n|\r|\n/gu, "\\n")
    .replace(/;/gu, "\\;")
    .replace(/,/gu, "\\,");
}

function foldLine(line) {
  const output = [];
  let current = "";
  let byteLength = 0;
  for (const character of line) {
    const characterBytes = new TextEncoder().encode(character).length;
    if (byteLength + characterBytes > 75 && current) {
      output.push(current);
      current = ` ${character}`;
      byteLength = 1 + characterBytes;
    } else {
      current += character;
      byteLength += characterBytes;
    }
  }
  output.push(current);
  return output.join("\r\n");
}

function ensureRepresentable(employee, day, hour, selection) {
  const target = { year: selection.year, month: selection.month, day, hour, minute: 0, second: 0 };
  const matches = possibleInstants(target);
  if (matches.length === 0) {
    throw new ScheduleError("errorDstGap", { row: employee.rowNumber, day });
  }
  if (matches.length > 1) {
    throw new ScheduleError("errorDstRepeat", { row: employee.rowNumber, day });
  }
}

function makeUid() {
  if (globalThis.crypto?.randomUUID) return `${globalThis.crypto.randomUUID()}@bdcal.local`;
  const randomPart = Array.from({ length: 4 }, () => Math.random().toString(36).slice(2)).join("");
  return `${Date.now()}-${randomPart}@bdcal.local`;
}

function createIcs(employee, selection, eventName, stamp = new Date()) {
  if (!eventName.trim()) throw new ScheduleError("eventNameRequired");
  for (const shift of employee.shifts) {
    ensureRepresentable(employee, shift.day, shift.startHour, selection);
    ensureRepresentable(employee, shift.day, shift.endHour, selection);
  }
  const dtstamp = `${utcBasic(stamp)}Z`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//bdCal//Shift Schedule//EN",
    "CALSCALE:GREGORIAN",
    ...timezoneComponent(selection.year),
  ];
  for (const shift of employee.shifts) {
    const dateStart = localDateTimeString(selection.year, selection.month, shift.day, shift.startHour);
    const dateEnd = localDateTimeString(selection.year, selection.month, shift.day, shift.endHour);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${makeUid()}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=${TIME_ZONE}:${dateStart}`,
      `DTEND;TZID=${TIME_ZONE}:${dateEnd}`,
      `SUMMARY:${escapeText(eventName)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}

function safeFilenamePart(value) {
  return value
    .normalize("NFC")
    .replace(/[<>:"/\\|?*\u0000-\u001f]/gu, "-")
    .replace(/[ .]+$/gu, "")
    .trim();
}

function createFilename(employee, selection) {
  const base = `${employee.name}${employee.filenameSuffix} - ${LATVIAN_MONTHS[selection.month - 1]} ${selection.year}`;
  return `${safeFilenamePart(base) || "schedule"}.ics`;
}

function selectionFromValue(value) {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})$/u.exec(value);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) };
}

function element(id) {
  return document.getElementById(id);
}

function clearDownloadUrls(urls) {
  for (const url of urls) URL.revokeObjectURL(url);
  urls.clear();
}

function setMessage(message, isError = false) {
  const target = element("message");
  target.textContent = message ? translate(message.key, message.values) : "";
  target.classList.toggle("error", isError);
  target.hidden = !message;
  target.setAttribute("role", isError ? "alert" : "status");
  currentMessage = message ? { ...message, isError } : null;
}

let currentMessage = null;
function displayMessage(key, values = {}, isError = false) {
  setMessage({ key, values }, isError);
}
function displayError(error, fallbackKey) {
  if (error instanceof ScheduleError) {
    displayMessage(error.translationKey, error.translationValues, true);
  } else {
    displayMessage(fallbackKey, {}, true);
  }
}

function addCell(row, text, className = "") {
  const cell = document.createElement("td");
  cell.textContent = text;
  if (className) cell.className = className;
  row.append(cell);
}

function renderPreview(schedule) {
  const table = element("schedule-table");
  table.replaceChildren();

  const head = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const employeeHeader = document.createElement("th");
  employeeHeader.scope = "col";
  employeeHeader.className = "employee-col";
  employeeHeader.textContent = translate("employee");
  headerRow.append(employeeHeader);
  for (let day = 1; day <= schedule.dayCount; day += 1) {
    const header = document.createElement("th");
    header.scope = "col";
    header.textContent = String(day);
    headerRow.append(header);
  }
  const totalHeader = document.createElement("th");
  totalHeader.scope = "col";
  totalHeader.textContent = translate("hours");
  headerRow.append(totalHeader);
  head.append(headerRow);
  table.append(head);

  const body = document.createElement("tbody");
  for (const employee of schedule.employees) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("th");
    nameCell.scope = "row";
    nameCell.className = "employee-col";
    nameCell.textContent = employee.name;
    row.append(nameCell);
    const byDay = new Map(employee.shifts.map((shift) => [shift.day, shift]));
    const noShiftByDay = new Map(employee.noShiftDays.map((noShiftDay) => [noShiftDay.day, noShiftDay]));
    for (let day = 1; day <= schedule.dayCount; day += 1) {
      const shift = byDay.get(day);
      const noShiftDay = noShiftByDay.get(day);
      if (shift) addCell(row, `${shift.startHour}-${shift.endHour}`, "shift");
      else if (noShiftDay) addCell(row, noShiftDay.value, "no-shift");
      else addCell(row, "—", "no-shift");
    }
    addCell(row, String(employee.monthlyHours));
    body.append(row);
  }
  table.append(body);
}

function renderValidation(schedule) {
  const validation = element("validation");
  validation.replaceChildren();
  const checks = [
    translate("validationEmployees", { count: schedule.employees.length }),
    translate("validationDaily", { count: schedule.dayCount }),
    translate("validationStructure"),
  ];
  for (const text of checks) {
    const line = document.createElement("p");
    line.textContent = text;
    validation.append(line);
  }
}

function applyLanguage(language) {
  if (!translations[language]) return;
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translate(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", translate(node.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  if (activeSchedule) {
    renderPreview(activeSchedule);
    renderValidation(activeSchedule);
    populateMonthPicker(activeSchedule);
    updateScheduleSummary(activeSchedule);
    const emptyDownloads = document.querySelector(".empty-downloads");
    if (emptyDownloads) emptyDownloads.textContent = translate("noEmployeesWithShifts");
  }
  if (currentMessage) {
    const message = { ...currentMessage };
    setMessage(message, message.isError);
  }
  if (loadedFileName) {
    element("file-name").textContent = translate("selectedFile", { name: loadedFileName });
  }
}

function populateMonthPicker(schedule) {
  const picker = element("month-year");
  const { options, selected } = getMonthOptions(schedule.dayCount);
  picker.replaceChildren();
  if (options.length === 0) {
    picker.disabled = true;
    return false;
  }
  for (const option of options) {
    const elementOption = document.createElement("option");
    elementOption.value = option.value;
    const monthNames = currentLanguage === "lv" ? LATVIAN_MONTHS : ENGLISH_MONTHS;
    elementOption.textContent = `${monthNames[option.month - 1]} ${option.year}`;
    picker.append(elementOption);
  }
  picker.value = selected;
  picker.disabled = false;
  return true;
}

const currentUrls = new Set();
let activeSchedule = null;
let fileReadSequence = 0;
let eventNameRenderTimer = null;
let loadedFileName = "";

function updateScheduleSummary(schedule) {
  const shifts = schedule.employees.reduce((sum, employee) => sum + employee.shifts.length, 0);
  element("schedule-summary").textContent = translate("summaryCounts", {
    employees: schedule.employees.length,
    shifts,
  });
}

function renderDownloads() {
  clearDownloadUrls(currentUrls);
  const downloads = element("downloads");
  downloads.replaceChildren();
  if (!activeSchedule) return;

  const selected = selectionFromValue(element("month-year").value);
  const eventName = element("event-name").value;
  if (!selected) {
    displayMessage("noMatchingSelection", {}, true);
    return;
  }
  if (!eventName.trim()) {
    displayMessage("eventNameRequired", {}, true);
    return;
  }

  const employeesWithShifts = activeSchedule.employees.filter((employee) => employee.shifts.length > 0);
  if (employeesWithShifts.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-downloads";
    message.textContent = translate("noEmployeesWithShifts");
    downloads.append(message);
    displayMessage("zeroShiftSchedule");
    return;
  }

  try {
    const stamp = new Date();
    const outputFiles = employeesWithShifts.map((employee) => ({
      employee,
      contents: createIcs(employee, selected, eventName, stamp),
      filename: createFilename(employee, selected),
    }));
    for (const file of outputFiles) {
      const url = URL.createObjectURL(new Blob([file.contents], { type: "text/calendar;charset=utf-8" }));
      currentUrls.add(url);
      const anchor = document.createElement("a");
      anchor.className = "download-link";
      anchor.href = url;
      anchor.download = file.filename;
      anchor.textContent = `↓ ${file.employee.name}`;
      const filename = document.createElement("span");
      filename.textContent = file.filename;
      anchor.append(filename);
      downloads.append(anchor);
    }
    displayMessage("downloadsReady", { count: outputFiles.length });
  } catch (error) {
    downloads.replaceChildren();
    displayError(error, "generationFailed");
  }
}

function clearResults() {
  activeSchedule = null;
  clearDownloadUrls(currentUrls);
  element("results").hidden = true;
  element("month-year").replaceChildren(new Option(translate("chooseFileFirst"), ""));
  element("month-year").disabled = true;
  element("file-name").hidden = true;
  element("file-name").textContent = "";
  loadedFileName = "";
}

async function handleFile(file) {
  const sequence = ++fileReadSequence;
  clearTimeout(eventNameRenderTimer);
  eventNameRenderTimer = null;
  clearResults();
  setMessage(null);
  if (!file) return;
  element("schedule-file").value = "";
  loadedFileName = file.name;
  element("file-name").textContent = translate("selectedFile", { name: loadedFileName });
  element("file-name").hidden = false;

  try {
    const bytes = await file.arrayBuffer();
    if (sequence !== fileReadSequence) return;
    let text;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      throw new ScheduleError("invalidUtf8");
    }
    const schedule = parseSchedule(text);
    if (sequence !== fileReadSequence) return;
    activeSchedule = schedule;
    renderPreview(schedule);
    renderValidation(schedule);
    updateScheduleSummary(schedule);
    element("results").hidden = false;
    if (!populateMonthPicker(schedule)) {
      activeSchedule = null;
      displayMessage("noMonthOptions", {}, true);
      return;
    }
    renderDownloads();
  } catch (error) {
    if (sequence !== fileReadSequence) return;
    clearResults();
    displayError(error, "fileReadFailed");
  }
}

function initialize() {
  applyLanguage(currentLanguage);
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });
  const filePicker = document.querySelector(".file-picker");
  element("schedule-file").addEventListener("change", (event) => {
    void handleFile(event.currentTarget.files?.[0]);
  });
  filePicker.addEventListener("dragenter", (event) => {
    event.preventDefault();
    filePicker.classList.add("is-dragging");
  });
  filePicker.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    filePicker.classList.add("is-dragging");
  });
  filePicker.addEventListener("dragleave", (event) => {
    if (event.relatedTarget instanceof Node && filePicker.contains(event.relatedTarget)) return;
    filePicker.classList.remove("is-dragging");
  });
  filePicker.addEventListener("drop", (event) => {
    event.preventDefault();
    filePicker.classList.remove("is-dragging");
    const files = event.dataTransfer?.files;
    if (!files?.length) {
      displayMessage("noFileDropped", {}, true);
      return;
    }
    if (files.length > 1) {
      displayMessage("oneFileAtATime", {}, true);
      return;
    }
    void handleFile(files[0]);
  });
  element("month-year").addEventListener("change", () => {
    clearTimeout(eventNameRenderTimer);
    eventNameRenderTimer = null;
    renderDownloads();
  });
  element("event-name").addEventListener("input", () => {
    clearTimeout(eventNameRenderTimer);
    eventNameRenderTimer = setTimeout(() => {
      eventNameRenderTimer = null;
      renderDownloads();
    }, 500);
  });
  window.addEventListener("pagehide", () => clearDownloadUrls(currentUrls), { once: true });
}

if (typeof document !== "undefined") initialize();

if (typeof module === "object" && module.exports) {
  module.exports = { ScheduleError, parseSchedule, getRigaToday, getMonthOptions, createIcs, createFilename, translate };
}
