document.addEventListener("DOMContentLoaded", async () => {
  const calendarTable = document.getElementById("calendar");
  const languageSelect = document.getElementById("language");
  const subscribeForm = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("emailInput");
  const translations = getTranslations(languageSelect.value);

  const response = await fetch(
    `https://f1-calendar.eu.org/raw/2024.json`
  );
  const calendarData = await response.json();
  console.log(calendarData);
  const tableHTML = `
      <tr >
        <th>Round</th>
        <th>GP</th>
        <th>${translations.date}</th>
      </tr>
      ${calendarData
        .map(
          (el) => `
          <tr id="${el.id}">
            <td>${el.round}</td>
            <td>${el.name}</td>
            <td>${dateFormat(new Date(el.race.start_time))}</td>
          </tr>
      `
        )
        .join("")}
    `;
  calendarTable.innerHTML = tableHTML;

  languageSelect.addEventListener("change", () => {
    const translations = getTranslations(languageSelect.value);
    document.title = translations.title;
    const headers = calendarTable.tBodies[0].rows[0].cells;
    headers[0].textContent = translations.race;
    headers[1].textContent = translations.location;
    headers[2].textContent = translations.date;
    headers[3].textContent = translations.localTimes;
  });

  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value;
    console.log(`Subscribed email: ${email}`);
    emailInput.value = "";
  });
});


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
