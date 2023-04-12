// Fishing in the mind

"use strict";

// setting up array with random numbers for card images

// We can also use Array.from() to create an array of random numbers

const random = function () {
  return Math.trunc(Math.random() * 8);
};

let v1;
const value1 = function () {
  v1 = random();
  return v1;
};
let r;
let v2;
const value2 = function () {
  r = random();

  if (r !== v1) {
    v2 = r;
  } else {
    v2 = value2();
  }

  return v2;
};

let v3;
const value3 = function () {
  r = random();

  if (r !== v1 && r !== v2) {
    v3 = r;
  } else {
    v3 = value3();
  }

  return v3;
};

let v4;
const value4 = function () {
  r = random();

  if (r !== v1 && r !== v2 && r !== v3) {
    v4 = r;
  } else {
    v4 = value4();
  }

  return v4;
};

let v5;
const value5 = function () {
  r = random();

  if (r !== v1 && r !== v2 && r !== v3 && r !== v4) {
    v5 = r;
  } else {
    v5 = value5();
  }

  return v5;
};

let v6;
const value6 = function () {
  r = random();

  if (r !== v1 && r !== v2 && r !== v3 && r !== v4 && r !== v5) {
    v6 = r;
  } else {
    v6 = value6();
  }

  return v6;
};

let v7;
const value7 = function () {
  r = random();

  if (r !== v1 && r !== v2 && r !== v3 && r !== v4 && r !== v5 && r !== v6) {
    v7 = r;
  } else {
    v7 = value7();
  }

  return v7;
};

let v8;
const value8 = function () {
  r = random();

  if (
    r !== v1 &&
    r !== v2 &&
    r !== v3 &&
    r !== v4 &&
    r !== v5 &&
    r !== v6 &&
    r !== v7
  ) {
    v8 = r;
  } else {
    v8 = value8();
  }

  return v8;
};

function randomArray() {
  value1(), value2(), value3(), value4(), value5(), value6();
  value7();
  value8();
}

randomArray();
let arr1 = [v1, v2, v3, v4, v5, v6, v7, v8];
console.log(arr1);

randomArray();
let arr2 = [v1, v2, v3, v4, v5, v6, v7, v8];

console.log(arr2);

const body = document.querySelector("body");

const cardContainer = document.querySelector(".cardContainer");

const imgLink1 =
  "https://i.pinimg.com/236x/b0/dc/e8/b0dce8c8725cfad0b2d2b910762eb599.jpg";
const imgLink2 =
  "https://i.pinimg.com/236x/65/3f/d1/653fd158cba986c1dfa2f261b221d5d3.jpg";
const imgLink3 =
  "https://i.pinimg.com/236x/bc/a2/5c/bca25c8bf26c621b7ef8141bf1fb5d55.jpg";
const imgLink4 =
  "https://i.pinimg.com/236x/a1/f8/02/a1f8029b368be9fdf6a8dc1f7592a693.jpg";
const imgLink5 =
  "https://i.pinimg.com/236x/4f/07/bb/4f07bbacfacace7545f11ab1917ee307.jpg";
const imgLink6 =
  "https://i.pinimg.com/236x/79/3f/e0/793fe0ee41045fb57ac6f84dd2eb056a.jpg";
const imgLink7 =
  "https://i.pinimg.com/236x/24/4d/64/244d64a20967f154be2e04ba148cbaa5.jpg";
const imgLink8 =
  "https://i.pinimg.com/236x/c6/5c/36/c65c366347179f9159de78b01195d28c.jpg";

const imgArr = [
  imgLink1,
  imgLink2,
  imgLink3,
  imgLink4,
  imgLink5,
  imgLink6,
  imgLink7,
  imgLink8,
];

const imgArr2 = [];

// final image array

function finalImageArray() {
  arr1.forEach((n, i) => {
    imgArr2.push(imgArr[arr1[i]], imgArr[arr2[i]]);
  });
}

finalImageArray();

// creating cards

