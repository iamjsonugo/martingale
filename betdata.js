const db = new Dexie("BetDb");
db.version(1).stores({
    season: "++id,date,data",
    account: "++id,balance"
});

let positionCount = [];
let streakCount = [];
let teamCount = [];
let rawData = document.querySelector(".bet-data-textarea").value;
let textAreaData = document.querySelector(".bet-data-textarea").value;
let timeSaved = "";
let maxStreaks = 0;
let totalMatches = 0;
let endPosList = [];
let final = {
    positionCount: positionCount,
    streakCount: streakCount,
    teamCount: teamCount,
    rawData: rawData,
    timeSaved: timeSaved,
    maxStreaks: maxStreaks,
};


function betData(text = document.querySelector(".bet-data-textarea").value, time = "Now", date = "Today", id = "N/A") {
    let timestamp = new Date();

    let stamp = timestamp.toString().slice(0, 25);


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

        allWeeks[i] = allWeeks[i].slice(0, -1);
        allWeeks[i] = allWeeks[i].substring(1);
        //console.log(allWeeks[i]);
        seasonData = allWeeks[i].split("&");
        if (seasonData[0] == "") {
            seasonData.shift();
        } else if (seasonData[10] == "") {
            seasonData.pop()
        } else {
            seasonData;
        }
        season.push(seasonData != "" ? seasonData: true)
    }
    season.shift();
    //console.log("SEASON TWO", season)



    let reports = {};
    //process winData
    reports.winData = [];
    reports.positionData = [];
    reports.saveData = []; //db



    /////////////////
    function processPosition(param, print) {
        function processPos() {
            for (let week of season) {
                for (let match of week) {
                    //console.log(match)
                }
            }
        }
        processPos();

   let totalMatches = 0;
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
                    teamCount.push(teamAName);
                    teamCount.push(teamBName);
                }
      

            }
        }
 //console.log("Total Weeks", totalMatches)
        let currentWeek = 0;
        let oldWeek = 0;
        let maxStreaks = [];
        let endPos ="";
        let endWeek= "";
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
                maxStreaks.push(Math.max(...streakCount))};
            reports.positionData.push([
                match,
                pos,
                " > ",
                `<b>${lossStreak - 1}</b>`,
            ]);
            endPos = pos;
            endWeek = currentWeek
        }
        reports.positionData.push([
                `<b> End of ${totalMatches/10} Weeks</b`,
                endPos,
                " > ",
                `<b>${(totalMatches/10)-endWeek}</b>`,
            ]);
       endPosList.push(
                ` ${endPos.trim()}(<b>${(totalMatches/10)-endWeek}</b>)`,
            );     
       endPosList.shift();
         
        maxStreaksPosition = [maxStreaks.length+1];
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
    
    endPosList.unshift(`Season ID ${id}<br>`)

    document.querySelector(".betdata-table").innerHTML = "";
    let i = 0;
    for (const row of reports.saveData) {
        i += 1;
        document.querySelector(".betdata-table").innerHTML += `
        <tr>
        
        <td>Pos. ${row[1]}</td>
         <td>${row[3]}</td>
        <td>${row[0].replace(/: \d\d/, ":").replace(/: \d/, ":")}</td>
        </tr>
        `;
    }

    const a = [4,
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        6,
        3,
        4,
        3]

    function count_duplicate(a, team = false) {
        let counts = {}

        for (let i = 0; i < a.length; i++) {
            if (counts[a[i]]) {
                counts[a[i]] += 1
            } else {
                counts[a[i]] = 1
            }
        }
        let data = [];
        for (let prop in counts) {
            if (counts[prop] >= 1) {
                if (team) {
                    data.push("("+prop + "-" + (counts[prop]/10) + ")")
                } else {
                    data.push("(<b>"+prop + "</b>-" + counts[prop] + ")")
                }
            }
        }
        return(data)
    }


    final = {
        positionCount: count_duplicate(positionCount),
        streakCount: count_duplicate(streakCount),
        teamCount: count_duplicate(teamCount, true),
        rawData: rawData,
        timeProcessed: timestamp,
    };
    document.querySelector(".betdetails-table").innerHTML = "";
    let seasonNo = Math.floor(Math.random() * 10) + 1;
    date = date.split("/");
    myDate = new Date("20"+date[2], date[0]-1, date[1])
    document.querySelector(".season-header").innerHTML = `
    <b>ID: ${id}</b> <br>
    <b>${myDate.toDateString()}, ${time} </b><br>
    <b>Season 4 of 20 </b>
    `;
    document.querySelector(".betdetails-table").innerHTML += `
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
    
    //for (let i = 0; i < endPosList.length; i++) {
        document.querySelector(".end-pos-list").innerHTML = endPosList;
        document.querySelector(".paste-list").innerHTML = endPosList;
   // }

    totalMatches = 0;
    winCount = 0;
    positionCount = [];
    streakCount = [];
    teamCount = [];
    rawData = "";
    timeSaved = "";
    endPosList = [];
}


document.querySelector(".process-data-btn").addEventListener("click", (event) => {
    betData();
});

function calculateNextStake(previousLoss = 0, resetParam = false) {
    const stakes = martingale();
    console.log("MARTINGALE", stakes)
    for (const row of stakes) {
        document.querySelector(".stakelist").innerHTML += `
        <b>
        <button class="btn btn-md each-stake w-100  float-sm-right ${row.nextStake}" style="background-color:lightgrey;margin:2px" onclick="navigator.clipboard.writeText(${row.nextStake});this.style.background='orange';document.querySelector('.winning-week').value=${row.step}" type="button" style="width:80px">
        <h6>Step ${row.step}: ${row.nextStake.toLocaleString("en-US")}</h6>
        Loss: ${row.accLoss.toLocaleString("en-US")},
        Win: ${row.winning.toLocaleString("en-US")},
        PnL: ${row.pnl.toLocaleString("en-US")}

        </button>
        </b>
        `
    }

    document.querySelector(".reset-btn").style.display = "block";

}

calculateNextStake()

document.querySelector(".reset-btn").addEventListener("click", (event) => {
    let buttons = document.getElementsByClassName('each-stake')
    for (const button of buttons) {
        button.style.background = 'lightgrey';
    }
    let winningWeek = document.querySelector(".winning-week").value;
    let calculatedTime = (((38-winningWeek)*2)-2)*60;
    ///
    const timestamp = calculatedTime;
    // 2
    var hours = Math.floor(timestamp / 60 / 60);
    var minutes = Math.floor(timestamp / 60) - (hours * 60);
    var formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

    document.querySelector('.timer').innerHTML = `
    <b>Next Timer: ${formatted}, Pos: ${Math.floor(Math.random() * 10) +1}<br>
    `
});

async function paste(input) {
    const text = await navigator.clipboard.readText();
    input.value = text;
}

function saveData() {
    let timestamp = new Date();
    const insertDailyData = {
        date: timestamp.toLocaleString(undefined,
            {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }),
        time: timestamp.toLocaleString(undefined,
            {
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
    getInitialData();
});

const getInitialData = async () => {
  const initialData = await db.season
    .where('id')
    .above(0)
    .desc()
    .toArray()
    
function refreshDetails(currentPage = 0) {
console.log(initialData.length)
    
        let data = initialData;
        betData(data[currentPage].data, data[currentPage].time, data[currentPage].date, data[currentPage].id)
}

page = initialData.length;
document.querySelector(".prev-data-btn").addEventListener("click", (event) => {
    if (page == initialData.length) {
        page = 0
    } else {
        page = page+1;
    }
    refreshDetails(page)
});
document.querySelector(".next-data-btn").addEventListener("click", (event) => {
    if (page == 0) {
        page = initialData.length
    } else {
        page = page -1;
    }
    refreshDetails(page)
});

refreshDetails();
}// End of async db initial Data

getInitialData();

function martingale() {
    let stakeMultiplier = 1.2; //
    let nextStake = 50; //
    let averageOdd = 6; //
    let currentStake = 0;
    let steps = 38; //
    const stakeList = [];
    let currentAL = 0;
    let winning = 0;
    let roundNum = 10;

    function rounder(num) {
        return Math.round(num / roundNum) * roundNum;
    }

    for (let i = 0; i < steps; i++) {
        currentStake = nextStake;
        currentAL += nextStake;
        stakeList.push({
            step: i+1,
            nextStake: rounder(nextStake),
            accLoss: rounder(currentAL),
            winning: (rounder(nextStake)*averageOdd),
            pnl: ((rounder(nextStake)*averageOdd)-rounder(currentAL)),
        });
        nextStake = currentStake * stakeMultiplier;
    }
    return stakeList
}

// TAB JAVASCRIPT
function openCity(evt, cityName) {
    // Declare all variables
    var i,
    tabcontent,
    tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

