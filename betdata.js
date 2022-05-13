let positionCount = [];
let streakCount = [];
let rawData = document.querySelector(".bet-data-textarea").value;
let timeSaved = "";
let totalMatches = 0;
let final = {
  positionCount: positionCount,
  streakCount: streakCount,
  rawData: rawData,
  timeSaved: timeSaved,
};

function betData() {
  let text = document.querySelector(".bet-data-textarea").value;

  let timestamp = new Date();
  timeSaved = timestamp;
  text = text.replace(/able\n/i, "@");
  text = text.split("@")[1];
  text = text
    .replace(/week\s\d/gi, "@")
    .replace(/week\s\d\d/gi, "@")
    .replace(/\:/gi, "")
    .replace(/\d\d\d\d\d/gi, "")
    .replace(/\s\d\s/gi, "")
    .replace(/@\s/gi, "@\n")
    .replace(/@\n\s/gi, "@\n")
    .replace(/@\d/gi, "@")
    .replace(/\t/gi, "#")
    .replace(/\n/gi, "&")
    .replace(/\s/gi, "");

  text = text.split("@");

  let season = [];
  for (let i = 0; i < text.length; i++) {
    text[i] = text[i].split("\n");
    for (let j = 0; j < text[i].length; j++) {
      let week = [];
      let match = text[i][j].split("&");

      week.push(match[1]);
      week.push(match[2]);
      week.push(match[3]);
      week.push(match[4]);
      week.push(match[5]);
      week.push(match[6]);
      week.push(match[7]);
      week.push(match[8]);
      week.push(match[9]);
      week.push(match[10]);
      week.push(match[11]);

      if (match[1] == "") {
        week.splice(0, 1);
      } else if (match[11] == "") {
        week.splice(10, 1);
      } else {
      }
      season.push(week);
    }
  }
  season.splice(0, 1);

  /* 
  const insertSeason = {
    date: timestamp.toLocaleString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
    data: JSON.stringify(season),
  };

 db.season
          .add(insertSeason)
          .then(function () {
            alert("Bet Data Saved!");
          });
  */

  let reports = {};
  //process winData
  reports.winData = [];
  reports.positionData = [];
  reports.saveData = []; //db

  function processPosition(param, print) {
    for (let i = 0; i < season.length; i++) {
      for (let j = 0; j < season[i].length; j++) {
        const match = season[i][param - 1];
        let score = match.replace(/#/gi, "");
        let reportScore = score;
        score = score.split("-");
        let teamA = score[0].replace(/\D/gi, "");
        let teamB = score[1].replace(/\D/gi, "");
        let teamAName = score[0].replace(/\d/gi, "");
        let teamBName = score[1].replace(/\d/gi, "");
        let position = param;
        let week = i + 1;

        //Correct Score
        totalMatches += 1;
        if (`${teamA}-${teamB}` === "3-1") {
          reports.winData.push(`WK${week}: ${position} ${reportScore}`);
        }
      }
    }

    let currentWeek = 0;
    let oldWeek = 0;
    for (let i = 0; i < reports.winData.length; i++) {
      const match = reports.winData[i]; //
      let matchWeek = match.split(":")[0];
      let pos = match.split(":")[1];
      pos = pos.replace(/\w\w\w\d-/, "");
      pos = pos.replace(/\d\w\w\w/, "");
      pos = pos.replace(/\s/, "");
      matchWeek = parseInt(matchWeek.replace(/WK/, ""));
      if (currentWeek === matchWeek) {
        continue;
      }
      oldWeek = currentWeek;
      currentWeek = matchWeek;
      let lossStreak = currentWeek - oldWeek;
      positionCount.push(pos);
      streakCount.push(lossStreak - 1);
      reports.positionData.push([
        match,
        pos,
        " > ",
        `<b>${lossStreak - 1}</b>`,
      ]);
    }
    if (print == true) {
      reports.saveData = reports.positionData;
    }
    reports.winData = [];
  }
  processPosition(1, true);
  processPosition(2);
  processPosition(3);
  processPosition(4);
  processPosition(5);
  processPosition(6);
  processPosition(7);
  processPosition(8);
  processPosition(9);
  processPosition(10);

  document.querySelector(".betdata-table").innerHTML = "";
  let i = 0;
  for (const row of reports.saveData) {
    i += 1;
    document.querySelector(".betdata-table").innerHTML += `
    <tr>
          <td>${i}</td>
          <td>No. ${row[1]}</td>
          <td>${row[0].replace(/: \d\d/, ":").replace(/: \d/, ":")}</td>
          <td>${row[3]}</td>
    </tr>
`;
  }

  let chars = positionCount;

  let uniqueChars = [];
  chars.forEach((c) => {
    if (!uniqueChars.includes(c)) {
      uniqueChars.push(c);
    }
  });

  final = {
    positionCount: uniqueChars,
    streakCount: streakCount.sort(function (a, b) {
      return b - a;
    }),
    rawData: rawData,
    timeProcessed: timestamp,
  };
  document.querySelector(".betdetails-table").innerHTML = "";
  document.querySelector(".betdetails-table").innerHTML += `
    <tr>
          <td>SN list</td>
          <td>${final.positionCount}</td>
    </tr>
    <tr>
          <td>Loss Streaks</td>
          <td>${final.streakCount}</td>
    </tr>
    <tr>
          <td>Time Processed</td>
          <td>${final.timeProcessed}</td>
    </tr>
    <tr>
          <td>Week</td>
          <td>${totalMatches/100}</td>
    </tr>
`;
  totalMatches = 0;
  winCount = 0;
  positionCount = [];
  streakCount = [];
  rawData = "";
  timeSaved = "";
}

document.querySelector(".bet-data-btn").addEventListener("click", (event) => {
  betData();
});
