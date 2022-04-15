//localStorage.clear();

//initial state
const db = new Dexie("ProductionDB");
db.version(1).stores({
  day: "++id,date,maxStep",
  pattern: "++id,date,lossCounter,accumulatedLosses,workingBalance",
});

let step = 1; //
let finalProfit = parseFloat(document.querySelector(".profit").value);
let currentBalance = parseFloat(document.querySelector(".balance").value);
let strategy = document.querySelector(".strategy").value;
let tradePair = document.querySelector(".trade-pair").value;
let workingBalance = parseFloat(document.querySelector(".balance").value);
let accumulatedLosses = 0; //
let lossCounter = 1; //
let odd = parseFloat(document.querySelector(".odd").value);
//daily reports data
let maxStake = "0";
let maxLossStreak = "0";
let maxStep = "0";
let maxAccountLoss = "0";

function oneWin() {
  let timestamp = new Date();

      const insertDailyData = {
        date: timestamp.toLocaleString(undefined, {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        }),
        time: timestamp.toLocaleString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        strategy: strategy,
        tradePair: tradePair,
        maxStake: (finalProfit/(odd-(1-odd))),
        maxLossStreak: 0,
        maxStep: 1,
        maxAccountLoss: 0,
        workingBalance: workingBalance,
      };

      try {
        db.day
          .add(insertDailyData)
          .then(function () {
            return db.day.toArray();
          });
      } catch (e) {
        console.log(`Error: ${e}`);
      }
      alert("End of Cycle!")
      refreshDaily();
      refreshMonthly();
      return;
}

let timestamp = new Date();
function refreshDaily() {
  document.querySelector(".tbody-2").innerHTML ="";
  let param="";
  param+=document.querySelector(".month-search").value+"/";
  param+=document.querySelector(".day-search").value+"/";
  param+=document.querySelector(".year-search").value; 

  document.querySelector(".tbody-2").innerHTML = "";
    db.day.toArray().then(function (results) {
      let data = results;
      for (const row of data) {
        if(row.date!=param){}else{
          document.querySelector(".tbody-2").innerHTML += `<tr>
        <td>${row.id}</td>
        <td style="min-width: 120px!important;">${row.date}</td>
          <td>${row.strategy}</td>
          <td>${row.maxStake.toFixed(2)}</td>
          <td>${row.maxLossStreak.toFixed(2)}</td>
          <td>${row.maxStep.toFixed(2)}</td>
          <td>${row.maxAccountLoss.toFixed(2)}</td>
          <td>${parseFloat(row.workingBalance).toFixed(2)}</td>
          </tr>
          <tr>
          <td></td>
          <td colspan="3">${row.time} </td>
          <td colspan="4"> Trading Pair: ${row.tradePair}</td>
          </tr>`
        }
      }
  });   
}

function refreshMonthly() {
  document.querySelector(".tbody-3").innerHTML ="";
    db.day.orderBy("maxStep").reverse().limit(5).toArray().then(function (results) {
      let data = results;
      for (const row of data) {

        document.querySelector(".tbody-3").innerHTML += `<tr>
          <td>${row.id}</td>
          <td style="min-width: 120px!important;">${row.date}</td>
            <td>${row.strategy}</td>
            <td>${row.maxStake.toFixed(2)}</td>
            <td>${row.maxLossStreak.toFixed(2)}</td>
            <td>${row.maxStep.toFixed(2)}</td>
            <td>${row.maxAccountLoss.toFixed(2)}</td>
            <td>${parseFloat(row.workingBalance).toFixed(2)}</td>
            </tr>
            <tr>
            <td></td>
            <td colspan="3">${row.time} </td>
            <td colspan="4"> Trading Pair: ${row.tradePair}</td>
            </tr>`
         
      }
  });   
 
 
  db.day.orderBy("maxStep").limit(5).toArray().then(function (results) {
    let data = results;
    for (const row of data) {
          document.querySelector(".tbody-4").innerHTML += `<tr>
        <td>${row.id}</td>
        <td style="min-width: 120px!important;">${row.date}</td>
          <td>${row.strategy}</td>
          <td>${row.maxStake.toFixed(2)}</td>
          <td>${row.maxLossStreak.toFixed(2)}</td>
          <td>${row.maxStep.toFixed(2)}</td>
          <td>${row.maxAccountLoss.toFixed(2)}</td>
          <td>${parseFloat(row.workingBalance).toFixed(2)}</td>
          </tr>
          <tr>
          <td></td>
          <td colspan="3">${row.time} </td>
          <td colspan="4"> Trading Pair: ${row.tradePair}</td>
          </tr>`
        }
       
});  
}


