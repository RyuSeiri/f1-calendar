document.addEventListener("DOMContentLoaded", async () => {
  const calendarTable = document.getElementById("calendar");
  // const languageSelect = document.getElementById("language");
  // const translations = getTranslations(languageSelect.value);
  const races = await loadData();
  const tableHTML = `
  ${races
    .map((data) => {
      return `
    <div id="round-${data.round}_${data.id}" class="race">
      <h3>
        ${data.round}. ${data.name}
      </h3>
      <div class="race-content">
        <div class="race-image">
          <img src="./assets/track-icons/${data.id}.png" alt="${
        data.name
      } Track" />
        </div>
        <div class="race-times">
          ${Object.keys(data)
            .map((key) => {
              if (data[key] instanceof Object) {
                return createTime(
                  data[key].start_day,
                  data[key].start_time,
                  key
                );
              }
            })
            .join("")}
        </div>
      </div>
    </div>`;
    })
    .join("")}
  
    `;
  calendarTable.innerHTML = tableHTML;

  // languageSelect.addEventListener("change", () => {
  //   const translations = getTranslations(languageSelect.value);
  //   document.title = translations.title;
  //   const headers = calendarTable.tBodies[0].rows[0].cells;
  //   headers[0].textContent = translations.race;
  //   headers[1].textContent = translations.location;
  //   headers[2].textContent = translations.date;
  //   headers[3].textContent = translations.localTimes;
  // });
});

const currentYear = new Date().getFullYear();
const loadData = async () => {
  const response = await fetch(
    `https://f1-calendar.eu.org/raw/${currentYear}.json`
  );
  return await response.json();
};

// function createTime(timeUTC, event) {
//   return `<p class='time-line' data-event='${event}'>
//       <span class='event'>${event} :</span>
//       <span class='day'>${new Date(timeUTC).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       })}</span>
//       <span class='time'>${dateFormat(new Date(timeUTC), "HH:mm")}</span>
//     </p>`;
// }

function parseCustomDate(year, monthDay, time) {
  const monthAbbr = monthDay.slice(-3);
  const day = parseInt(monthDay.replace(monthAbbr, ""), 10);
  const [hours, minutes] = time.split(":").map(Number);
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const monthIndex = monthMap[monthAbbr];
  if (monthIndex === undefined)
    throw new Error("Invalid month abbreviation: " + monthAbbr);
  return Date.UTC(year, monthIndex, day, hours, minutes);
}

function formatInTimeZone(
  date,
  timeZone,
  option = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    ...option,
    hour12: false,
  }).format(date);
}

function createTime(startDay, startTime, event) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dataTime = parseCustomDate(currentYear, startDay, startTime);

  return `<p class='time-line' data-event='${event}'>
      <span class='event'>${event} :</span> 
      <span class='day'>${formatInTimeZone(dataTime, timeZone, {
        month: "2-digit",
        day: "2-digit",
      })}</span>
      <span class='time'>${formatInTimeZone(dataTime, timeZone, {
        hour: "2-digit",
        minute: "2-digit",
      })}</span>
    </p>`;
}

const dateFormat = (date, fmt = "YYYY/mm/dd HH:MM:SS") => {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),
    "m+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
    "H+": date.getHours().toString(),
    "M+": date.getMinutes().toString(),
    "S+": date.getSeconds().toString(),
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};
