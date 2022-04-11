//initial state
let step = 1; //
let finalProfit = parseFloat(document.querySelector(".profit").value);
let currentBalance = parseFloat(document.querySelector(".balance").value);
let accumulatedLosses = 0; //
let lossCounter = 1; //
let odd = parseFloat(document.querySelector(".odd").value);

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

    document.querySelector("tbody").innerHTML += `
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

    document.querySelector("#next-stake").innerHTML = `Next Stake: ${results.stake.toFixed(2)}.`;
    document.querySelector("#amount-lost").innerHTML = `Next Total Losses: ${results.accumulatedLosses < 0 ? 0 : results.accumulatedLosses.toFixed(2)}.`;
    //update state
    step = results.nextStep;
    finalProfit = results.finalProfit;
    currentBalance = results.currentBalance;
    accumulatedLosses = results.accumulatedLosses;
    lossCounter = results.lossCounter;
    odd = results.odd;
    return;
  }
}
calculateStake(false);
calculateStake(false);

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
    document.querySelector("tbody").innerHTML = ``;
    calculateStake(false);
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
    document.querySelector("tbody").innerHTML = ``;
    calculateStake(false);
    calculateStake(false);
  });
}
