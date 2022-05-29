const db = new Dexie("BetDb");
db.version(1).stores({
  season: "++id,date,data"
});

let positionCount = [];
let streakCount = [];
let teamCount = [];
let rawData = document.querySelector(".bet-data-textarea").value;
let textAreaData = document.querySelector(".bet-data-textarea").value;
let timeSaved = "";
let maxStreaks = 0;
let totalMatches = 0;
let final = {
  positionCount: positionCount,
  streakCount: streakCount,
  teamCount:teamCount,
  rawData: rawData,
  timeSaved: timeSaved,
  maxStreaks: maxStreaks,
};

function betData(text = document.querySelector(".bet-data-textarea").value, time="Now", date="Today", id="N/A") {
  let timestamp = new Date();

 let stamp = timestamp.toString().slice(0,25);


  timeSaved = timestamp;
  text = text.replace(/bet now/gi, "");
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
    
    let season = [];
    let textTwo = text;
    textTwo = textTwo.substring(1);
    let allWeeks = text.split("@");
    for (let i = 0; i < allWeeks.length; i++) {
       
        allWeeks[i] = allWeeks[i].slice(0,-1);
        allWeeks[i] = allWeeks[i].substring(1);
        //console.log(allWeeks[i]);
        seasonData = allWeeks[i].split("&");
        if (seasonData[0] ==""){
            seasonData.shift();
        } else if (seasonData[10] ==""){
            seasonData.pop()
        } else {
            seasonData;
        }
        season.push(seasonData != "" ? seasonData : true)
    }
    season.shift();
    console.log("SEASON TWO", season)
    


  let reports = {};
  //process winData
  reports.winData = [];
  reports.positionData = [];
  reports.saveData = []; //db
  
  
 
 /////////////////
  function processPosition(param, print) {
    function processPos(){
      for (let week of season){
          for (let match of week){
          //console.log(match)
          }
      }
     }
    processPos();
 
 
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
        if (teamA-teamB === 0) {
           reports.winData.push(`WK${week}: ${position} ${reportScore}`);
           teamCount.push(teamAName);
           teamCount.push(teamBName);
        }
        
   
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
      if (Math.max(...streakCount) > 18) {maxStreaks.push(Math.max(...streakCount))};
      reports.positionData.push([
        match,
        pos,
        " > ",
        `<b>${lossStreak - 1}</b>`,
      ]);
    }
    maxStreaksPosition =  [maxStreaks.length+1];
   // console.log(maxStreaksPosition)
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

  const a = [4,"a","a","a","a","a","a","a","a",6,3,4,3]

  function count_duplicate(a){
   let counts = {}
  
   for(let i =0; i < a.length; i++){ 
       if (counts[a[i]]){
       counts[a[i]] += 1
       } else {
       counts[a[i]] = 1
       }
      }  
      let data = [];
      for (let prop in counts){
          if (counts[prop] >= 1){

              data.push("("+prop + "-" + counts[prop] + ")")
          }
      }
    return(data)
  }
  

  final = {
    positionCount: count_duplicate(positionCount),
    streakCount: count_duplicate(streakCount),
    teamCount: count_duplicate(teamCount),
    rawData: rawData,
    timeProcessed: timestamp,
  };
  document.querySelector(".betdetails-table").innerHTML = "";
  let seasonNo = Math.floor(Math.random() * 10) + 1;
  document.querySelector(".betdetails-table").innerHTML += `
  <tr>
        <td><b>${id}</b></td>
        <td><b>${time}</b></td>
        <td><b>${date}</b></td>
  </tr>
    <tr>
          <td>Position</td>
          <td>${final.positionCount}</td>
          <td>${final.positionCount.length}</td>
    </tr>
    <tr>
          <td>Loss Streaks</td>
          <td>${final.streakCount}</td>
          <td>${final.streakCount.length}</td>
    </tr>
    <tr>
          <td>Team</td>
          <td>${final.teamCount}</td>
          <td>${final.teamCount.length}</td>
    </tr>
`;
 
  
  totalMatches = 0;
  winCount = 0;
  positionCount = [];
  streakCount = [];
  teamCount = [];
  rawData = "";
  timeSaved = "";
}


document.querySelector(".process-data-btn").addEventListener("click", (event) => {
 betData();
});

    function calculateNextStake(previousLoss=0, resetParam=false){
      let stakeList = "240000*50*60*75*90*110*130*160*190*230*280*340*410*490*590*710*850*1020*1220*1470*1770*2120*2550*3060*3670*4400*5280*6340*7610*9150*10980*13180*15820*18980*22780*27340*32808*39370*47240"
;
      stakeList = stakeList.split("*")  
      bankRoll = stakeList[0]
      stakeList.shift()

      for (const [i, stake] of stakeList.entries()) {
        document.querySelector(".stakelist").innerHTML += `<b>
        <button class="btn btn-md each-stake  float-sm-right ${stake}" style="background-color:lightgrey;margin:4px" onclick="navigator.clipboard.writeText(${stake});this.style.background='orange';" type="button" style="width:80px"> <sup>[${i+1}]</sup> ${stake}</button>
        </b>`
         
        document.querySelector(".next-stake-btn").style.display="none";
        document.querySelector(".reset-btn").style.display="block";
      }
      document.querySelector(".stakelist").innerHTML +="<br><h3>Bank Roll: "+bankRoll+"</h3>"
    }
document.querySelector(".next-stake-btn").addEventListener("click", (event) => {
console.log(calculateNextStake())
});
document.querySelector(".reset-btn").addEventListener("click", (event) => {
  let buttons = document.getElementsByClassName('each-stake')
  for (const button of buttons) {
    button.style.background='lightgrey';
  }
});

async function paste(input) {
        const text = await navigator.clipboard.readText();
        input.value = text;
      }

function saveData(){
    let timestamp = new Date();
      const insertDailyData = {
        date: timestamp.toLocaleString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
        time: timestamp.toLocaleString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        data: document.querySelector(".bet-data-textarea").value,
      };

        db.season
          .add(insertDailyData)
          .then(function () {
            console.log("Db Data", db.season.orderBy("id").reverse().toArray());
          });
}
document.querySelector(".save-data-btn").addEventListener("click", (event) => {
saveData();
  alert("Data saved!")
  refreshDetails()
});

function refreshDetails(currentPage=0){
    db.season.orderBy("id").reverse().limit(16).toArray().then(function (results) {
      let data = results;
     
    betData(data[currentPage].data, data[currentPage].time, data[currentPage].date, data[currentPage].id)
      for (const row of data) {
        console.log(row.data)
      }
  });   
}

page = 15;
document.querySelector(".prev-data-btn").addEventListener("click", (event) => {
  if (page == 15){
      page = 15
  } else{
  page = page+1;
  }
  refreshDetails(page)
});
document.querySelector(".next-data-btn").addEventListener("click", (event) => {
  if (page == 0){
      page = 0
  } else{
  page = page -1;
  }
  refreshDetails(page)
});

refreshDetails();
