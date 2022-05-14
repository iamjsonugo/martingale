function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

createTable([["row 1, cell 1", "row 1, cell 2"], ["row 2, cell 1", "row 2, cell 2"]]);

////////////////
const paginate = (items, page = 1, perPage = 10) => {
    const offset = perPage * (page - 1);
    const totalPages = Math.ceil(items.length / perPage);
    const paginatedItems = items.slice(offset, perPage * page);
  
    return {
        previousPage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
        items: paginatedItems
    };
};

///////////////
function myFunction() {
  var copyText = document.getElementById("myInput");

  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}

///////////////////////
const a = [4,3,6,3,4,3]

function count_duplicate(a){
 let counts = {}

 for(let i =0; i < a.length; i++){ 
     if (counts[a[i]]){
     counts[a[i]] += 1
     } else {
     counts[a[i]] = 1
     }
    }  
    for (let prop in counts){
        if (counts[prop] >= 2){
            console.log(prop + " counted: " + counts[prop] + " times.")
        }
    }
  console.log(counts)
}

count_duplicate(a)
/*  3 counted: 3 times.
    4 counted: 2 times.
    { '3': 3, '4': 2, '6': 1 }
*/

/////////////remove duplicates 

let chars = ['A', 'B', 'A', 'C', 'B'];

let uniqueChars = [];
chars.forEach((c) => {
    if (!uniqueChars.includes(c)) {
        uniqueChars.push(c);
    }
});

console.log(uniqueChars);

///////////
/*
How do I convert odds to probability?
To calculate probability given odds, you need to divide the odds by one plus the odds:

probability = odds / (odds + 1)

Example: If odds are 4:1, then probability is 4 / (1 + 4) = 4/5 = 80%.

How do I convert probability to odds?
To calculate odds given probability, you need to divide the probability by one minus the probability:

odds = probability / (1 - probability)

Remember to replace 1 by 100% if the probability is given as a percentage.

Example: If probability is 25%, then odds are is 25% / 75% = 1/3 = 0.33.

*/

/////create array with range of numbers

// [].every() stops once it finds a false result
// thus, this iteration will stop on value 7 (since 7 % 2 !== 0)
[2, 4, 7, 9].every(function(value, index, arr) {
  console.log(value);
  return value % 2 === 0; // iterate until an odd number is found
 });
/////
 var uniqueArray = [... new Set(['a', 1, 'a', 2, '1', 1])];

 ///
var columns = ["Date", "Number", "Size", "Location", "Age"];
var rows = ["2001", "5", "Big", "Sydney", "25"];
var result = rows.reduce(function(result, field, index) {
 result[columns[index]] = field;
 return result;
}, {})
console.log(result);
Output:
{
 Date: "2001",
 Number: "5",
 Size: "Big",
 Location: "Sydney",
 Age: "25"
}







