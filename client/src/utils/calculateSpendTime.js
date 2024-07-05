let timer;
let timerStart;
let timeSpentOnSite = getTimeSpentOnSite();

function getTimeSpentOnSite() {
  timeSpentOnSite = parseInt(localStorage.getItem("timeSpentOnSite"));
  timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
  return timeSpentOnSite;
}

function startCounting() {
  timerStart = Date.now();
  timer = setInterval(function () {
    timeSpentOnSite = getTimeSpentOnSite() + (Date.now() - timerStart);
    localStorage.setItem("timeSpentOnSite", timeSpentOnSite);
    timerStart = parseInt(Date.now());
    // Convert to seconds
    console.log(parseInt(timeSpentOnSite / 1000));
  }, 1000);
}
// startCounting();