function createCards() {
  imgArr2.forEach((img, i) => {
    const html = ` <div class="card">
  <div class="card__inner">
    <div class="card__face card__face--front"></div>
    <div class="card__face card__face--back">
      <img
        src="${img}" data-img="${i}"
      />
    </div>
  </div>
</div>`;

    cardContainer.insertAdjacentHTML("beforeend", html);
  });
}
createCards();

//cards functionality

const card = document.querySelector(".card__inner");
const cardsAll = document.querySelectorAll(".card__inner");
const bestScore = document.querySelector(".score");
const clicksEl = document.querySelector(".clicks");

// cards functionality
let opened = 0;
let clicks = 0;
let openedPermt = 0;
let previousImage;
cardContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("card__face--front")) return;
  // flipping clicked card
  e.target.closest(".card__inner").classList.add("is-flipped");
  opened++;
  clicks++;

  clicksEl.textContent = clicks;

  const currentImage = e.target.closest(".card").querySelector("img");

  // marking guessed cards
  if (currentImage.src === previousImage?.src) {
    currentImage.dataset.guess = "correct";
    previousImage.dataset.guess = "correct";
  }

  // closing cards function

  function closingCards() {
    e.target.parentElement.parentElement.parentElement
      .querySelectorAll(".card__inner")
      .forEach((c) => {
        if (
          c === e.target.closest(".card__inner") ||
          c.closest(".card").querySelector("img").dataset.guess === "correct"
        )
          return;
        c.classList.remove("is-flipped");
      });
  }

  // setting openedNo and closing cards

  function openedNo() {
    if (opened === 2 && currentImage.src === previousImage?.src) {
      // closingCards();
      return (opened = 0), (openedPermt = openedPermt + 2);
    } else if (opened === 3 && currentImage.src === previousImage?.src) {
      closingCards();
      return (opened = 0), (openedPermt = openedPermt + 2);
    } else if (opened === 3) {
      closingCards();
      return (opened = 1);
    }
  }
  // birthday function is called here for a reason
  // birthday();
  openedNo();

  // ending function
  if (openedPermt === 14) {
    e.target.parentElement.parentElement.parentElement
      .querySelectorAll(".card__inner")
      .forEach((c) => {
        c.classList.add("is-flipped");

        if (parseInt(clicksEl.textContent) < parseInt(bestScore.textContent)) {
          bestScore.textContent = clicksEl.textContent;
        }

        document
          .querySelector(".ending")
          .querySelector("h3").textContent = `Good game! Well done!`;
      });
  }

  // play again button

  document.querySelector(".playAgain").addEventListener("click", function () {
    // function refreshPage() {
    //   window.location.reload();
    // }
    // refreshPage();
    cardContainer.innerHTML = "";
    clicks = 0;
    clicksEl.textContent = clicks;
    openedPermt = 0;
    opened = 0;
    previousImage = "";

    randomArray();
    arr1 = [v1, v2, v3, v4, v5, v6, v7, v8];
    console.log(arr1);
    randomArray();
    arr2 = [v1, v2, v3, v4, v5, v6, v7, v8];
    console.log(arr2);
    imgArr2.splice(0, imgArr2.length);
    finalImageArray();

    createCards();

    document.querySelector(".ending").querySelector("h3").textContent = "";
  });

  // birthday wish
  // function birthday() {
  //   if (
  //     currentImage.src ===
  //     "https://i.pinimg.com/236x/4f/07/bb/4f07bbacfacace7545f11ab1917ee307.jpg"||currentImage.src ===
  //     "https://i.pinimg.com/236x/24/4d/64/244d64a20967f154be2e04ba148cbaa5.jpg") {
  //     document.querySelector(".ending").textContent =
  //       "Happy Birthday Vedansh!";
  //   } else {
  //     document.querySelector(".ending").textContent = " ";
  //   }
  // }

  // storing previous image
  previousImage = currentImage;
});

// play now button

const playNow = document.querySelector(".playNow");
const cover = document.querySelector(".cover");

playNow.addEventListener("click", function () {
  playNow.style.backgroundColor = "white";
  cover.style.display = "none";
});

// removing quote overlay
document.querySelector(".continue").addEventListener("click", function () {
  document.querySelector(".overQuote").classList.add("displayNone");
});
