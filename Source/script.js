// day logs
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// adding the live date and time

function dateToday(event) {
  let day = days[now.getDay()];
  let subHeading = document.querySelector("#dayAndTime");
  let timeHours = now.getHours();
  let timeMins = now.getMinutes();
  console.log(timeHours);
  subHeading.innerHTML = `${day}, ${timeHours}:${timeMins}`;
}
dateToday();
