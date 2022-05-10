

function betData() {
  let text = document.querySelector(".bet-data-textarea").value;
  let timestamp = new Date();

  text=
console.log(text);

    const insertBetData = {
        date: timestamp.toLocaleString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
    };
}
  
document.querySelector(".bet-data-btn").addEventListener("click", (event) => {
  betData();
});


