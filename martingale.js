//localStorage.clear();

//initial state
let step = 1; //
let finalProfit = parseFloat(document.querySelector(".profit").value);
let currentBalance = parseFloat(document.querySelector(".balance").value);
let accumulatedLosses = 0; //
let lossCounter = 1; //
let odd = parseFloat(document.querySelector(".odd").value);
//daily reports data
let maxStake = "0";
let maxLossStreak = "0";
let maxStep = "0";
let maxAccountLoss = "0";

function oneWin() {}

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
    const  insertCycleData = {
      step: results.step,
      date:  timestamp.toLocaleString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"}),
      time: timestamp.toLocaleString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",}),
       openingBal: results.openingBalance,
       stake: results.stake,
       outcome: results.outcome ? "Win" : "Lose",
       pnl: results.pnl,
       closingBal: results.currentBalance,
       profit: results.finalProfit,
       lossCounter: results.lossCounter,
       accumulatedLosses: results.accumulatedLosses < 0 ? 0 : results.accumulatedLosses,
       odd: results.odd,
      // strategy: document.querySelector(".strategy").value,
       //currencyPair: document.querySelector(".trade-pair").value
      };
      
      console.log(JSON.stringify(insertCycleData));
      
    //add to daily reports
    if (results.lossCounter < 1) {
      let timestamp = new Date();
      function filterDaily(
        param = timestamp.toLocaleString(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      ) {
      document.querySelector(".tbody-2").innerHTML ="";
        for (let i = 0; i < localStorage.length; i++) {
          if (
            param != JSON.parse(localStorage.getItem(localStorage.key(i)))[0]
          ) {
          } else {
            let storedValue = localStorage.key(i);
            document.querySelector(".tbody-2").innerHTML += `
      <tr>
      <td>${i+1}</td>
      <td style="min-width: 120px!important;">${
        JSON.parse(localStorage.getItem(storedValue))[0]
      }</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[2]}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[4].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[5].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[6].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[7].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[8].toFixed(2)}</td>
      </tr>
      <tr>
      <td></td>
      <td colspan="2"> ${JSON.parse(localStorage.getItem(storedValue))[1]}</td>
      <td colspan="4"> Trading Pair: ${
        JSON.parse(localStorage.getItem(storedValue))[3]
      }</td>
      </tr>
      `;
          }
        }
      }
      filterDaily();

    }
    return insertCycleData;
  }
}

function filterMonthly(
  param = "Apr 2022"
) {
document.querySelector(".tbody-3").innerHTML ="";
let trackHighestStep = [0];
let trackHighestStoredValue = "";
  for (let i = 0; i < localStorage.length; i++) {
    if (
      param != "Apr 2022"
    ) {
    } else {
      let storedValue = localStorage.key(i);
      trackHighestStep.push(JSON.parse(localStorage.getItem(storedValue))[6]);
      console.log("Highest step:" + Math.max(...trackHighestStep));

      if (Math.max(...trackHighestStep) === JSON.parse(localStorage.getItem(storedValue))[6]) {
        trackHighestStoredValue = JSON.parse(localStorage.getItem(storedValue));
        document.querySelector(".tbody-3").innerHTML = `
<tr>
<td>${i+1}</td>
<td style="min-width: 120px!important;">${
  JSON.parse(localStorage.getItem(storedValue))[0]
}</td>
<td>${JSON.parse(localStorage.getItem(storedValue))[2]}</td>
<td>${JSON.parse(localStorage.getItem(storedValue))[6].toFixed(2)}</td>
<td>${JSON.parse(localStorage.getItem(storedValue))[7].toFixed(2)}</td>
<td>${JSON.parse(localStorage.getItem(storedValue))[8].toFixed(2)}</td>
</tr>
<tr>
<td></td>
<td colspan="2"> ${JSON.parse(localStorage.getItem(storedValue))[1]}</td>
<td colspan="3"> Trading Pair: ${
  JSON.parse(localStorage.getItem(storedValue))[3]
}</td>
</tr>
`;

      } else {
        
      }

    }
  }
}
filterMonthly();
console.log(calculateStake(false));
for (let i = 0; i < localStorage.length; i++) {
  
    let storedValue = localStorage.key(i);
    document.querySelector(".tbody-2").innerHTML += `
      <tr>
      <td>${i+1}</td>
      <td style="min-width: 120px!important;">${
      JSON.parse(localStorage.getItem(storedValue))[0]
      }</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[2]}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[4].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[5].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[6].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[7].toFixed(2)}</td>
      <td>${JSON.parse(localStorage.getItem(storedValue))[8].toFixed(2)}</td>
      </tr>
      <tr>
      <td></td>
      <td colspan="2"> ${JSON.parse(localStorage.getItem(storedValue))[1]}</td>
      <td colspan="4"> Trading Pair: ${
      JSON.parse(localStorage.getItem(storedValue))[3]
      }</td>
      </tr>
      `;
  
}

document.querySelector(".win-btn").addEventListener("click", (event) => {
  calculateStake(true);
});
document.querySelector(".lose-btn").addEventListener("click", (event) => {
  calculateStake(false);
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

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector("tbody");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//sortTable();
