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
          <img src="./assets/track-icons/${data.id}.png" alt="${data.name} Track" />
        </div>
        <div class="race-times">
          ${Object.keys(data)
            .map((key) => {
              if (data[key] instanceof Object) {
                return createTime(data[key].start_time, key);
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

const loadData = async () => {
  const response = await fetch(`https://f1-calendar.eu.org/raw/2024.json`);
  return await response.json();
};

function createTime(timeUTC, event) {
  return `<p class='time-line' data-event='${event}'>
      <span class='event'>${event} :</span> 
      <span class='day'>${new Date(timeUTC).toLocaleDateString('en-US', {
        month: "short",
        day: "numeric",
      })}</span>
      <span class='time'>${dateFormat(new Date(timeUTC), "HH:mm")}</span>
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
