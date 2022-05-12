function sixOddReport() {}

function betData(search) {
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
  document.querySelector(".bet-data-textarea").value = JSON.stringify(
    season,
    null,
    4
  );
  const insertSeason = {
    date: timestamp.toLocaleString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
    data: JSON.stringify(season),
  };

  /*db.season
          .add(insertSeason)
          .then(function () {
            alert("Bet Data Saved!");
          });
        */
  function processData() {
    let reports = {};
    reports.winData = [];

    let currentWeek = 0;

    for (let i = 0; i < season.length; i++) {
      for (let j = 0; j < season[i].length; j++) {
        const match = season[i][j];
        let score = match.replace(/#/gi, "");
        let reportScore = score;
        score = score.split("-");
        let teamAName = score[0].replace(/\d/gi, "");
        let teamBName = score[1].replace(/\d/gi, "");
        let teamA = score[0].replace(/\D/gi, "");
        let teamB = score[1].replace(/\D/gi, "");
        let position = j + 1;
        let week = i + 1;

        //Correct Score
        if (`${teamA}-${teamB}` === "2-1") {
          reports.winData.push(`WK${week}: ${position} ${reportScore}`);
        } else {
          console.log("No Correct Score found");
        }
      }
    }

    //position
    for (let i = 0; i < reports.winData.length; i++) {    
      const match = reports.winData[i];
      let matchWeek = match.split(":")[0];
      let matchOutcome = match.split(":")[1]
      matchWeek = parseInt(matchWeek.replace(/WK/, ""));
      matchOutcome = parseInt(matchOutcome.replace(/\w\w\w/, ""));
      if (currentWeek == matchWeek){continue}
      currentWeek = matchWeek;
      console.log(matchWeek);
    }
    console.table(reports.match)
  }
  processData();
}

document.querySelector(".bet-data-btn").addEventListener("click", (event) => {
  betData();
});
