

function betData() {
  let text = document.querySelector(".bet-data-textarea").value;
  let timestamp = new Date();

  //text = text.replace(/#/ig, "@");
  let firstArray = [];
  let secondArray = [];
  let thirdArray = [];

  text = text.split("@");
  console.log(JSON.stringify(text, null, 4))

  for (let index = 0; index < text.length; index++) {
     secondArray.push(text[index]);  
  }
  firstArray.push(secondArray);
  console.log(JSON.stringify(firstArray, null, 4))

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

/*
@1
#A
&a
&b
#B
&a
&b
@1
#A
&a
&b
#B
&a
&b
*/
