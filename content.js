let percentageDiv = document.createElement("div");
percentageDiv.className = "percentageContainingDiv";

let endOfArticleFound = false;

percentageDiv.innerHTML = `0<div class="percentageSymbol">%</div>`;

let parent = document.querySelector(".da > div:nth-child(2)");

parent.appendChild(percentageDiv);

document.addEventListener("scroll", throttle(500));

let endPixel = articleEndLine.getBoundingClientRect();
console.log(endPixel.x);

function calculateInsertUpdatePercentage() {
  if (endOfArticleFound) {

    let articleEndLine = document.querySelector("#root > div > div.l.c > div > div > main > div > div.o.dz");

    let endOfArticlePositionFromViewport =articleEndLine.getBoundingClientRect().top;
    
    let totalDistance = window.scrollY + endOfArticlePositionFromViewport;


    let percentageRead = `${(
      (parseInt(window.scrollY) / parseInt(totalDistance)) *
      100
    ).toPrecision(2)}`;

    if(endOfArticlePositionFromViewport<=0){
        percentageRead = 100;
    }
    //set the percentage
    percentageDiv.innerHTML = `${percentageRead}<div class="percentageSymbol">%</div>`;
  }
  //make the percentage string
  let percentageRead = `${(
    (parseInt(window.scrollY) / parseInt(document.body.clientHeight)) *
    100
  ).toPrecision(2)}`;

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    percentageRead = 100;
  }
}

function checkEndOfArticle() {
  console.log("checking end");
  let articleEndLine = document.querySelector(
    "#root > div > div.l.c > div > div > main > div > div.o.dz"
  );
  if (articleEndLine) {
    endOfArticleFound = true;
    console.log("found");
  }
}

function throttle(time) {
  let throttling = false;

  function throttledUpdatePercentage() {
    if (throttling) {
      //if it is is in throttling, there is no need to do anything, just return
      return;
    } else {
      //if it is not throttling, then you need to set a timer to be called after few seconds and set throttling to true
      throttling = true;

      setTimeout(() => {
        checkEndOfArticle();

        calculateInsertUpdatePercentage();

        throttling = false;
      }, time);
    }
  }

  return throttledUpdatePercentage;
}
