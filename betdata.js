let positionCount = [];
let streakCount = [];
let rawData = document.querySelector(".bet-data-textarea").value;
let timeSaved = "";
let maxStreaks = 0;
let totalMatches = 0;
let final = {
  positionCount: positionCount,
  streakCount: streakCount,
  rawData: rawData,
  timeSaved: timeSaved,
  maxStreaks: maxStreaks,
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
  season.splice(0, 1); /* ideal data without unwanted data*/

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

        //Correct Score 1-1
        totalMatches += 1;
        if (`${teamA}-${teamB}` === "1-1") {
          reports.winData.push(`WK${week}: ${position} ${reportScore}`);
        }
        /*
        //UN 1.5
        if (teamA+teamB < 1.5) {
          reports.winData.push(`WK${week}: ${position} ${reportScore}`);
        }        
        //Draw
        totalMatches += 1;
        if (teamA-teamB === 0) {
          reports.winData.push(`WK${week}: ${position} ${reportScore}`);
        }*/
      }
    }

    let currentWeek = 0;
    let oldWeek = 0;
    let maxStreaks = [];
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
      if (Math.max(...streakCount) > 18) {
        maxStreaks.push(Math.max(...streakCount));
      }
      reports.positionData.push([
        match,
        pos,
        " > ",
        `<b>${lossStreak - 1}</b>`,
      ]);
    }
    maxStreaksPosition = [maxStreaks.length + 1];
    console.log(maxStreaksPosition);
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
          <td>No. ${row[1]}</td>
          <td>${row[0].replace(/: \d\d/, ":").replace(/: \d/, ":")}</td>
          <td>${row[3]}</td>
    </tr>
`;
  }

  const a = [4, "a", "a", "a", "a", "a", "a", "a", "a", 6, 3, 4, 3];

  function count_duplicate(a) {
    let counts = {};

    for (let i = 0; i < a.length; i++) {
      if (counts[a[i]]) {
        counts[a[i]] += 1;
      } else {
        counts[a[i]] = 1;
      }
    }
    let data = [];
    for (let prop in counts) {
      if (counts[prop] >= 1) {
        data.push("(" + prop + "-" + counts[prop] + ")");
      }
    }
    return data;
  }

  console.log(count_duplicate(a));

  final = {
    positionCount: count_duplicate(positionCount),
    streakCount: count_duplicate(streakCount),
    rawData: rawData,
    timeProcessed: timestamp,
  };
  document.querySelector(".betdetails-table").innerHTML = "";
  let seasonNo = Math.floor(Math.random() * 10) + 1;
  document.querySelector(".betdetails-table").innerHTML += `
    <tr>
          <td>No.</td>
          <td>${final.positionCount}</td>
          <td>${final.positionCount.length}</td>
    </tr>
    <tr>
          <td>Loss Streaks</td>
          <td>${final.streakCount}</td>
          <td>${final.streakCount.length}</td>
    </tr>
    <tr>
          <td>Time Processed</td>
          <td>${final.timeProcessed}</td>
          <td></td>
    </tr>
    <tr>
          <td>Season No. </td>
          <td>${seasonNo}</td>
          <td></td>
    </tr>
    <tr>
    <td>Riskiest No. </td>
    <td>${maxStreaksPosition}</td>
    <td></td>
    </tr>
`;
}

function saveData() {
  const insertSeason = {
    timestamp: new Date(),
    data: final.rawData,
  };
  db.season.add(insertSeason).then(function () {
    console.log("Bet Data Saved!");
  });

  totalMatches = 0;
  winCount = 0;
  positionCount = [];
  streakCount = [];
  rawData = "";
  timeSaved = "";
}

document.querySelector(".process-btn").addEventListener("click", (event) => {
  betData();
});
document.querySelector(".prev-btn").addEventListener("click", (event) => {
  betData();
});
document.querySelector(".recent-btn").addEventListener("click", (event) => {
  betData();
});
document.querySelector(".save-btn").addEventListener("click", (event) => {
  betData();
});

const paginate = (items, page = 1, perPage = 1) => {
  const offset = perPage * (page - 1);
  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice(offset, perPage * page);

  return {
    previousPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages: totalPages,
    items: paginatedItems,
  };
};

document.querySelector(".tbody-2").innerHTML = "";
const oneWeekAgo = new Date(Date.now() - 60 * 60 * 1000 * 24 * 7);
const today = new Date(Date.now());
console.log(oneWeekAgo);
db.season
  .where("id")
  .above(50)
  .offset(100)
  .limit(50)
  .toArray()
  .then(function (data) {
    console.log(paginate(data, 50).items[0].data);
  });