function calculateStake(outcome = false) {
  if (accumulatedLosses < 0) {
    alert("End of Cycle!");
  } else {
    const results = {};
    results.step = step;
    results.openingBalance = currentBalance;
    let stake = (finalProfit + accumulatedLosses / lossCounter) / (odd - 1);
    lossCounter = results.step < 1.5 ? 0 : lossCounter;
    lossCounter = outcome ? lossCounter - 1 : lossCounter + 1;
    let pnl = outcome ? stake * (odd - 1) : 0 - stake;
    accumulatedLosses = accumulatedLosses + pnl * -1;
    currentBalance = currentBalance + pnl;

    //print results
    results.finalProfit = finalProfit;
    results.stake = stake;
    results.odd = odd;
    results.outcome = outcome;
    results.lossCounter = lossCounter < 0 ? 0 : lossCounter;
    results.accumulatedLosses = accumulatedLosses;
    results.pnl = pnl;
    results.currentBalance = currentBalance;
    results.nextStep = step + 1;

    //daily reports data
    maxStake = maxStake + "," + results.stake;
    maxLossStreak = maxLossStreak + "," + results.lossCounter;
    maxStep = maxStep + "," + step;
    maxAccountLoss = maxAccountLoss + "," + results.accumulatedLosses;

    document.querySelector(".tbody-1").innerHTML += `
    <tr>
    <td>${results.step}</td>
    <td>${results.openingBalance.toFixed(2)}</td>
    <td>${results.stake.toFixed(2)}</td>
    <td>${results.outcome ? "Win" : "Lose"}</td>
    <td>${results.pnl.toFixed(2)}</td>
    <td>${results.currentBalance.toFixed(2)}</td>
    </tr>
    <tr>
    <td></td>
    <td colspan="2">Losses Count: ${results.lossCounter}</td>
    <td colspan="3">Lost Amount: ${
      results.accumulatedLosses < 0 ? 0 : results.accumulatedLosses.toFixed(2)
    }</td>
    </tr>
    `;

    document.querySelector(
      "#next-stake"
    ).innerHTML = `Next Stake: ${results.stake.toFixed(2)}.`;
    document.querySelector("#amount-lost").innerHTML = `Next Total Losses: ${
      results.accumulatedLosses < 0 ? 0 : results.accumulatedLosses.toFixed(2)
    }.`;

    //update state
    step = results.nextStep;
    finalProfit = results.finalProfit;
    currentBalance = results.currentBalance;
    accumulatedLosses = results.accumulatedLosses;
    lossCounter = results.lossCounter;
    odd = results.odd;

    let timestamp = new Date();
    const insertPatternData = {
      step: results.step,
      date: timestamp.toLocaleString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
      time: timestamp.toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      outcome: results.outcome ? "Win" : "Lose",
      lossCounter: results.lossCounter,
      strategy: strategy, 
      currencyPair: tradePair,
    };

    try {
      db.pattern
        .add(insertPatternData)
        .then(function () {
          return db.pattern.toArray();
        });
    } catch (e) {
      console.log(`Error: ${e}`);
    }

    //add to daily reports
    if (results.lossCounter < 1) {
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
        strategy: strategy,
        tradePair: tradePair,
        maxStake: Math.max(...maxStake.split(",")),
        maxLossStreak: Math.max(...maxLossStreak.split(",")),
        maxStep: Math.max(...maxStep.split(",")),
        maxAccountLoss: Math.max(...maxAccountLoss.split(",")),
        workingBalance: workingBalance,
      };

      try {
        db.day
          .add(insertDailyData)
          .then(function () {
            return db.day.toArray();
          });
      } catch (e) {
        console.log(`Error: ${e}`);
      }

      refreshDaily();
      refreshMonthly();
      return;
    }
  }
}
refreshDaily();
refreshMonthly()


calculateStake(false);

document.querySelector(".win-btn").addEventListener("click", (event) => {
  calculateStake(true);
  refreshDaily();
  refreshMonthly();
});
document.querySelector(".lose-btn").addEventListener("click", (event) => {
  calculateStake(false);
  refreshMonthly();
  refreshDaily();
});
document.querySelector(".one-win-btn").addEventListener("click", (event) => {
  oneWin();
  refreshMonthly();
  refreshDaily();
});
document.querySelector(".refresh-btn").addEventListener("click", (event) => {
  step = 1; //
  finalProfit = parseFloat(document.querySelector(".profit").value);
  currentBalance = parseFloat(document.querySelector(".balance").value);
  accumulatedLosses = 0; //
  lossCounter = 1; //
  odd = parseFloat(document.querySelector(".odd").value);
  document.querySelector(".tbody-1").innerHTML = ``;
  maxStake = "0";
  maxLossStreak = "0";
  maxStep = "0";
  maxAccountLoss = "0";
  calculateStake(false);
});

const onChangeInputs = document.querySelectorAll(".form-control");
for (const input of onChangeInputs) {
  input.addEventListener("change", () => {
    step = 1; //
    finalProfit = parseFloat(document.querySelector(".profit").value);
    currentBalance = parseFloat(document.querySelector(".balance").value);
    accumulatedLosses = 0; //
    lossCounter = 1; //
    odd = parseFloat(document.querySelector(".odd").value);
    document.querySelector(".tbody-1").innerHTML = ``;
    maxStake = "0";
    maxLossStreak = "0";
    maxStep = "0";
    maxAccountLoss = "0";
    calculateStake(false);
  });
}
