function betData() {
  let text = document.querySelector(".bet-data-textarea").value;

  let timestamp = new Date();

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

function processPosition(param){
      for (let i = 0; i < season.length; i++) {
        for (let j = 0; j < season[i].length; j++) {
          const match = season[i][param-1];
          let score = match.replace(/#/gi, "");
          let reportScore = score;
          score = score.split("-");
          let teamAName = score[0].replace(/\d/gi, "");
          let teamBName = score[1].replace(/\d/gi, "");
          let teamA = score[0].replace(/\D/gi, "");
          let teamB = score[1].replace(/\D/gi, "");
          let position = param ;
          let week = i + 1;
          
          //Correct Score
          if (`${teamA}-${teamB}` === "1-1") {
            reports.winData.push(`WK${week}: ${position} ${reportScore}`);
          }
        }
      }

    let currentWeek = 0;
    let oldWeek = 0;
    for (let i = 0; i < reports.winData.length; i++) {
      const match = reports.winData[i]; //
      let matchWeek = match.split(":")[0];
      matchWeek = parseInt(matchWeek.replace(/WK/, ""));
      if (currentWeek === matchWeek) {
        continue;
      }
      oldWeek = currentWeek;
      currentWeek = matchWeek;
      let lossStreak = currentWeek - oldWeek;
      reports.positionData([match,lossStreak-1]);
    }
    console.log(reports.positionData)
  }
  processPosition(1)
} 


document.querySelector(".bet-data-btn").addEventListener("click", (event) => {

  betData();

});
