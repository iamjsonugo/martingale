document.querySelector(".page-button-1").addEventListener("click", (event) => {
  spa("page-1");
});

document.querySelector(".page-button-2").addEventListener("click", (event) => {
  spa("page-2");
});

document.querySelector(".page-button-3").addEventListener("click", (event) => {
  spa("page-3");
});

document.querySelector(".page-button-4").addEventListener("click", (event) => {
  spa("page-4");
});

document.querySelector(".page-button-5").addEventListener("click", (event) => {
  spa("page-5");
});
document.querySelector(".page-button-6").addEventListener("click", (event) => {
  spa("page-6");
});
document.querySelector(".page-button-7").addEventListener("click", (event) => {
  spa("page-7");
});

function spa(param = "page-5") {
  let currentlyClicked = param;

  if (currentlyClicked === "page-1") {
    document.querySelector(".page-2").style.display = "none";
    document.querySelector(".page-3").style.display = "none";
    document.querySelector(".page-4").style.display = "none";
    document.querySelector(".page-1").style.display = "block";
    document.querySelector(".page-5").style.display = "none";
    document.querySelector(".page-6").style.display = "none";
    document.querySelector(".page-7").style.display = "none";
    document.querySelector(".fixed-bottom").style.display = "block";
  } else if (currentlyClicked === "page-2") {
    document.querySelector(".page-1").style.display = "none";
    document.querySelector(".page-3").style.display = "none";
    document.querySelector(".page-4").style.display = "none";
    document.querySelector(".page-2").style.display = "block";
    document.querySelector(".page-5").style.display = "none";
    document.querySelector(".page-6").style.display = "none";
    document.querySelector(".page-7").style.display = "none";
    document.querySelector(".fixed-bottom").style.display = "none";
  } else if (currentlyClicked === "page-3") {
    document.querySelector(".page-1").style.display = "none";
    document.querySelector(".page-2").style.display = "none";
    document.querySelector(".page-4").style.display = "none";
    document.querySelector(".page-3").style.display = "block";
    document.querySelector(".page-5").style.display = "none";
    document.querySelector(".page-6").style.display = "none";
    document.querySelector(".page-7").style.display = "none";
    document.querySelector(".fixed-bottom").style.display = "none";
  } else if (currentlyClicked === "page-4") {
    document.querySelector(".page-1").style.display = "none";
    document.querySelector(".page-2").style.display = "none";
    document.querySelector(".page-3").style.display = "none";
    document.querySelector(".page-4").style.display = "block";
    document.querySelector(".page-5").style.display = "none";
    document.querySelector(".page-6").style.display = "none";
    document.querySelector(".page-7").style.display = "none";
    document.querySelector(".fixed-bottom").style.display = "none";
  } else if (currentlyClicked === "page-5") {
    document.querySelector(".page-1").style.display = "none";
    document.querySelector(".page-2").style.display = "none";
    document.querySelector(".page-3").style.display = "none";
    document.querySelector(".page-4").style.display = "none";
    document.querySelector(".page-5").style.display = "block";
    document.querySelector(".page-6").style.display = "none";
    document.querySelector(".page-7").style.display = "none";
    document.querySelector(".fixed-bottom").style.display = "none";
  } else if (currentlyClicked === "page-6") {
    document.querySelector(".page-1").style.display = "none";
    document.querySelector(".page-2").style.display = "none";
    document.querySelector(".page-3").style.display = "none";
    document.querySelector(".page-4").style.display = "none";
    document.querySelector(".page-5").style.display = "none";
    document.querySelector(".page-6").style.display = "block";
    document.querySelector(".page-7").style.display = "none";
    document.querySelector(".fixed-bottom").style.display = "none";
  } else {
    document.querySelector(".page-1").style.display = "none";
    document.querySelector(".page-2").style.display = "none";
    document.querySelector(".page-3").style.display = "none";
    document.querySelector(".page-4").style.display = "none";
    document.querySelector(".page-5").style.display = "none";
    document.querySelector(".page-6").style.display = "none";
    document.querySelector(".page-7").style.display = "block";
    document.querySelector(".fixed-bottom").style.display = "none";
  }
}
spa();
