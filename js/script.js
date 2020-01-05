let squaresObj = document.querySelectorAll(".black_square");
let checkersObj = document.querySelectorAll(".checker");
let checkers = [];
let squares = [];

for (let i = 0; i < squaresObj.length; i++) {
  squares.push(squaresObj[i]);
}
for (let i = 0; i < checkersObj.length; i++) {
  checkers.push(checkersObj[i]);
}

function getChecker(e) {
  let obj = e.currentTarget;
  obj.mustAttack = false;
  obj.color = obj.id.substring(0, 5);
  obj.canMove = false;

  obj.piece = obj.parentElement.id;
  showMoves(obj);
  toLighter(obj);
  makeMove(obj);

  // console.log(obj.prevRoad, obj.nextRoad);
}

checkers.forEach(elem => elem.addEventListener("click", getChecker));
let rem1 = null;
let rem2 = null;
function showMoves(elem) {
  let roads = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let canMoveTo = "";
  let prevRoad = "";
  let nextRoad = "";
  if (elem.color === "black") {
    let prev = String.fromCharCode(elem.piece[0].charCodeAt(0) - 1);
    if (
      roads.includes(prev) &&
      Number(elem.piece[1]) + 1 > 0 &&
      Number(elem.piece[1]) + 1 <= 8
    ) {
      prevRoad += prev + (Number(elem.piece[1]) + 1);
      let templPrev = squares.filter(elemId => elemId.id === prevRoad)[0];

      if (
        templPrev.children.length > 0 &&
        templPrev.children[0].id === "white_checker"
      ) {
        prev = String.fromCharCode(templPrev.id[0].charCodeAt(0) - 1);

        if (
          roads.includes(prev) &&
          Number(templPrev.id[1]) + 1 > 0 &&
          Number(templPrev.id[1]) + 1 <= 8
        ) {
          rem1 = null;
          rem1 = templPrev.children[0];
          prevRoad = "";
          prevRoad += prev + (Number(templPrev.id[1]) + 1);
          console.log(prevRoad);

          if (
            squares.filter(elem => elem.id === prevRoad)[0].children.length > 0
          ) {
            prevRoad = undefined;
          }
        } else {
          prevRoad = undefined;
        }
      } else if (templPrev.children.length !== 0) {
        prevRoad = undefined;
      }

      // if (
      //   prevRoad !== undefined &&
      //   squares.filter(r => r.id === prevRoad)[0].children.length === 0
      // ) {
      //   rem1 = null;
      //   rem1 = templPrev.children[0];
      // }
    }

    let next = String.fromCharCode(elem.piece[0].charCodeAt(0) + 1);
    if (roads.includes(next)) {
      nextRoad += next + (Number(elem.piece[1]) + 1);
      let templNext = squares.filter(elemId => elemId.id === nextRoad)[0];

      if (
        templNext.children.length > 0 &&
        templNext.children[0].id === "white_checker"
      ) {
        next = String.fromCharCode(templNext.id[0].charCodeAt(0) + 1);

        if (
          roads.includes(next) &&
          Number(templNext.id[1]) + 1 > 0 &&
          Number(templNext.id[1]) + 1 <= 8
        ) {
          rem1 = null;
          rem1 = templNext.children[0];
          nextRoad = "";
          nextRoad += next + (Number(templNext.id[1]) + 1);
          if (
            squares.filter(elem => elem.id === nextRoad)[0].children.length > 0
          ) {
            nextRoad = undefined;
          }
        } else {
          nextRoad = undefined;
        }
      } else if (templNext.children.length !== 0) {
        nextRoad = undefined;
      }
    }
    if (prevRoad !== undefined) {
      prevRoad.length > 0
        ? (elem.prevRoad = prevRoad)
        : (elem.prevRoad = undefined);
    } else {
      elem.prevRoad = undefined;
    }

    if (nextRoad !== undefined) {
      nextRoad.length > 0
        ? (elem.nextRoad = nextRoad)
        : (elem.nextRoad = undefined);
    } else {
      elem.nextRoad = undefined;
    }

    // if (
    //   nextRoad !==
    //     String.fromCharCode(elem.piece[0].charCodeAt(0) + 1) +
    //       (Number(elem.piece[1]) + 1) &&
    //   nextRoad !== undefined &&
    //   roads.includes(nextRoad[0]) &&
    //   prevRoad !==
    //     String.fromCharCode(elem.piece[0].charCodeAt(0) + 1) +
    //       (Number(elem.piece[1]) + 1)
    // ) {
    //   elem.prevRoad = false;
    // }

    // if (
    //   prevRoad !==
    //     String.fromCharCode(elem.piece[0].charCodeAt(0) - 1) +
    //       (Number(elem.piece[1]) + 1) &&
    //   prevRoad !== undefined &&
    //   roads.includes(prevRoad[0]) &&
    //   nextRoad !==
    //     String.fromCharCode(elem.piece[0].charCodeAt(0) - 1) +
    //       (Number(elem.piece[1]) + 1)
    // ) {
    //   elem.nextRoad = false;
    // }
  } else if (elem.color === "white") {
    let prev = String.fromCharCode(elem.piece[0].charCodeAt(0) - 1);
    let num = Number(elem.piece[1]) - 1;
    if (roads.includes(prev) && num > 0 && num <= 8) {
      if (num <= 8) {
        prevRoad += prev + (Number(elem.piece[1]) - 1);

        let templPrev = squares.filter(elemId => elemId.id === prevRoad)[0];

        if (
          templPrev.children.length > 0 &&
          templPrev.children[0].id === "black_checker"
        ) {
          prev = String.fromCharCode(templPrev.id[0].charCodeAt(0) - 1);

          if (roads.includes(prev) && num > 0 && num <= 8) {
            rem2 = null;
            rem2 = templPrev.children[0];
            prevRoad = "";
            prevRoad += prev + (Number(templPrev.id[1]) - 1);
            if (squares.filter(elem => elem.id === prevRoad)[0]) {
              if (
                squares.filter(elem => elem.id === prevRoad)[0].children
                  .length > 0
              ) {
                prevRoad = undefined;
              }
            }
          } else {
            prevRoad = undefined;
          }
        } else if (templPrev.children.length !== 0) {
          prevRoad = undefined;
        }
      }
    }

    let next = String.fromCharCode(elem.piece[0].charCodeAt(0) + 1);
    if (roads.includes(next)) {
      let num = Number(elem.piece[1]) - 1;
      if (num <= 8) {
        nextRoad += next + (Number(elem.piece[1]) - 1);
        let templNext = squares.filter(elemId => elemId.id === nextRoad)[0];
        console.log(templNext);
        if (
          templNext.children.length > 0 &&
          templNext.children[0].id === "black_checker"
        ) {
          next = String.fromCharCode(templNext.id[0].charCodeAt(0) + 1);

          if (
            roads.includes(next) &&
            Number(templNext.id[1]) - 1 > 0 &&
            Number(templNext.id[1]) - 1 <= 8
          ) {
            rem2 = null;
            rem2 = templNext.children[0];
            nextRoad = "";
            nextRoad += next + (Number(templNext.id[1]) - 1);

            if (
              squares.filter(elem => elem.id === nextRoad)[0].children.length >
              0
            ) {
              nextRoad = undefined;
            }
          } else {
            nextRoad = undefined;
          }
        } else if (templNext.children.length !== 0) {
          nextRoad = undefined;
        }
      }
    }
    if (
      prevRoad !== undefined &&
      Number(prevRoad[1]) > 0 &&
      Number(prevRoad[1]) <= 8
    ) {
      prevRoad.length > 0
        ? (elem.prevRoad = prevRoad)
        : (elem.prevRoad = undefined);
    } else {
      elem.prevRoad = undefined;
    }

    if (
      nextRoad !== undefined &&
      Number(nextRoad[1]) > 0 &&
      Number(nextRoad[1]) <= 8
    ) {
      nextRoad.length > 0
        ? (elem.nextRoad = nextRoad)
        : (elem.nextRoad = undefined);
    } else {
      elem.nextRoad = undefined;
    }

    // if (
    //   nextRoad !==
    //     String.fromCharCode(elem.piece[0].charCodeAt(0) + 1) +
    //       (Number(elem.piece[1]) - 1) &&
    //   nextRoad !== undefined &&
    //   roads.includes(nextRoad[0])
    // ) {
    //   elem.prevRoad = false;
    // }

    // if (
    //   prevRoad !==
    //     String.fromCharCode(elem.piece[0].charCodeAt(0) - 1) +
    //       (Number(elem.piece[1]) - 1) &&
    //   prevRoad !== undefined &&
    //   roads.includes(prevRoad[0])
    // ) {
    //   elem.nextRoad = false;
    // }
  }
}

function toLighter(elem) {
  squares.forEach(w => (w.style.border = "none"));

  if (elem.prevRoad !== false && elem.prevRoad !== undefined) {
    squares.filter(e => e.id === elem.prevRoad)[0].style.border =
      "3px solid red";
  }
  if (elem.nextRoad !== false && elem.nextRoad !== undefined) {
    squares.filter(e => e.id === elem.nextRoad)[0].style.border =
      "3px solid red";
  }
}

let white_count = 0;
let black_count = 0;
function makeMove(obj) {
  let lightSquares = squares.filter(l => l.style.border === "3px solid red");

  for (let i = 0; i < lightSquares.length; i++) {
    lightSquares[i].onclick = function movie(e) {
      let light = e.target;
      // obj.style.top = "10px";
      // obj.style.right = "80px";
      light.appendChild(obj);
      if (rem1 !== null) {
        rem1.remove();
      }
      if (rem2 !== null) {
        rem2.remove();
      }

      squares.forEach(b => (b.style.border = "none"));
      lightSquares.map(elem => (elem.onclick = null));
    };
  }
}
